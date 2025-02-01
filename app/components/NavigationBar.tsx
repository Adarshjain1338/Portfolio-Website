import React from 'react';
import { Link, useNavigate } from '@remix-run/react';
import { Button } from './ui/button';
// import { Menubar, MenubarMenu, MenubarContent, MenubarItem, MenubarSeparator, MenubarTrigger } from './ui/menubar';

const Navbar = () => {

  const navigate = useNavigate();
  function openAboutPage() {
    navigate('/about');
  }

  return (
    <nav className="flex justify-between items-center mb-6 text-[#ffffff] basecard rounded-md p-2 mt-6">
      <Link to="/">
        <h1 className="text-2xl font-serif">Adarsh Jain</h1>
      </Link>
      <div className="flex justify-between items-center">

        <div className='space-x-8'>
          <Button variant="ghost" className="mr-4" onClick={() => { openAboutPage() }}>
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