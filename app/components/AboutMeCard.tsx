import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

const AboutMeCard = (props: any) => {

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>About Me</CardTitle>
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
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default AboutMeCard;