import React from "react";
import { motion } from "framer-motion";
import { Card, CardTitle, CardContent, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { BsArrowUpLeft } from "react-icons/bs";

interface IAboutPageProps {
  AboutDetails: any;
}

interface ITimelineItem {
  title: string;
  description: string;
  date: string;
}

const workHistory: ITimelineItem[] = [
  {
    date: "July 2023 - Present",
    title: "Software Engineer (SE)",
    description:
      "Currently working as a Software Engineer, developing scalable and high-performance web applications. My primary focus is on frontend development using modern technologies such as React, Next.js, and Remix. I collaborate with cross-functional teams to design, implement, and optimize user interfaces, ensuring smooth user experiences. I also work closely with backend engineers to ensure seamless integration between frontend and backend systems, and I am continuously learning and improving my skills in both frontend and backend technologies.",
  },
  {
    date: "July 2023 - June 2024",
    title: "Associate Software Engineer (ASE)",
    description:
      "In my role as an Associate Software Engineer, I focused on enhancing the UI/UX of enterprise-level applications by closely analyzing user behavior and feedback. My responsibilities included optimizing performance to improve the application's speed and responsiveness, ensuring that it met the demands of a large user base. I collaborated with designers and other engineers to create seamless, user-friendly interfaces and ensured that the application adhered to best practices for accessibility and responsiveness. Additionally, I participated in code reviews and team discussions to enhance the overall quality of the software.",
  },
  {
    date: "Jan 2023 - June 2023",
    title: "Trainee Engineer (TE)",
    description:
      "As a Trainee Engineer, I gained valuable hands-on experience in software development, focusing on small-scale projects under the guidance of senior engineers. I worked on various aspects of application development, including writing clean and efficient code, debugging, and ensuring the functionality of features. I was involved in both frontend and backend development, learning various technologies and frameworks.",
  },
];


const AboutPage: React.FC<IAboutPageProps> = ({ AboutDetails }) => {
  return (<>
    {/* <Navbar /> */}
    <div className="min-h-screen p-2 baseC ">

      <ScrollArea className=" rounded-3xl " style={{ backgroundColor: "#414A39" }}>
        <div className="max-w-md p-3">
          <CardHeader className="absolute top-2 left-2 text-white bg-[#9A744D] rounded-full">
            <BsArrowUpLeft className="text-lg opacity-70 hover:opacity-100 transition-opacity" />
          </CardHeader>
        </div>
        <div className="flex justify-center h-[calc(100vh-70px)] items-center">
          <div className="relative space-y-3 w-full max-w-3xl">
            {/* Vertical Line */}
            <div className="absolute left-2 top-0 h-full w-0.5 bg-gray-300"></div>
            {workHistory.map((item, index) => (
              <motion.div
                key={index}
                className="relative flex items-start space-x-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Timeline Dot */}
                <div className="w-4 h-4 bg-red-500 rounded-full absolute left-2 transform -translate-x-1/2"></div>
                {/* Content */}
                <div className="ml-10 p-1 w-full">
                  <Card className="bg-transparent border-none shadow-none">
                    <CardContent className="p-0">
                      <p className="text-red-400 text-sm">{item.date}</p>
                      <CardTitle className="text-lg text-[#FFFFFF] mt-1">{item.title}</CardTitle>
                      <p className="text-[#DCC1A6] mt-1 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </ScrollArea>
    </div>
  </>
  );
};

export default AboutPage;
