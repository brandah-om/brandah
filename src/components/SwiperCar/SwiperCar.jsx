'use client';
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import style from './SwiperCar.module.css';
import Aos from 'aos';

const SwiperCar = ({ data }) => {
    useEffect(() => {
        Aos.init({ duration: 800, easing: 'ease-in-out', once: true });
    }, []);

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
                {data?.map(car => (
                    <SwiperSlide key={car.id}>
                        <div className={`${style.cardSection} card`}>
                            <img
                                className={style.swiperSlideImage}
                                src={car.image || '/swiper-car/car-1.png'}
                                alt={car.name || 'car name'}
                            />
                            <div className={style.cardBody}>
                                <h6 data-aos="fade-down">{car.name}</h6>
                                {car.desc ? (
                                    <p
                                        data-aos="fade-down"
                                        dangerouslySetInnerHTML={{
                                            __html: car.desc,
                                        }}
                                    ></p>
                                ) : (
                                    <p>No description available</p>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SwiperCar;
