'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import style from './topTrips.module.css';
import Link from 'next/link';
import { Vujahday_Script } from 'next/font/google';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const topTripTitle = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const TopTrips = ({ data }) => {
    const locale = useLocale();
    const t = useTranslations('HomePage');
    const router = useRouter();
    const [isSubscribed, setIsSubscribed] = useState(null);
    const [token, setToken] = useState(null);

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

    return (
        <motion.div
            className={style.topTrips}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
        >
            <div className="container">
                <div className="row">
                    <motion.div
                        className={`${style.TopTripsCaption} col-md-12 mb-3`}
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h6 className={topTripTitle.className}>
                            {t('Make Your Tour More Pleasure')}
                        </h6>
                        <h4>{t('Top Trips')}</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        </p>
                    </motion.div>

                    {data?.slice(0, 2).map((trip, index) => (
                        <motion.div
                            className="col-md-6 mb-3"
                            key={trip.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href={`/${locale}/trips/${trip.id}`}
                                onClick={e => {
                                    e.preventDefault();
                                    handleNavigation(`/${locale}/trips/${trip.id}`);
                                }}
                                style={{ textDecoration: 'none' }}
                            >
                                <div className={style.topTripImgSec}>
                                    <img
                                        className={`${style.topTripImgRow} img-fluid`}
                                        src={trip.banners || '/homepage/top-trip/3.png'}
                                        alt={trip.name || 'trip Name'}
                                    />
                                    <motion.div
                                        className={style.TopTripsImgCaption}
                                        initial={{ opacity: 0, y: -50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="d-flex justify-content-start align-items-center gap-1 flex-wrap">
                                            {trip.description ? (
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: trip.description,
                                                    }}
                                                ></p>
                                            ) : (
                                                <p>{t('No description available')}</p>
                                            )}
                                            <Link
                                                className={style.readMoreLink}
                                                href={`/${locale}/trips/${trip.id}`}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    handleNavigation(`/${locale}/trips/${trip.id}`);
                                                }}
                                            >
                                                {t('Read More')}
                                            </Link>
                                        </div>
                                    </motion.div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* <div className="row mt-lg-4 mb-3">
                    {data?.slice(2, 5).map((trip, index) => (
                        <motion.div
                            className="col-md-4 mb-3"
                            key={trip.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className={style.topTripImgSec}>
                                <img
                                    className={`${style.topTripImgRow} img-fluid`}
                                    src={trip.banner || '/homepage/top-trip/3.png'}
                                    alt={trip.name || 'trip Name'}
                                />
                                <motion.div
                                    className={style.TopTripsImgCaption}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="d-flex justify-content-start align-items-center gap-1 flex-wrap">
                                        {trip.description ? (
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: trip.description,
                                                }}
                                            ></p>
                                        ) : (
                                            <p>{t('No description available')}</p>
                                        )}
                                        <Link
                                            href={`/${locale}/trips/${trip.id}`}
                                            onClick={e => {
                                                e.preventDefault();
                                                handleNavigation(`/${locale}/trips/${trip.id}`);
                                            }}
                                        >
                                            {t('Read More')}
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div> */}
            </div>
        </motion.div>
    );
};

export default TopTrips;
