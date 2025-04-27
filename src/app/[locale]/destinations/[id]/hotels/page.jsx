'use client';
import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '../../../../../components/navBar/NavBar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import style from './hotels.module.css';
import Loading from '../../../../../components/Loading/Loading';
import { useLocale, useTranslations } from 'next-intl';
import { useGetHotelStatesBtIdQuery } from '../../../../../store/hotels/HotelsByDestinationSlice';

const page = ({ params }) => {
    const locale = useLocale();
    const { id } = params || {};

    const { data, error, isLoading } = useGetHotelStatesBtIdQuery({ id, lang: locale });

    const t = useTranslations('HomePage');

    const hotels = data?.data || [];

    return (
        <div>
            <NavBar />
            <div className={style.hotelsPage}>
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link className={style.links} underline="hover" href="/">
                            {t('Home')}
                        </Link>
                        <Typography className={style.subLink} sx={{ color: 'text.primary' }}>
                            {t('Hotels')}
                        </Typography>
                    </Breadcrumbs>
                </div>

                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <p>{t('Error loading Data')}</p>
                ) : hotels.length === 0 ? (
                    <p className="text-center">{t('No hotels available for this destination.')}</p>
                ) : (
                    <>
                        {/* <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            viewport={{ once: true }}
                            className="mt-4 d-flex justify-content-between align-items-center"
                        >
                            <form className="d-flex justify-content-start">
                                <input
                                    type="text"
                                    className={style.subscribeInput}
                                    placeholder={t('Type here')}
                                />
                                <button className={style.subscribeBtn}>{t('Subscribe')}</button>
                            </form>
                            <Filter
                                open={open}
                                handleClickOpen={handleClickOpen}
                                handleClose={handleClose}
                            />
                        </motion.div> */}

                        <div className="container-fluid mt-4">
                            <div className="row">
                                <h2 className="mb-4">
                                    {t('Hotels in')}{' '}
                                    {hotels.length > 0 ? hotels[0]?.state : 'Unknown'}
                                </h2>

                                {hotels.map((hotel, index) => (
                                    <motion.div
                                        key={hotel.id}
                                        className="col-md-3 mb-3"
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                            ease: 'easeOut',
                                        }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <Link
                                            href={`/${locale}/hotels/${hotel.id}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <div
                                                className={`${style.cardSection} card`}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <img
                                                    className={style.cardSectionImg}
                                                    src={hotel.image || '/default-hotel.jpg'}
                                                    alt={hotel.name || 'Hotel Image'}
                                                />
                                                <div className="card-body">
                                                    <h5 className={`${style.cardTitle}`}>
                                                        {hotel.name || 'No Name'}
                                                    </h5>
                                                    {hotel.description ? (
                                                        <p
                                                            className={`${style.cardBody}`}
                                                            dangerouslySetInnerHTML={{
                                                                __html: hotel.description,
                                                            }}
                                                        />
                                                    ) : (
                                                        <p className={`${style.cardBody}`}>
                                                            {t('No description available')}
                                                        </p>
                                                    )}
                                                    <div className={style.cardRate}>
                                                        <div className="ml-2">
                                                            <img
                                                                src="/homepage/hotels/star.png"
                                                                alt="star"
                                                            />
                                                        </div>
                                                        <p className="m-0">
                                                            {hotel.rating || 'No rating'}
                                                        </p>
                                                    </div>
                                                    <div className={style.cardPrice}>
                                                        <p>
                                                            {hotel.price
                                                                ? `${hotel.price} ${hotel.currency}`
                                                                : t('No price available')}
                                                        </p>
                                                        <div>
                                                            {hotel.days
                                                                ? `${hotel.days} ${t(
                                                                      'days including accomodation'
                                                                  )}`
                                                                : t('No duration available')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                            {/* <Newsletter /> */}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default page;
