'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import style from './destination.module.css';

import { Vujahday_Script } from 'next/font/google';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const Destinations = ({ data }) => {
    const t = useTranslations('HomePage');
    const locale = useLocale();
    const [isSubscribed, setIsSubscribed] = useState(null);
    const [token, setToken] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const userToken = Cookies.get('token') || null;
        const subscriptionStatus = Cookies.get('is_subscribed') === 'true';

        setToken(userToken);
        setIsSubscribed(subscriptionStatus);
    }, []);

    const handleNavigation = path => {
        if (!token || !isSubscribed) {
            toast.error(t('You must be logged in and subscribed to access this page'), {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
            });

            setTimeout(() => {
                router.push(`/${locale}/login`);
            }, 3000);

            return;
        }

        router.push(path);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <div className="container-fluid mt-5">
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
                            {t('Explore top destinations voted by more than +100,000 customers')}
                        </motion.p>
                    </div>

                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        navigation={true}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            768: { slidesPerView: 3, spaceBetween: 30 },
                            1024: { slidesPerView: 4, spaceBetween: 40 },
                            1200: { slidesPerView: 5, spaceBetween: 50 },
                        }}
                        modules={[Navigation]}
                        className={`${style.mySwiper} ${style['global-pagination']} ${style['global-navigation']} px-5`}
                    >
                        {data?.map((des, index) => (
                            <SwiperSlide className="position-relative" key={des.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
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
                                    <div className={style.viewMore}>
                                        <Link
                                            className="text-white text-decoration-none"
                                            href={`/${locale}/destinations/${des.id}`}
                                            onClick={e => {
                                                e.preventDefault();
                                                handleNavigation(
                                                    `/${locale}/destinations/${des.id}`
                                                );
                                            }}
                                        >
                                            {t('View More')}
                                        </Link>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </motion.div>
    );
};

export default Destinations;
