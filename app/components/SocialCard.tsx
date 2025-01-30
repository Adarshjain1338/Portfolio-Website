import React from 'react';
import { Link } from '@remix-run/react';
import { LuInstagram, LuLinkedin, LuGithub   } from "react-icons/lu";
import { Card } from './ui/card';

const SocialIcons = () => {
  return (
    <Card className="w-[150px]">
    <div className="flex space-x-4  py-4 px-6 border-solid">
      <Link to="https://github.com/example" target="_blank" rel="noopener noreferrer">
        <LuInstagram className="h-6 w-6 hover:text-gray-400 transition-colors" />
      </Link>
      <Link to="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
        <LuLinkedin className="h-6 w-6 hover:text-gray-400 transition-colors" />
      </Link>
      <Link to="https://www.linkedin.com/in/example" target="_blank" rel="noopener noreferrer">
        <LuGithub className="h-6 w-6 hover:text-gray-400 transition-colors" />
      </Link>
    </div>
    </Card>
  );
};

export default SocialIcons;