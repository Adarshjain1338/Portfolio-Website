import { json, ActionFunctionArgs } from "@remix-run/node";
import prisma from "prisma/Prisma";
import { tableMetadata } from "@/lib/utils";

interface RequestBody {
  tableKey: string;
}

interface tablemetadata {
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
    const requestBody = await request.json() as RequestBody;
    const { tableKey } = requestBody;

    if (!tableKey) {
      return json({ error: "tableKey is required" }, { status: 400 });
    }
    if (!tableMetadata.hasOwnProperty(tableKey)) {
      return json({ error: "Invalid tableKey" }, { status: 400 });
    }

    const fields: tablemetadata[] = tableMetadata[tableKey as keyof typeof tableMetadata];
    let data: any[] = [];

    switch (tableKey) {
      case "Profile":
        console.log("Profile Table");
        data = await prisma.profile.findMany();
        break;
      case "Skill":
        data = await prisma.skills.findMany();
        break;
      case "Project":
          data = await prisma.projects.findMany();
          break;
      default:
        return json({ error: "Table not found in database" }, { status: 404 });
    }

    const processedData = data.map((item) => {
      console.log('data', data)
      const processedItem: any = {};
      fields?.forEach((field) => {
        if (field.columnName) {
          processedItem[field.name] = item[field.columnName];
        } else {
          processedItem[field.name] = item[field.name];
        }
      });
      return processedItem;
    });

    return json({ fields, data: processedData }, { status: 200 });
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