'use client';
import NavBar from '@/components/navBar/NavBar';
import React, { useEffect } from 'react';
import style from './tourguide.module.css';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useGetTourGuideQuery } from '@/store/tourGuide/AllTourGuideApiSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Loading from '@/components/Loading/Loading';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import ContactUs from '../home/component/contactUs/ContactUs';
import Newsletter from '../home/component/newsletter/Newsletter';
import Aos from 'aos';

const page = () => {
    const t = useTranslations('HomePage');
    const locale = useLocale();

    const breadcrumbs = [{ label: t('Home'), href: `/${locale}/` }, { label: t('Tour Guides') }];
    const { data, error, isLoading } = useGetTourGuideQuery(locale);

    useEffect(() => {
        Aos.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    return (
        <div>
            <NavBar />
            <div className={style.tourGuide}>
                <div className="container-fluid">
                    <div className="row">
                        <div className={style.DynamicBreadcrumbs}>
                            <DynamicBreadcrumbs items={breadcrumbs} />
                        </div>
                        {isLoading ? (
                            <Loading />
                        ) : error ? (
                            <p>{t('Error loading Data')}</p>
                        ) : (
                            <>
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
                                            slidesPerView: 4,
                                            spaceBetween: 50,
                                        },
                                    }}
                                    modules={[Navigation]}
                                    className={`${style.mySwiper} ${style['global-pagination']} ${style['global-navigation']} px-5`}
                                >
                                    {data?.data.map(guide => (
                                        <SwiperSlide
                                            data-aos="fade-up"
                                            key={guide.id}
                                            className="position-relative"
                                        >
                                            <Link
                                                href={`/${locale}/tourguide/${guide.id}`}
                                                style={{ textDecoration: 'none' }}
                                                className="col-md-3 mb-3"
                                            >
                                                <div>
                                                    <div className={`${style.cardSection} card`}>
                                                        <img
                                                            className={style.swiperSlideImage}
                                                            // src="/homepage/tour-guide/1.jpeg"
                                                            src={
                                                                guide.image ||
                                                                '/homepage/tour-guide/1.jpeg'
                                                            }
                                                            alt="tourGuide"
                                                        />
                                                        <div className="card-body">
                                                            <h5 className={`${style.cardTitle}`}>
                                                                {/* Ahmed Al-Harthi */}
                                                                {guide.name}
                                                            </h5>
                                                            <div className={style.cardRate}>
                                                                <div className="ml-2">
                                                                    <img
                                                                        src="/homepage/tour-guide/star.png"
                                                                        alt="star"
                                                                    />
                                                                </div>
                                                                <p className="m-0">
                                                                    {guide.rate || 'null'}
                                                                </p>
                                                            </div>

                                                            <div className={style.location}>
                                                                <div>
                                                                    <img
                                                                        src="/homepage/tour-guide/location.png"
                                                                        alt="location"
                                                                    />
                                                                </div>
                                                                <p className="m-0">
                                                                    {guide.city} , {guide.country}
                                                                </p>
                                                            </div>

                                                            <div className={style.location}>
                                                                <div>
                                                                    <img
                                                                        src="/homepage/tour-guide/lang.png"
                                                                        alt="lang"
                                                                    />
                                                                </div>
                                                                {guide.languages.map(lang => (
                                                                    <p
                                                                        className="m-0"
                                                                        key={lang.id}
                                                                    >
                                                                        {lang.name}
                                                                    </p>
                                                                ))}
                                                            </div>

                                                            <div className={style.cardPrice}>
                                                                <p>$ {guide.price}</p>
                                                                <div>
                                                                    {t('for')} {guide.days}{' '}
                                                                    {t(
                                                                        'days including accomodation'
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <ContactUs />
            <Newsletter />
        </div>
    );
};

export default page;
