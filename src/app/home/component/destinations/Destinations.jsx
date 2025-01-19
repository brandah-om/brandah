'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import style from './destination.module.css';

import { Vujahday_Script } from 'next/font/google';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const Destinations = () => {
    return (
        <div>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-12 text-center mb-3">
                        <h6 className={`${vujahday.className} ${style.destinationTitle}`}>
                            Discover your happy place
                        </h6>
                        <h2 className={style.destinationMailTitle}>Destinations</h2>
                        <p className={style.destinationCaption}>
                            Explore top destinations voted by more than +100,000 customers
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
                        <SwiperSlide className="position-relative">
                            <div className={style.overlay}></div>
                            <img
                                className={style.swiperSlideImage}
                                src="/homepage/destinations/destination-2.jpeg"
                                alt="Destination"
                            />
                            <div className={style.sliderImgCaption}>
                                <h6>Al Wusta</h6>
                                <p>
                                    A vast home to oil fields, unique wildlife like the Arabian Oryx
                                </p>
                            </div>
                                <button className={style.viewMore}>View More</button>
                        </SwiperSlide>

                        <SwiperSlide className="position-relative">
                            <div className={style.overlay}></div>
                            <img
                                className={style.swiperSlideImage}
                                src="/homepage/destinations/destination-1.jpeg"
                                alt="Destination"
                            />
                            <div className={style.sliderImgCaption}>
                                <h6>Al Buraimi</h6>
                                <p>
                                    A border governorate near the UAE, with historical.
                                </p>
                            </div>
                                <button className={style.viewMore}>View More</button>
                        </SwiperSlide>

                        <SwiperSlide className="position-relative">
                            <div className={style.overlay}></div>
                            <img
                                className={style.swiperSlideImage}
                                src="/homepage/destinations/destination-3.jpeg"
                                alt="Destination"
                            />
                            <div className={style.sliderImgCaption}>
                                <h6>Musandam</h6>
                                <p>Located in the northernmost part of Oman</p>
                            </div>
                                <button className={style.viewMore}>View More</button>
                        </SwiperSlide>

                        <SwiperSlide className="position-relative">
                            <div className={style.overlay}></div>
                            <img
                                className={style.swiperSlideImage}
                                src="/homepage/destinations/destination-4.jpeg"
                                alt="Destination"
                            />
                            <div className={style.sliderImgCaption}>
                                <h6>Dhofar</h6>
                                <p>Known for its lush greenery during the Khareef</p>
                            </div>
                                <button className={style.viewMore}>View More</button>
                        </SwiperSlide>

                        <SwiperSlide className="position-relative">
                            <div className={style.overlay}></div>
                            <img
                                className={style.swiperSlideImage}
                                src="/homepage/destinations/destination-5.jpeg"
                                alt="Destination"
                            />
                            <div className={style.sliderImgCaption}>
                                <h6>Muscat</h6>
                                <p>The capital region and economic hub of Oman</p>
                            </div>
                                <button className={style.viewMore}>View More</button>
                        </SwiperSlide>

                        <SwiperSlide className="position-relative">
                            <div className={style.overlay}></div>
                            <img
                                className={style.swiperSlideImage}
                                src="/homepage/destinations/destination-1.jpeg"
                                alt="Destination"
                            />
                            <div className={style.sliderImgCaption}>
                                <h6>Al Wusta</h6>
                                <p>
                                    A vast home to oil fields, unique wildlife like the Arabian Oryx
                                </p>
                            </div>
                                <button className={style.viewMore}>View More</button>
                        </SwiperSlide>

                        <SwiperSlide className="position-relative">
                            <div className={style.overlay}></div>
                            <img
                                className={style.swiperSlideImage}
                                src="/homepage/destinations/destination-3.jpeg"
                                alt="Destination"
                            />
                            <div className={style.sliderImgCaption}>
                                <h6>Al Wusta</h6>
                                <p>The capital region and economic hub of Oman</p>
                            </div>
                                <button className={style.viewMore}>View More</button>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Destinations;
