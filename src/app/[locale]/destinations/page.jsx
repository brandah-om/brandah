'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import style from './destination.module.css';

import { Vujahday_Script } from 'next/font/google';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useGetHomePageQuery } from '@/store/HomePage/HomePageSlice';
import NavBar from '@/components/navBar/NavBar';
import Loading from '@/components/Loading/Loading';
import ContactUs from '../home/component/contactUs/ContactUs';
import Newsletter from '../home/component/newsletter/Newsletter';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const page = () => {
    const t = useTranslations('HomePage');
    const router = useRouter();
    const locale = useLocale();
    const { data, isLoading, error } = useGetHomePageQuery(locale);

    return (
        <div>
            <NavBar />
            {/*  {/* <ToastContainer /> */} 
            <div className={style.destinationPage}>
                <div className="container-fluid mb-5">
                    <div className="row">
                        <div className="col-md-12 text-center mb-3">
                            <motion.h6
                                className={`${vujahday.className} ${style.destinationTitle}`}
                                initial={{ opacity: 0, y: -50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                {t('Discover your happy place')}
                            </motion.h6>

                            <motion.h2
                                className={style.destinationMailTitle}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                {t('Destinations')}
                            </motion.h2>

                            <motion.p
                                className={style.destinationCaption}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                {t(
                                    'Explore top destinations voted by more than +100,000 customers'
                                )}
                            </motion.p>
                        </div>
                        {isLoading ? (
                            <Loading />
                        ) : error ? (
                            <div className="text-center mt-4">
                                <p>{t('Error Loading Data')}</p>
                            </div>
                        ) : (
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={10}
                                navigation={true}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                        spaceBetween: 30,
                                    },
                                    1024: {
                                        slidesPerView: 4,
                                        spaceBetween: 40,
                                    },
                                    1200: {
                                        slidesPerView: 5,
                                        spaceBetween: 50,
                                    },
                                }}
                                modules={[Navigation]}
                                className={`${style.mySwiper} ${style['global-pagination']} ${style['global-navigation']} px-5`}
                            >
                                {data?.states?.map((des, index) => (
                                    <SwiperSlide className="position-relative" key={des.id}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.08 }}
                                            viewport={{ once: true }}
                                        >
                                            <div className={style.overlay}></div>
                                            <img
                                                className={style.swiperSlideImage}
                                                src={
                                                    des.banner ||
                                                    '/homepage/destinations/destination-2.jpeg'
                                                }
                                                alt={des.name || 'Destination'}
                                            />
                                            <div className={style.sliderImgCaption}>
                                                <h6>{des.name || t('No name')}</h6>
                                                {des.description ? (
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: des.description,
                                                        }}
                                                    ></p>
                                                ) : (
                                                    <p>{t('No description available')}</p>
                                                )}
                                            </div>
                                            <motion.button
                                                className={style.viewMore}
                                                whileHover={{
                                                    backgroundColor: '#9F733C',
                                                    textDecoration: 'underLine',
                                                }}
                                                transition={{ duration: 0.1 }}
                                                // whileTap={{ y: 1 }}
                                            >
                                                <Link
                                                    className="text-white text-decoration-none"
                                                    href={`/${locale}/destinations/${des.id}`}
                                                >
                                                    {t('View More')}
                                                </Link>
                                            </motion.button>
                                        </motion.div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                </div>
                <ContactUs />
                <Newsletter />
            </div>
        </div>
    );
};

export default page;
