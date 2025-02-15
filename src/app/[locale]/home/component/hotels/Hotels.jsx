'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Vujahday_Script } from 'next/font/google';
import style from './hotesl.module.css';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const Hotels = ({ data }) => {
    const t = useTranslations('HomePage');
    const locale = useLocale();

    return (
        <div className="px-lg-5 px-2">
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-12 text-center mb-4">
                        <motion.h6
                            className={`${vujahday.className} ${style.hotelsTitle}`}
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            {t('wonderful place for you')}
                        </motion.h6>

                        <motion.h2
                            className={style.hotelsMailTitle}
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {t('Popular Hotels')}
                        </motion.h2>

                        <motion.p
                            className={style.hotelsCaption}
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            {t('Explore our popular hotels voted by more than +100,000 customers')}
                        </motion.p>
                    </div>

                    {data?.slice(0, 4).map((hotel, index) => (
                        <motion.div
                            className="col-md-3 mb-3"
                            key={hotel.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className={`${style.cardSection} card`}>
                                <img
                                    className={`${style.hotelImg} card-img-top`}
                                    src={hotel.images || '/homepage/hotels/1.png'}
                                    alt={hotel.name || t('null')}
                                />
                                <div className="card-body">
                                    <h5 className={`${style.cardTitle}`}>
                                        {hotel.name || t('null')}
                                    </h5>
                                    <p
                                        className={`${style.cardBody}`}
                                        dangerouslySetInnerHTML={{
                                            __html: hotel.description || '',
                                        }}
                                    ></p>
                                    <div className={style.cardRate}>
                                        <div className="ml-2">
                                            <img src="/homepage/hotels/star.png" alt="star" />
                                        </div>
                                        <p className="m-0">{hotel.rating || t('null')}</p>
                                    </div>
                                    <div className={style.cardPrice || t('null')}>
                                        <p>
                                            {hotel.price || t('null')} {hotel.currency}
                                        </p>
                                        <div>
                                            {hotel.days || t('null')} {t('nights accomodation')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        className={`${style.cardBtn} col-md-12`}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link href={`/${locale}/hotels`}>
                            <span>{t('View More Hotels')}</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hotels;
