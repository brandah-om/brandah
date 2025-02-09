'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import style from './slider.module.css';
import { useTranslations } from 'next-intl';

export default function HomeSlider() {
    const t = useTranslations('HomePage');
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className={`${style.mySwiper} ${style['global-pagination']} ${style['global-navigation']}`}
            >
                <SwiperSlide>
                    <div
                        style={{
                            background: `linear-gradient(to right, rgba(0, 0, 0, 0.205), rgba(0, 0, 0, 0.267)), url('/carousel-home.png')`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            height: '100vh',
                            backgroundRepeat: 'no-repeat',
                            paddingTop: '60px',
                        }}
                    >
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <img className={style.sliderLogo} src="/logo-home.png" alt="Image 1" />
                            <h6 className={`${style.sliderTitle}`}>{t('Oman')}</h6>
                            <p className={`${style.sliderCaption}`}>
                                {t('Dream, Explore, Discover Your Travel Begins Here')}{' '}
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        style={{
                            background: `linear-gradient(to right, rgba(0, 0, 0, 0.205), rgba(0, 0, 0, 0.267)), url('/hero-section.jpeg')`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            height: '100vh',
                            backgroundRepeat: 'no-repeat',
                            paddingTop: '60px',
                        }}
                    >
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <img className={style.sliderLogo} src="/logo-home.png" alt="Image 2" />
                            <h6 className={`${style.sliderTitle}`}>{t('Oman')}</h6>
                            <p className={`${style.sliderCaption}`}>
                                {t('Dream, Explore, Discover Your Travel Begins Here')}
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        style={{
                            background: `linear-gradient(to right, rgba(0, 0, 0, 0.205), rgba(0, 0, 0, 0.267)), url('/homepage/top-trip/1.jpeg')`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            height: '100vh',
                            backgroundRepeat: 'no-repeat',
                            paddingTop: '60px',
                        }}
                    >
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <img className={style.sliderLogo} src="/logo-home.png" alt="Image 3" />
                            <h6 className={`${style.sliderTitle}`}>{t('Oman')}</h6>
                            <p className={`${style.sliderCaption}`}>
                                {t('Dream, Explore, Discover Your Travel Begins Here')}
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
