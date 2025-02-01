import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { BsArrowUpRight } from 'react-icons/bs';
import { Navigate, useNavigate } from '@remix-run/react';

interface IAboutMeCardProps {
  CardDetails: any;
}

const AboutMeCard = (props: IAboutMeCardProps) => {
  const navigate = useNavigate();
  const {CardDetails} = props;
  const {name, email} = CardDetails[0];

  function openAboutPage(){
     navigate('/about');
  }


  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>About Me - {name}</CardTitle>
        <CardTitle>  <BsArrowUpRight onClick={()=> openAboutPage()}/></CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          As a web developer, I have a deep passion for creating innovative and
          user-centric applications. With a strong background in JavaScript,
          React, and modern frontend frameworks, I strive to deliver exceptional
          user experiences.
        </CardDescription>
        <CardDescription>
          In my free time, I enjoy exploring the latest web technologies,
          experimenting with new ideas, and contributing to the open-source
          community. I'm always eager to learn and grow, and I'm excited to
          collaborate with like-minded individuals.
          {email}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default AboutMeCard;