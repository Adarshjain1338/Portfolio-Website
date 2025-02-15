import type { MetaFunction } from "@remix-run/node";
import LandingPage from "@/components/LandingPage";
import { LoaderFunction, json } from "@remix-run/node";
import prisma from "prisma/Prisma";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  try {
    const AboutMe = await prisma?.profile.findMany(); // Fetch AboutMe data
    return json({ AboutMe }); // Return both datasets
  } catch (error) {
    console.error("Error fetching data:", error);
    return json({ error: "Failed to fetch data" }, { status: 500 });
  }
};

export default function Index() {
  // const { AboutMe } = useLoaderData<any>();
  
  return (
  
    <>
        <body>
        <LandingPage/>
        </body>
      </>
  );
}