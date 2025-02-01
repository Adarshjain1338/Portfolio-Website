import React from "react";
import { motion } from "framer-motion";
import { Card, CardTitle, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import Navbar from "../NavigationBar";

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
      "As a Trainee Engineer, I gained valuable hands-on experience in software development, focusing on small-scale projects under the guidance of senior engineers. I worked on various aspects of application development, including writing clean and efficient code, debugging, and ensuring the functionality of features. I was involved in both frontend and backend development, learning various technologies and frameworks. This role helped me develop strong problem-solving skills and a solid understanding of the software development lifecycle, from concept to deployment. I also had the opportunity to work in a collaborative team environment, where I learned the importance of communication and teamwork in successful project delivery.",
  },
];


const AboutPage: React.FC<IAboutPageProps> = ({ AboutDetails }) => {
  return (<>
    <Navbar />

    <ScrollArea className="h-[calc(100vh-64px)] w-[calc(100vw-64px)] m-6 rounded-3xl " style={{ backgroundColor: "darkblue", opacity: 0.8 }}>

      <div className="max-w-md p-3">
        about {AboutDetails[0].name}
      </div>
      <div className="flex justify-center h-[calc(100vh-200px)]">
        <div className="relative space-y-8 w-full max-w-3xl">
          {/* Vertical Line */}
          <div className="absolute left-2 top-0 h-full w-0.5 bg-gray-600"></div>
          {workHistory.map((item, index) => (
            <motion.div
              key={index}
              className="relative flex items-start space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Timeline Dot */}
              <div className="w-3 h-3 bg-yellow-300 rounded-full absolute left-2 transform -translate-x-1/2"></div>
              {/* Content */}
              <div className="ml-10 p-1 w-full">
                <Card className="bg-transparent border-none shadow-none">
                  <CardContent className="p-0">
                    <p className="text-yellow-300 text-sm">{item.date}</p>
                    <CardTitle className="text-lg text-white mt-1">{item.title}</CardTitle>
                    <p className="text-gray-400 mt-1 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </ScrollArea>
  </>
  );
};

export default AboutPage;
