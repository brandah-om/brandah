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
import { useGetHomePageQuery } from '../../../store/HomePage/HomePageSlice';
import NavBar from '../../../components/navBar/NavBar';
import Loading from '../../../components/Loading/Loading';
import { motion } from 'framer-motion';
import DynamicBreadcrumbs from '../../../components/dynamicBreadcrumbs/DynamicBreadcrumbs';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const page = () => {
    const t = useTranslations('HomePage');
    const router = useRouter();
    const locale = useLocale();
    const { data, isLoading, error } = useGetHomePageQuery(locale);
    const breadcrumbs = [{ label: t('Home'), href: `/${locale}/` }, { label: t('States') }];

    return (
        <div>
            <NavBar />
            <div className={style.destinationPage}>
                <div className="px-1 px-lg-4">
                    <DynamicBreadcrumbs items={breadcrumbs} />
                </div>

                <div className="container-fluid mb-5">
                    <div className="row">
                        <div className="col-md-12 text-center mb-3">
                            {/* Search */}
                            <form className="d-flex justify-content-center">
                                <motion.input
                                    type="text"
                                    className={style.searchInput}
                                    placeholder={t('Search')}
                                    transition={{ duration: 0.3 }}
                                />
                                <motion.button
                                    className={style.searchBtn}
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{ textDecoration: 'underLine' }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {t('Search')}
                                </motion.button>
                            </form>
                            {/* <motion.h6
                                className={`${vujahday.className} ${style.destinationTitle}`}
                                initial={{ opacity: 0, y: -50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                {t('Discover your happy place')}
                            </motion.h6> */}

                            <motion.h2
                                className={style.destinationMailTitle}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                {t('States')}
                            </motion.h2>

                            <motion.p
                                className={`${vujahday.className} ${style.destinationChoose}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                {t('Please Choose Your Destination')}
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
                                className={`${style.mySwiper} ${style['global-pagination']} ${style['global-navigation']} px-5 d-lg-block d-none`}
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
                                                {des.mini_desc ? (
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: des.mini_desc,
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
                                                >
                                                    {t('View More')}
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}

                        {isLoading ? (
                            <Loading />
                        ) : error ? (
                            <div className="text-center mt-4">
                                <p>{t('Error Loading Data')}</p>
                            </div>
                        ) : (
                            <div className="d-lg-none d-block">
                                {data?.states?.slice(0, 10).map((des, index) => (
                                    <motion.div
                                        className="position-relative mb-3"
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
                                            {des.mini_desc ? (
                                                <p
                                                // className={`${style.cardBody}`}
                                                dangerouslySetInnerHTML={{
                                                        __html: des.mini_desc,
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
                                            >
                                                {t('View More')}
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
