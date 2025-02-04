import React from 'react';
import Banner from '../Banner/Banner';

import { Helmet } from 'react-helmet-async';
import AnnouncementSection from '../AnnouncementSection';
import TagsSection from '../TagsSection/TagsSection';
import HomePage from '../HomePage/HomePage';
import ReelsSection from '../../../ExtraSection/ReelsSection';



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Froum | Home</title>
            </Helmet>
            <Banner />
            <TagsSection/>
            <AnnouncementSection />
            <HomePage />
            <ReelsSection/>
           
           
          
        </div>
    );
};

export default Home;