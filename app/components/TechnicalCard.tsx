import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
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
    <>
      <Card className={` w-[23.1rem] col-span-3 row-span-3 border-none card technical-skills basecard_color_primary`}>
        <CardHeader>
          <CardTitle>Technical Skills</CardTitle>
          <CardTitle className='absolute top-2 right-2'>  <BsArrowUpRight /></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 text-white">
            <div className="aspect-video bg-[#ffffff]/20 rounded-lg mb-4"></div>
            {technicalSkills.map((skill) => (
              <>
                <div key={skill.name} className="flex items-center justify-between ...">
                  <span>{skill.name}</span>
                </div>
                <Progress value={skill.progress} className='flex items-center justify-between text-white' />
              </>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TechnicalCard;