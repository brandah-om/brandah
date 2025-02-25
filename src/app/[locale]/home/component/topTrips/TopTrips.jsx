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
            toast.error(t('You must be logged in to access this page'), {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
            });

            setTimeout(() => {
                router.push(`/${locale}/login`);
            }, 3000);

            return;
        }

        if (!isSubscribed) {
            toast.error(t('You must be subscribed to access this page'), {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
            });

            setTimeout(() => {
                router.push(`/${locale}/subscribe`);
            }, 3000);

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

                <div className="row mt-lg-4 mb-3">
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
                </div>
            </div>
        </motion.div>
    );
};

export default TopTrips;
