'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; // استيراد نمط الـ Pagination
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // استيراد Pagination
import style from './slider.module.css';

export default function HomeSlider() {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 25000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className={style.mySwiper}
            >
                <SwiperSlide>
                    <div className={`${style.sliderimg}`}>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <img className={style.sliderLogo} src="/logo-home.png" alt="Image 1" />
                            <h6 className={`${style.sliderTitle}`}>Oman</h6>
                            <p className={`${style.sliderCaption}`}>
                                Dream, Explore, Discover Your Travel Begins Here{' '}
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${style.sliderimg}`}>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <img className={style.sliderLogo} src="/logo-home.png" alt="Image 1" />
                            <h6 className={`${style.sliderTitle}`}>Oman</h6>
                            <p className={`${style.sliderCaption}`}>
                                Dream, Explore, Discover Your Travel Begins Here{' '}
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${style.sliderimg}`}>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <img className={style.sliderLogo} src="/logo-home.png" alt="Image 1" />
                            <h6 className={`${style.sliderTitle}`}>Oman</h6>
                            <p className={`${style.sliderCaption}`}>
                                Dream, Explore, Discover Your Travel Begins Here{' '}
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
