import AboutMeCard from "@/components/AboutMeCard";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"; // Adjust the import path
import prisma from "prisma/Prisma";

// Loader function to fetch data
export const loader: LoaderFunction = async () => {
  try {
    console.log("Fetching AboutMe data...");
    
    const AboutMe = await prisma.Profile.findMany();
    return json(AboutMe);
  } catch (error) {
    console.error("Error fetching AboutMe data:", error);
    return json({ error: "Failed to fetch AboutMe data" }, { status: 500 });
  }
};

export default function AboutPage() {
  const AboutMe = useLoaderData<any>(); // Fetch data from the loader

  return (
    <div>
      <h1>About Me</h1>
      <AboutMeCard AboutMe={AboutMe} /> {/* Pass data as props */}
    </div>
  );
}