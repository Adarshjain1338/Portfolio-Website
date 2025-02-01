import { LoaderFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import prisma from "prisma/Prisma";
import ContactPage from "@/components/pages/ContactPage";

// First, let's define the type for your Profile data
interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  adminKey: string;
  createdAt: Date;
  updatedAt: Date;
}

// Type for the loader data
interface LoaderData {
  AboutMe: Profile[];
}

export const loader: LoaderFunction = async () => {
  try {
    const AboutMe = await prisma.profile.findMany();
    return json({ AboutMe });
  } catch (error) {
    console.error("Error fetching data:", error);
    return json({ error: "Failed to fetch data" }, { status: 500 });
  }
};

export default function Contact() {
  // Use the proper type for useLoaderData
  const { AboutMe } = useLoaderData<LoaderData>();
  console.log(AboutMe, "data");

  return <ContactPage />;
}