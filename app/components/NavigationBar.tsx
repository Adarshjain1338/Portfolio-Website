import React from 'react';
import { Link } from '@remix-run/react';
import { Button } from './ui/button';
// import { Menubar, MenubarMenu, MenubarContent, MenubarItem, MenubarSeparator, MenubarTrigger } from './ui/menubar';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 py-4 px-6 text-white rounded-sm ">


      <div className="flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold">Adarsh Jain</h1>
        </Link>
        <div>
          <Button variant="ghost" className="mr-4">
            About
          </Button>
          <Button variant="ghost" className="mr-4">
            Projects
          </Button>
          <Button variant="ghost" className="mr-4">
            Contact
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;