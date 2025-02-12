'use client';
import React from 'react';
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

    return (
        <div>
            <NavBar />
            <div className={style.tripsPage}>
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link className={style.links} underline="hover" href="/">
                            {t('Home')}
                        </Link>
                        <Typography className={style.subLink} sx={{ color: 'text.primary' }}>
                            {t('Trips')}
                        </Typography>
                    </Breadcrumbs>
                </div>
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <p>{t('Error loading Data')}</p>
                ) : (
                    <>
                        <div className="mt-4 d-flex justify-content-between align-items-center">
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
                                                    src={trip.banner}
                                                    alt={trip.name}
                                                    fill
                                                    style={{
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                            </div>

                                            <div className="card-body">
                                                {trip.name ? (
                                                    <h5 className={style.cardTitle}>{trip.name}</h5>
                                                ) : (
                                                    <h5>No Name Available</h5>
                                                )}
                                                {trip.description ? (
                                                    <div
                                                        className={style.cardDesc}
                                                        dangerouslySetInnerHTML={{
                                                            __html: trip.description,
                                                        }}
                                                    />
                                                ) : (
                                                    <div>No Description Available</div>
                                                )}
                                                <div className={style.cardBody}>
                                                    <TimerOutlinedIcon sx={{ color: '#DB944B' }} />
                                                    <p className={oxygenFont.className}>
                                                        {trip.daysCount} {t('Days')} /{' '}
                                                        {trip.daysCount - 1} {t('Nights')}
                                                    </p>
                                                </div>
                                                <div className={`${style.cardBody} mb-3`}>
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

                                                <div className={style.cardPrice}>
                                                    <p>
                                                        $ {trip.start_from} {t('/pac')}
                                                    </p>
                                                    <div>
                                                        {t('by')}{' '}
                                                        {trip.agency || 'null Brandah Agency'}{' '}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                <Newsletter />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Trips;
