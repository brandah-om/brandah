'use client';
import React, { useEffect } from 'react';
import NavBar from '@/components/navBar/NavBar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import style from './trips.module.css';
import Newsletter from '../home/component/newsletter/Newsletter';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Oxygen } from 'next/font/google';
import Filter from '@/components/filter/Filter';
import { useGetTripsQuery } from '@/store/trips/AllTripsSlice';
import Loading from '@/components/Loading/Loading';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Aos from 'aos';
import { motion } from 'framer-motion';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { Vujahday_Script } from 'next/font/google';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});
const oxygenFont = Oxygen({
    subsets: ['latin'],
    weight: ['400'],
});

const Trips = () => {
    const [open, setOpen] = React.useState(false);
    const locale = useLocale();
    const t = useTranslations('HomePage');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { data, error, isLoading } = useGetTripsQuery(locale);
    const breadcrumbs = [{ label: t('Home'), href: `/${locale}/` }, { label: t('Trips') }];

    useEffect(() => {
        Aos.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
    };

    return (
        <div>
            <NavBar />
            <div className={style.tripsPage}>
                <DynamicBreadcrumbs items={breadcrumbs} />

                <div className="text-center mt-3">
                    <motion.h2 className={style.destinationMailTitle} {...fadeInUp}>
                        {t('Trips')}
                    </motion.h2>
                    <motion.h6
                        className={`${vujahday.className} ${style.destinationTitle}`}
                        {...fadeInUp}
                    >
                        {t('Discover your happy place')}
                    </motion.h6>
                    <motion.p className={style.destinationCaption} {...fadeInUp}>
                        {t('Explore top Trips voted by more than +100,000 customers')}
                    </motion.p>
                </div>

                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <p>{t('Error loading Data')}</p>
                ) : (
                    <>
                        <div className="mt-4 d-flex justify-content-between align-items-center">
                            {/* <form data-aos="fade-up" className="d-flex justify-content-start">
                                <input
                                    type="text"
                                    className={style.subscribeInput}
                                    placeholder={t('Type here')}
                                />
                                <button className={style.subscribeBtn}>{t('Subscribe')}</button>
                            </form> */}
                            <Filter
                                data-aos="fade-up"
                                open={open}
                                handleClickOpen={handleClickOpen}
                                handleClose={handleClose}
                            />
                        </div>
                        <div className="container-fluid mt-5">
                            <div className="row">
                                {data.data.map(trip => (
                                    <Link
                                        href={`/${locale}/trips/${trip.id}`}
                                        style={{ textDecoration: 'none' }}
                                        className="col-md-3 mb-3"
                                        key={trip.id}
                                    >
                                        <div className={`${style.cardSection} card`}>
                                            <div
                                                style={{
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '250px',
                                                }}
                                            >
                                                <Image
                                                    src={trip.banner || '/homepage/top-trip/3.png'}
                                                    alt={trip.name}
                                                    fill
                                                    style={{
                                                        objectFit: 'cover',
                                                        borderTopRightRadius: '8px',
                                                        borderTopLeftRadius: '8px',
                                                    }}
                                                    data-aos="fade-up"
                                                />
                                            </div>

                                            <div className="card-body">
                                                {trip.name ? (
                                                    <h5
                                                        data-aos="fade-up"
                                                        className={style.cardTitle}
                                                    >
                                                        {trip.name}
                                                    </h5>
                                                ) : (
                                                    <h5 data-aos="fade-up">No Name Available</h5>
                                                )}
                                                {trip.description ? (
                                                    <div
                                                        data-aos="fade-up"
                                                        className={style.cardDesc}
                                                        dangerouslySetInnerHTML={{
                                                            __html: trip.description,
                                                        }}
                                                    />
                                                ) : (
                                                    <div data-aos="fade-up">
                                                        No Description Available
                                                    </div>
                                                )}
                                                <div data-aos="fade-up" className={style.cardBody}>
                                                    <TimerOutlinedIcon sx={{ color: '#DB944B' }} />
                                                    <p className={oxygenFont.className}>
                                                        {trip.daysCount} {t('Days')} /{' '}
                                                        {trip.daysCount - 1} {t('Nights')}
                                                    </p>
                                                </div>
                                                <div
                                                    data-aos="fade-up"
                                                    className={`${style.cardBody} mb-3`}
                                                >
                                                    <CalendarTodayOutlinedIcon
                                                        sx={{ color: '#DB944B' }}
                                                    />
                                                    <p className={oxygenFont.className}>
                                                        {t('Availability')}:{' '}
                                                        {typeof trip.availability === 'object'
                                                            ? trip.availability.en
                                                            : trip.availability}
                                                    </p>
                                                </div>

                                                <div data-aos="fade-up" className={style.cardPrice}>
                                                    <p>
                                                        $ {trip.start_from} {t('/pac')}
                                                    </p>
                                                    <div>
                                                        {t('by')}{' '}
                                                        {trip.agency || ''}{' '}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                {/* <Newsletter /> */}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Trips;
