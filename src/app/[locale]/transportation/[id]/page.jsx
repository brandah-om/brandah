'use client';
import React, { useEffect } from 'react';
import style from './transDetails.module.css';
import NavBar from '@/components/navBar/NavBar';
import { useGetTranssBtIdQuery } from '@/store/Transportation/TransDetailsSlice';
import Loading from '@/components/Loading/Loading';
import Image from 'next/image';
import ContactUs from '../../home/component/contactUs/ContactUs';
import Newsletter from '../../home/component/newsletter/Newsletter';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useLocale, useTranslations } from 'next-intl';
import { useGetCarAgencyBtIdQuery } from '@/store/Transportation/CarAgencySlice';
import Aos from 'aos';
import HeroSection from '@/components/heroSection/HeroSection';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FlagIcon from '@mui/icons-material/Flag';
import CategoryIcon from '@mui/icons-material/Category';
import Link from 'next/link';

const page = ({ params }) => {
    const { id } = params;
    const locale = useLocale();
    const t = useTranslations('HomePage');
    const { data, isLoading, error } = useGetTranssBtIdQuery({ id, lang: locale });
    const {
        data: carData,
        isLoading: loadingCar,
        error: errorCar,
    } = useGetCarAgencyBtIdQuery({ id, lang: locale });

    const trans = data?.data;
    const breadcrumbs = [
        { label: t('Home'), href: '/' },
        { label: t('Transportation'), href: `/${locale}/transportation` },
        { label: trans?.name },
    ];

    useEffect(() => {
        Aos.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);

    return (
        <div>
            <NavBar />
            <div className={style.transDetails}>
                <div
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.288), rgba(0, 0, 0, 0.274)), 
                    url(${trans?.images || '/hotel-details/1.jpeg'})`,
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
                        title={trans?.name || 'trans Page'}
                        description={
                            trans?.heading || 'Dream, Explore, Discover Your Travel Begins Here'
                        }
                    />
                </div>
                <div className="my-3 px-lg-3 px-1">
                    <DynamicBreadcrumbs items={breadcrumbs} />
                </div>
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <div className="text-center mt-4">
                        <p>{t('Error loading Data')}</p>
                    </div>
                ) : (
                    <div className="container mb-5">
                        <div className="row">
                            <div className="row my-4">
                                <h2 className="text-decoration-underline">{trans.name}</h2>

                                <div className="col-md-4 mb-3">
                                    <a className={style.contactLink} href={`tel:${trans.phone}`}>
                                        <div className={`${style.detailsBox}`}>
                                            <div className="d-flex flex-lg-row flex-column justify-content-center align-items-center gap-1">
                                                <PhoneIphoneIcon />
                                                <span>{t('Phone')}</span>
                                            </div>
                                            <p className="m-0">{trans.phone}</p>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <a className={style.contactLink} href={`mailto:${trans.phone}`}>
                                        <div className={`${style.detailsBox}`}>
                                            <div className="d-flex flex-lg-row flex-column justify-content-center align-items-center gap-1">
                                                <EmailIcon />
                                                <span>{t('Email')}</span>
                                            </div>
                                            <p className="m-0">{trans.email}</p>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <div className={`${style.detailsBox}`}>
                                        <div className="d-flex justify-content-center align-items-center gap-1 flex-lg-row flex-column">
                                            <CategoryIcon />
                                            <span>{t('Provider Type')}</span>
                                        </div>
                                        <p className="m-0">{trans.provider_type}</p>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <div className={`${style.detailsBox}`}>
                                        <div className="d-flex justify-content-center align-items-center gap-1 flex-lg-row flex-column">
                                            <LocationCityIcon />
                                            <span>{t('City')}</span>
                                        </div>
                                        <p className="m-0">{trans.city}</p>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <div className={`${style.detailsBox}`}>
                                        <div className="d-flex justify-content-center align-items-center gap-1 flex-lg-row flex-column">
                                            <FlagIcon />
                                            <span>{t('Country')}</span>
                                        </div>
                                        <p className="m-0">{trans.country}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {loadingCar ? (
                    <Loading />
                ) : errorCar ? (
                    <div className="text-center mt-4">
                        <p>{t('Error loading Data')}</p>
                    </div>
                ) : (
                    <div className="container mb-5">
                        <div className="row">
                            <h2 data-aos="fade-down">
                                {t('Cars')} {trans?.name}
                            </h2>

                            {carData?.data?.map(car => (
                                <div key={car.id} className="col-md-4 mt-4">
                                    <Link
                                        className="text-decoration-none"
                                        href={`/${locale}/transportation/${id}/Cars/${car.id}`}
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
                                                    src={car.image || '/hotel-details/1.jpeg'}
                                                    alt="cars"
                                                    fill
                                                    style={{
                                                        objectFit: 'cover',
                                                    }}
                                                    data-aos="fade-up"
                                                />
                                            </div>

                                            <div className={style.cardBody}>
                                                <h6 className="fw-bold text-main">{car.name}</h6>
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: car.overview || '',
                                                    }}
                                                    data-aos="fade-up"
                                                ></p>

                                                <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center">
                                                    <div data-aos="fade-up">
                                                        <span className="fw-bold text-main">
                                                            {t('Price')}
                                                        </span>
                                                    </div>
                                                    <div data-aos="fade-up">
                                                        <span>
                                                            {car.price} {car.currency}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center">
                                                    <div data-aos="fade-up">
                                                        <span className="fw-bold text-main">
                                                            {t('Minimum Booking Days')}
                                                        </span>
                                                    </div>
                                                    <div data-aos="fade-up">
                                                        <span>
                                                            {car.minimum_booking_days || 'null'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center">
                                                    <div data-aos="fade-up">
                                                        <span className="fw-bold text-main">
                                                            {t('Maximum Booking Days')}
                                                        </span>
                                                    </div>
                                                    <div data-aos="fade-up">
                                                        <span>
                                                            {car.maximum_booking_days || 'null'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <ContactUs />
            <Newsletter />
        </div>
    );
};

export default page;
