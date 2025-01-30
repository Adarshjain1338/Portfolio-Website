import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

const PhotoCard = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>About Me</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-4">
          {/* <img
            src="/api/placeholder/400/400"
            alt="Profile"
            className=""
          /> */}
        </div>
        <CardDescription>
          Hi, I'm John Doe, a passionate web developer with expertise in modern
          frontend technologies. I love creating engaging and user-friendly
          applications.
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default PhotoCard;