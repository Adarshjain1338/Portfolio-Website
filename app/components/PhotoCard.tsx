import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import myselfImage from '../lib/assests/images/myself.png'; // Import the image

const PhotoCard = () => {
  return (
    <Card className={`col-span-3 row-span-2 overflow-hidden border-none `}>
    <img
      src={myselfImage}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  </Card>
  );
};

export default PhotoCard;