import React from 'react';
import Banner from '../Banner/Banner';

import { Helmet } from 'react-helmet-async';
import AnnouncementSection from '../AnnouncementSection';
import TagsSection from '../TagsSection/TagsSection';
import HomePage from '../HomePage/HomePage';
import ReelsSection from '../../../ExtraSection/ReelsSection';
import ReviewsPage from '../../../ExtraSection/ReviewsPage';
import AboutUs from '../../../ExtraSection/AboutUs';
import AboutUsFacebookStyle from '../../../ExtraSection/AboutUsFacebookStyle';



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
           
            <ReelsSection />
            <ReviewsPage />
            <AboutUs />
            <AboutUsFacebookStyle/>
           
           
          
        </div>
    );
};

export default Home;