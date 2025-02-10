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

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const page = ({ data }) => {
    const t = useTranslations('HomePage');
    const router = useRouter();
    const locale = useLocale();

    return (
        <div>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-12 text-center mb-3">
                        <h6 className={`${vujahday.className} ${style.destinationTitle}`}>
                            {t('Discover your happy place')}
                        </h6>
                        <h2 className={style.destinationMailTitle}>{t('Destinations')}</h2>
                        <p className={style.destinationCaption}>
                            {t('Explore top destinations voted by more than +100,000 customers')}
                        </p>
                    </div>
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
                        {data?.map(des => (
                            <SwiperSlide className="position-relative" key={des.id}>
                                <div className={style.overlay}></div>
                                <img
                                    className={style.swiperSlideImage}
                                    src={des.banner || ' /homepage/destinations/destination-2.jpeg'}
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
                                <button className={style.viewMore}>
                                    <Link
                                        className="text-white text-decoration-none"
                                        href={`/${locale}/destinations/${des.id}`}
                                    >
                                        {t('View More')}
                                    </Link>
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default page;
