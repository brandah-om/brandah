'use client';
import NavBar from '@/components/navBar/NavBar';
import React from 'react';
import style from './tourguide.module.css';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useGetTourGuideQuery } from '@/store/tourGuide/AllTourGuideApiSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Loading from '@/components/Loading/Loading';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import ContactUs from '../home/component/contactUs/ContactUs';
import Newsletter from '../home/component/newsletter/Newsletter';

const page = () => {
    const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Tour Guides' }];
    const { data, error, isLoading } = useGetTourGuideQuery();
    const locale = useLocale();

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
                            <p>Error loading page content.</p>
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
                                        <SwiperSlide key={guide.id} className="position-relative">
                                            <Link
                                                href={`/${locale}/tourguide/${guide.id}`}
                                                style={{ textDecoration: 'none' }}
                                                className="col-md-3 mb-3"
                                                key={guide.id}
                                            >
                                                <div>
                                                    <div className={`${style.cardSection} card`}>
                                                        <img
                                                            className={style.swiperSlideImage}
                                                            // src="/homepage/tour-guide/1.jpeg"
                                                            src={guide.image}

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
                                                                <p className="m-0">Muscat , Oman</p>
                                                            </div>

                                                            <div className={style.location}>
                                                                <div>
                                                                    <img
                                                                        src="/homepage/tour-guide/lang.png"
                                                                        alt="lang"
                                                                    />
                                                                </div>
                                                                <p className="m-0">
                                                                    English, Arabic
                                                                </p>
                                                            </div>

                                                            <div className={style.cardPrice}>
                                                                <p>$ 150</p>
                                                                <div>
                                                                    for 3 days including
                                                                    accomodation
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
