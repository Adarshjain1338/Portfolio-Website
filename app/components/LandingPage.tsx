import React from 'react';
import ContactCard from './ContactCard';
import PhotoCard from './PhotoCard';
import AboutMeCard from './AboutMeCard';
import Navbar from './NavigationBar';
import SocialIcons from './SocialCard';
import TechnicalCard from './TechnicalCard';
import FlipCard from './commonComponent/FlipCard';
import NonTechnicalCard from './NonTechnicalCard';
import QuoteCard from './QuoteCard';

const LandingPage = (props: any) => {
    console.log(props, "props passing")
    return (
    <>
        <div className="flex justify-center items-center h-screen">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <QuoteCard/>
                <ContactCard />
                <PhotoCard />
                <AboutMeCard />
                <FlipCard childOne={<TechnicalCard/>} childTwo={<NonTechnicalCard/>} rotateAxis="X"/>
            </div>
        </div>
        <SocialIcons/>
    </>
    );
};

export default LandingPage;