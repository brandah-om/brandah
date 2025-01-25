import React from 'react';
import Carousel from './component/homeslider/HomeSlider';
import NavBar from './component/navbar/NavBar';
import Destinations from './component/destinations/Destinations';
import Hotels from './component/hotels/Hotels';
import TourGuide from './component/tourGuide/TourGuide';
import Transportation from './component/Transportation/Transportation';
import AboutUs from './component/aboutUs/AboutUs';
import TopTrips from './component/topTrips/TopTrips';
import Testimonials from './component/testimonials/Testimonials';
import ContactUs from './component/contactUs/ContactUs';
import Newsletter from './component/newsletter/Newsletter';
import Brochure from './component/brochure/Brochure';
import SwiperCar from '@/components/SwiperCar/SwiperCar';

const Home = () => {
    return (
        <div>
            <NavBar />
            <Carousel />
            <Destinations />
            <Hotels />
            <Transportation />
            <SwiperCar />
            <TourGuide />
            <Brochure />
            <AboutUs />
            <TopTrips />
            <Testimonials />
            <ContactUs />
            <Newsletter />
        </div>
    );
};

export default Home;
