import React from 'react';
import { Card } from './ui/card';
import { Link } from '@remix-run/react';
import { LuGithub, LuInstagram, LuLinkedin, LuTwitter } from 'react-icons/lu';
import { Progress } from './ui/progress';
import myself from '../lib/assests/images/myself.png'
import Navbar from './NavigationBar';
import SocialIcons from './SocialCard';
import TechnicalCard from './TechnicalCard';
import FlipCard from './commonComponent/FlipCard';
import NonTechnicalCard from './NonTechnicalCard';
import QuoteCard from './QuoteCard';
import PhotoCard from './PhotoCard';
import ContactCard from './ContactCard';
import '../global.scss'

const LandingPage = (props: any) => {
  const colors = {
    darkGreen: 'bg-[#2C3639]',
    lightBrown: 'bg-[#A27B5C]',
  };

  return (
    <div className="min-h-screen dashboard p-5">
      <Card className='dashboard-card p-3'>
        {/* Main Container */}
        {/* Navigation */}
        <Navbar />
        {/* Grid Layout */}
        <div className="grid grid-cols-12 gap-6 auto-rows-[200px]">
          {/* Hero Text Card */}
          <QuoteCard />
          {/* Profile Image Card */}
          <PhotoCard />
          {/* Right Side Gallery */}
          <Card className={`col-span-3 row-span-2 ${colors.darkGreen} p-6 border-none card technical-skills`}>
            <FlipCard childOne={<TechnicalCard />} childTwo={<NonTechnicalCard />} />
          </Card>

          {/* Bio Card */}
          <ContactCard />

          {/* Contact Card */}
          <Card className={`col-span-3 row-span- ${colors.lightBrown} p-6 border-none card highlight`}>
            <h3 className="font-playfair text-xl mb-2">Contact me</h3>
            <div className="flex space-x-4">
              <LuInstagram className="h-5 w-5" />
              <LuTwitter className="h-5 w-5" />
              <LuLinkedin className="h-5 w-5" />
            </div>
          </Card>
          <SocialIcons />
        </div>
      </Card>
    </div>
  );
};

export default LandingPage;