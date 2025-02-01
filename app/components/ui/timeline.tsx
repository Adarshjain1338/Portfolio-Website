import React from "react";
import { motion } from "framer-motion";
import { Card, CardTitle, CardContent } from "../ui/card";

interface ITimelineItem {
  title: string;
  description: string;
  date: string;
}

const workHistory: ITimelineItem[] = [
  {
    date: "2023 - Present",
    title: "Software Engineer (SE)",
    description:
      "Currently working as a Software Engineer, developing scalable and high-performance web applications. Focused on frontend development using modern technologies like React, Next.js, and Remix. Collaborating with cross-functional teams to design, implement, and optimize user interfaces.",
  },
  {
    date: "2022 - 2023",
    title: "Associate Software Engineer (ASE)",
    description:
      "Focused on enhancing the UI/UX of enterprise-level applications by analyzing user behavior and feedback. Optimized performance and ensured the application met the demands of a large user base. Collaborated with designers and engineers to create seamless, user-friendly interfaces.",
  },
  {
    date: "2021 - 2022",
    title: "Trainee Engineer (TE)",
    description:
      "Gained hands-on experience in software development, focusing on small-scale projects under the guidance of senior engineers. Worked on both frontend and backend development, learning various technologies and frameworks.",
  },
];

const AboutTimeline: React.FC = () => {
  return (
    <div className="flex justify-center h-[calc(100vh-200px)]">
      <div className="relative flex w-full max-w-3xl">
        <div className="w-0.5 bg-gray-600 absolute top-0 bottom-0 left-2"></div>
        <div className="space-y-8 w-full pl-12">
          {workHistory.map((item, index) => (
            <motion.div
              key={index}
              className="relative flex items-start space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="w-3 h-3 bg-yellow-300 rounded-full absolute left-2 transform -translate-x-1/2"></div>
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
    </div>
  );
};

export default AboutTimeline;