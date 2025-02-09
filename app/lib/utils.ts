import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const tableMetadata = {
  Profile: [
    { name: "id", type: "text" },
    { name: "name", type: "text" },
    { name: "title", type: "text" },
    { name: "bio", type: "textarea" },
    { name: "email", type: "text" },
    { name: "adminKey", type: "text" },
  ],
  Project: [
    { name: "title", type: "text" },
    { name: "description", type: "textarea" },
    { name: "thumbnail", type: "text" },
    { name: "link", type: "text" },
    { name: "category", type: "select", options: ["DEVELOPMENT", "PHOTOGRAPHY", "VIDEO", "OTHER"] },
    { name: "featured", type: "checkbox" },
    { name: "order", type: "number" },
    { name: "technologies", type: "array" },
  ],
  Skill: [
    { name: "id", type: "text" },
    { name: "name", type: "text" },
    { name: "category", type: "select", options: ["TECHNICAL", "CREATIVE", "SOFT"] },
    { name: "proficiency", type: "number" },
    { name: "order", type: "number" },
  ],
  SocialLink: [
    { name: "platform", type: "select", options: ["GITHUB", "LINKEDIN", "TWITTER", "INSTAGRAM", "YOUTUBE", "OTHER"] },
    { name: "url", type: "text" },
  ],
};