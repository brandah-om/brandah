'use client';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import NavBar from '@/components/navBar/NavBar';
import { useGetAgencysBtIdQuery } from '@/store/Agency/AgencyDetailsSlice';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import style from './details.module.css';
import Loading from '@/components/Loading/Loading';
import ContactUs from '../../home/component/contactUs/ContactUs';
import Newsletter from '../../home/component/newsletter/Newsletter';
import { motion } from 'framer-motion';
import HeroSection from '@/components/heroSection/HeroSection';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FlagIcon from '@mui/icons-material/Flag';
import CategoryIcon from '@mui/icons-material/Category';
import { useGetAgencyTripQuery } from '@/store/Agency/AgencyTripSlice';
import Link from 'next/link';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { Oxygen } from 'next/font/google';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Image from 'next/image';

const oxygenFont = Oxygen({
    subsets: ['latin'],
    weight: ['400'],
});

const Page = ({ params }) => {
    const { id } = params;
    const locale = useLocale();
    const t = useTranslations('HomePage');

    const { data, isLoading, error } = useGetAgencysBtIdQuery({ id, lang: locale });
    const {
        data: agenyTrip,
        isLoading: tripLoading,
        error: TripError,
    } = useGetAgencyTripQuery({ id, lang: locale });

    let agency = null;
    if (!isLoading && data?.data) {
        agency = data.data;
    }

    const breadcrumbs = [
        { label: t('Home'), href: `/${locale}/` },
        { label: t('Agency'), href: `/${locale}/agency` },
        { label: agency?.name },
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    return (
        <div>
            <NavBar />
            <div className={style.agencyDetails}>
                <div
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.288), rgba(0, 0, 0, 0.274)), 
                    url(${agency?.image || '/hero-section.jpeg'})`,
                        height: '500px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    data-aos="fade-up"
                >
                    <HeroSection
                        title={agency?.name || 'agency Page'}
                        description={
                            agency?.heading || t('Dream, Explore, Discover Your Travel Begins Here')
                        }
                    />
                </div>
                <div className="my-3 px-lg-3 px-1">
                    <DynamicBreadcrumbs items={breadcrumbs} />
                </div>

                <div className="container-fluid px-lg-5 px-1">
                    {isLoading ? (
                        <Loading />
                    ) : error || !agency ? (
                        <p>{t('Error loading Data')}</p>
                    ) : (
                        <>
                            <div className="row my-4">
                                <h2>{agency.name}</h2>

                                <div className="col-md-4 mb-3">
                                    <a className={style.contactLink} href={`tel:${agency.phone}`}>
                                        <div className={`${style.detailsBox}`}>
                                            <div className="d-flex flex-lg-row flex-column justify-content-center align-items-center gap-1">
                                                <PhoneIphoneIcon />
                                                <span>{t('Phone')}</span>
                                            </div>
                                            <p className="m-0">{agency.phone}</p>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <a
                                        className={style.contactLink}
                                        href={`mailto:${agency.phone}`}
                                    >
                                        <div className={`${style.detailsBox}`}>
                                            <div className="d-flex flex-lg-row flex-column justify-content-center align-items-center gap-1">
                                                <EmailIcon />
                                                <span>{t('Email')}</span>
                                            </div>
                                            <p className="m-0">{agency.email}</p>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <div className={`${style.detailsBox}`}>
                                        <div className="d-flex justify-content-center align-items-center gap-1">
                                            <CategoryIcon />
                                            <span>{t('Provider Type')}</span>
                                        </div>
                                        <p className="m-0">{agency.provider_type}</p>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <div className={`${style.detailsBox}`}>
                                        <div className="d-flex justify-content-center align-items-center gap-1">
                                            <LocationCityIcon />
                                            <span>{t('City')}</span>
                                        </div>
                                        <p className="m-0">{agency.city}</p>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <div className={`${style.detailsBox}`}>
                                        <div className="d-flex justify-content-center align-items-center gap-1">
                                            <FlagIcon />
                                            <span>{t('Country')}</span>
                                        </div>
                                        <p className="m-0">{agency.country}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="row">
                        <h2 className="mb-3">{t('Top Rated Trips')}</h2>
                        {agenyTrip?.data.map((trip, index) => (
                            <motion.div
                                key={trip.id}
                                className="col-md-4 mb-3"
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
                                    href={`/${locale}/trips/${trip.id}`}
                                    style={{ textDecoration: 'none' }}
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
                                                <h5 data-aos="fade-up" className={style.cardTitle}>
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
                                                <p className={`${oxygenFont.className}`}>
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
                                                <p className={`${oxygenFont.className} m-0`}>
                                                    {t('Availability')}:{' '}
                                                    {typeof trip.availability === 'object'
                                                        ? trip.availability.en
                                                        : trip.availability}
                                                </p>
                                            </div>

                                            <div data-aos="fade-up" className={style.cardPrice}>
                                                <p className="m-0">
                                                    $ {trip.start_from} {t('/pac')}
                                                </p>
                                                <div>
                                                    {t('by')} {trip.agency || ''}{' '}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
