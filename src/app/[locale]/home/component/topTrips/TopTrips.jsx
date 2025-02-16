'use client';
import React from 'react';
import { motion } from 'framer-motion';
import style from './topTrips.module.css';
import Link from 'next/link';
import { Vujahday_Script } from 'next/font/google';
import { useLocale, useTranslations } from 'next-intl';

const topTripTitle = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const TopTrips = ({ data }) => {
    const locale = useLocale();
    const t = useTranslations('HomePage');

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
                                        <Link href={`/${locale}/trips/${trip.id}`}>
                                            {t('Read More')}
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
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
                                        <Link href={`/${locale}/trips/${trip.id}`}>
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
