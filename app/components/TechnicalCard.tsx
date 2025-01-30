import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from './ui/progress';
import { BsArrowUpRight } from "react-icons/bs";

const technicalSkills = [
  { name: 'JavaScript', progress: 90 },
  { name: 'React', progress: 85 },
  { name: 'Node.js', progress: 80 },
  { name: 'TypeScript', progress: 75 },
  { name: 'Docker', progress: 70 },
  { name: 'AWS', progress: 65 },
];

const TechnicalCard = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Technical Skills</CardTitle>
        <CardTitle>  <BsArrowUpRight /></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {technicalSkills.map((skill) => (
            <>
              <div key={skill.name} className="flex items-center justify-between ...">
                <span>{skill.name}</span>
              </div>
              <Progress value={skill.progress} className='flex items-center justify-between' />
            </>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicalCard;