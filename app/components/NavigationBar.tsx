import { Link, useNavigate } from '@remix-run/react';
import { Button } from './ui/button';
// import { Menubar, MenubarMenu, MenubarContent, MenubarItem, MenubarSeparator, MenubarTrigger } from './ui/menubar';

const Navbar = () => {

  const navigate = useNavigate();
  function openAboutPage() {
    navigate('/about');
  }

  return (
    <nav className="flex justify-between items-center text-[#ffffff] basecard_color_primary rounded-md p-2 mt-1 mb-2">
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