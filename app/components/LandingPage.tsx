import { Card, CardHeader } from './ui/card';
import Navbar from './NavigationBar';
import SocialIcons from './SocialCard';
import TechnicalCard from './TechnicalCard';
import FlipCard from './commonComponent/FlipCard';
import NonTechnicalCard from './NonTechnicalCard';
import QuoteCard from './QuoteCard';
import PhotoCard from './PhotoCard';
import ContactCard from './ContactCard';
import '../global.scss'
import { BsArrowUpRight } from 'react-icons/bs';

const LandingPage = () => {
  const colors = {
    darkGreen: 'bg-[#2C3639]',
    lightBrown: 'bg-[#A27B5C]',
  };

  return (
    <div className="min-h-screen dashboard p-3  ">
      <Card className='dashboard-card p-1 pt-1 baseColor border-none align-bottom'>
        <Navbar />
        <div className="grid grid-cols-12 gap-3 auto-rows-[200px]">
          <QuoteCard />
          <PhotoCard />
          <FlipCard childOne={<TechnicalCard />} childTwo={<NonTechnicalCard />} />
          <ContactCard />
          {/* Contact Card */}
          <Card className="col-span-3 row-span-1 basecard_color_secondary p-6 border-none flex flex-col justify-between relative text-base ">
          
            <CardHeader className="absolute top-2 right-2 text-white bg-[#414A39] rounded-full">
              <BsArrowUpRight className="text-lg opacity-70 hover:opacity-100 transition-opacity" />
            </CardHeader>
            <h1 className="text-base font-serif text-4xl text-[#3D3D3D]">
              Contact <span className="italic font-light">me</span>
            </h1>
          </Card>
          <SocialIcons />
        </div>
      </Card>
    </div>
  );
};

export default LandingPage;