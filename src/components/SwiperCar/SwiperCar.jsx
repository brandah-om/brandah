'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import style from './SwiperCar.module.css';
import Aos from 'aos';
import { motion } from 'framer-motion';
import { Vujahday_Script } from 'next/font/google';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useGetCarAgencyBtIdQuery } from '@/store/Transportation/CarAgencySlice';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const SwiperCar = ({ data }) => {
    const locale = useLocale();
    const t = useTranslations('HomePage');

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
        if (!token) {
            Swal.fire({
                title: t('You must be logged in or register to access this page'),
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: false,
                showCloseButton: true,
                customClass: {
                    title: 'swal-title-small',
                },
                // <p>${t('Please choose an option')}</p>
                html: `
                        <div class='d-flex justify-content-between align-items-center flex-lg-row flex-column gap-2' >
                            <a 
                                href="/${locale}/RegisterTourist" 
                                style="
                                    padding: 5px 10px;
                                    background-color: #9F733C;
                                    color: white;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-size: 14px;
                                    transition: background-color 0.3s ease;
                                "
                            >
                                ${t('Register Tourist')}
                            </a>
                            <a 
                                href="/${locale}/RegisterAgency" 
                                style="
                                    padding: 5px 10px;
                                    background-color: #9F733C;
                                    color: white;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-size: 14px;
                                    transition: background-color 0.3s ease;
                                "
                            >
                                ${t('Register Agency')}
                            </a>
                            <a 
                                href="/${locale}/RegisterTourGuide" 
                                style="
                                    padding: 5px 10px;
                                    background-color: #9F733C;
                                    color: white;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-size: 14px;
                                    transition: background-color 0.3s ease;
                                "
                            >
                                ${t('Register Tour Guide')}
                            </a>
                            <a
                                href="/${locale}/login" 
                                style="
                                    padding: 5px 10px;
                                    background-color: #9F733C;
                                    color: white;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-size: 14px;
                                    transition: background-color 0.3s ease;
                                "
                            >
                                ${t('Sign In')}
                            </a>
                        </div>
                    `,
                didOpen: () => {
                    const links = document.querySelectorAll('a');
                    links.forEach(link => {
                        link.addEventListener('click', () => {
                            Swal.close();
                        });
                    });
                },
            });
            return;
        }

        if (!isSubscribed) {
            Swal.fire({
                title: t('You must be subscribed to access this page'),
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: t('Subscribe'),
                timer: 3000,
                timerProgressBar: true,
            }).then(result => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                    router.push(`/${locale}/subscribe`);
                }
            });
            return;
        }

        router.push(path);
    };

    const firstCarId = data?.[0]?.id || null;

    const {
        data: carData,
        isLoading: loadingCar,
        error: errorCar,
    } = useGetCarAgencyBtIdQuery({ id: firstCarId, lang: locale }, { skip: !firstCarId });

    useEffect(() => {
        Aos.init({ duration: 800, easing: 'ease-in-out', once: true });
    }, []);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
    };

    return (
        <div>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-12 text-center mb-3">
                        <motion.h6
                            className={`${vujahday.className} ${style.destinationTitle}`}
                            {...fadeInUp}
                        >
                            {t('Discover your happy place')}
                        </motion.h6>
                        <motion.h2 className={style.destinationMailTitle} {...fadeInUp}>
                            {t('Cars')}
                        </motion.h2>
                        <motion.p className={style.destinationCaption} {...fadeInUp}>
                            {t('Explore top Cars voted by more than +100,000 customers')}
                        </motion.p>
                    </div>
                </div>
            </div>
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
                className={`${style.mySwiper} ${style['global-pagination']} ${style['global-navigation']} px-5`}
            >
                {data?.map(car => (
                    <SwiperSlide key={car.id}>
                        <Link
                            className="text-decoration-none"
                            onClick={e => {
                                e.preventDefault();
                                handleNavigation(
                                    `/${locale}/transportation/${car.id}/Cars/${
                                        carData?.data?.id || car.id
                                    }`
                                );
                            }}
                            href={`/${locale}/transportation/${car.id}/Cars/${
                                carData?.data?.id || car.id
                            }`}
                        >
                            <div className={`${style.cardSection} card`}>
                                <img
                                    className={style.swiperSlideImage}
                                    src={car.image || '/swiper-car/car-1.png'}
                                    alt={car.name || 'car name'}
                                />
                                <div className={style.cardBody}>
                                    <h6 data-aos="fade-down">{car.name}</h6>
                                    {/* {car.overview ? ( */}
                                    <p
                                        data-aos="fade-down"
                                        dangerouslySetInnerHTML={{
                                            __html: car.overview,
                                        }}
                                    ></p>
                                    {/* ) : (
                                        <p>No overview available</p>
                                    )} */}
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SwiperCar;
