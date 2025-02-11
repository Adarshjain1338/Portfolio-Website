import { SkillCategory } from "@prisma/client";
import { ActionFunction, json } from "@remix-run/node";
import prisma from "prisma/Prisma";

interface SkillData {
  id: string | null;
  name: string;
  category: string;
  proficiency: number;
  order: number;
}

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { data }: { data: SkillData[] } = await request.json(); // Expecting an array of skills

    if (!Array.isArray(data) || data.length === 0) {
      return json({ error: "Invalid or empty data" }, { status: 400 });
    }

    const processedSkills = [];

    for (const skill of data) {
      const skillId = skill.id?.trim() || null;

      // Validate required fields properly
      if (!skill.name || skill.proficiency === undefined || skill.order === undefined) {
        return json({ error: `Missing required fields in skill: ${skill.name || "Unknown"}` }, { status: 400 });
      }

      let updatedSkill;

      if (skillId) {
        updatedSkill = await prisma.skills.update({
          where: { id: skillId },
          data: {
            name: skill.name,
            proficiency: skill.proficiency,
            category: SkillCategory[skill.category as keyof typeof SkillCategory],
            order: skill.order,
          },
        });
      } else {
        updatedSkill = await prisma.skills.create({
          data: {
            name: skill.name,
            proficiency: skill.proficiency,
            category: SkillCategory[skill.category as keyof typeof SkillCategory],
            order: skill.order,
          },
        });
      }

      processedSkills.push(updatedSkill);
    }

    return json({ success: true, skills: processedSkills });
  } catch (error) {
    console.error("Error updating skills:", error);
    return json({ error: "Failed to update skills" }, { status: 500 });
  }
};
