import { Prisma } from "@prisma/client";
import { json, ActionFunctionArgs } from "@remix-run/node";
import prisma from "prisma/Prisma";

interface RequestBody {
  tableKey: string;
}

interface TableMetadata {
  id?: any;
  name: string;
  type: string;
  options?: string[];
  columnName?: string;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("API Called");
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const requestBody = (await request.json()) as RequestBody;
    const { tableKey } = requestBody;

    if (!tableKey) {
      return json({ error: "tableKey is required" }, { status: 400 });
    }

    // Get schema info dynamically
    const schemaInfo = await prisma.$queryRaw<{ column_name: string; data_type: string }[]>(
      Prisma.sql`SELECT column_name, data_type 
                 FROM information_schema.columns 
                 WHERE table_name = ${Prisma.raw(`'${tableKey}'`)}
                 ORDER BY ordinal_position DESC;` // Reverse the order directly in SQL
    );
    schemaInfo.reverse();

    if (!schemaInfo.length) {
      return json({ error: "Invalid tableKey or table does not exist" }, { status: 400 });
    }

    // Convert schema info into metadata fields
    const fields: TableMetadata[] = schemaInfo.map((column) => {
      let fieldType = "text";
      if (column.data_type.includes("integer")) {
        fieldType = "number";
      } else if (column.data_type.includes("boolean")) {
        fieldType = "checkbox";
      } else if (column.data_type.includes("character varying") && column.data_type.includes("[]")) {
        fieldType = "select";
      } else if (column.column_name.toLowerCase().includes("description")) {
        fieldType = "textarea";
      }
      return {
        name: column.column_name,
        type: fieldType,
      };
    });
    // Fetch table data dynamically
    let data: any[] = [];
    switch (tableKey) {
      case "Profile":
        data = await prisma.profile.findMany();
        break;
      case "Skills":
        data = await prisma.skills.findMany();
        break;
      case "Projects":
        data = await prisma.projects.findMany();
        break;
      case "SocialLinks":
        data = await prisma.socialLinks.findMany();
        break;
      default:
        return json({ error: "Table not found in database" }, { status: 404 });
    }

    return json({ fields, data }, { status: 200 });
  } catch (error: any) {
    console.error("API Error:", error);
    return json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
