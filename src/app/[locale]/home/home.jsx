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
import { useGetHomePageQuery } from '@/store/HomePage/HomePageSlice';
import Loading from '@/components/Loading/Loading';
import { useLocale, useTranslations } from 'next-intl';
// import { ToastContainer } from 'react-toastify';

const Home = () => {
    const locale = useLocale();
    const t = useTranslations('HomePage');

    const { data, isLoading, error } = useGetHomePageQuery(locale);
    return (
        <div>
            {/* <ToastContainer/> */}
            <NavBar />
            <Carousel />
            {isLoading ? (
                <Loading />
            ) : error ? (
                <p>{t('Error loading Data')}</p>
            ) : (
                <>
                    <Destinations data={data?.states} />
                    <Hotels data={data?.hotels} />
                    <Transportation />
                    <SwiperCar data={data?.cars} />
                    <TourGuide data={data?.tourGuide} />
                    <Brochure />
                    <AboutUs />
                    <TopTrips data={data?.trips} />
                    <Testimonials />
                    <ContactUs />
                    <Newsletter />
                </>
            )}
        </div>
    );
};

export default Home;
