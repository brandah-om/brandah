'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import style from './SwiperCar.module.css';

const SwiperCar = () => {
    return (
        <div>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1200: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                }}
                modules={[Navigation]}
                className={`${style.mySwiper} ${style['global-pagination']} ${style['global-navigation']} mt-lg-5 mt-3 px-5`}
            >
                <SwiperSlide>
                    <div className={`${style.cardSection} card`}>
                        <img
                            className={style.swiperSlideImage}
                            src="/swiper-car/car-1.png"
                            alt="tourGuide"
                        />
                        <div className={style.cardBody}>
                            <h6>Your Comfort, Our Priority</h6>
                            <p>
                                Experience seamless travel with our private bus service designed for
                                your comfort and convenience.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className={`${style.cardSection} card`}>
                        <img
                            className={style.swiperSlideImage}
                            src="/swiper-car/car-2.jpeg"
                            alt="tourGuide"
                        />
                        <div className={style.cardBody}>
                            <h6>Your Comfort, Our Priority</h6>
                            <p>
                                Experience seamless travel with our private bus service designed for
                                your comfort and convenience.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${style.cardSection} card`}>
                        <img
                            className={style.swiperSlideImage}
                            src="/swiper-car/car-1.png"
                            alt="tourGuide"
                        />
                        <div className={style.cardBody}>
                            <h6>Your Comfort, Our Priority</h6>
                            <p>
                                Experience seamless travel with our private bus service designed for
                                your comfort and convenience.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className={`${style.cardSection} card`}>
                        <img
                            className={style.swiperSlideImage}
                            src="/swiper-car/car-2.jpeg"
                            alt="tourGuide"
                        />
                        <div className={style.cardBody}>
                            <h6>Your Comfort, Our Priority</h6>
                            <p>
                                Experience seamless travel with our private bus service designed for
                                your comfort and convenience.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default SwiperCar;
