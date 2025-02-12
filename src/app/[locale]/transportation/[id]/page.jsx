'use client';
import React from 'react';
import style from './transDetails.module.css';
import NavBar from '@/components/navBar/NavBar';
import { useGetTranssBtIdQuery } from '@/store/Transportation/TransDetailsSlice';
import Loading from '@/components/Loading/Loading';
import Image from 'next/image';
import ContactUs from '../../home/component/contactUs/ContactUs';
import Newsletter from '../../home/component/newsletter/Newsletter';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useLocale } from 'next-intl';
import { useGetCarAgencyBtIdQuery } from '@/store/Transportation/CarAgencySlice';

const page = ({ params }) => {
    const { id } = params;
    const locale = useLocale();
    const { data, isLoading, error } = useGetTranssBtIdQuery(id, locale);
    const {
        data: carData,
        isLoading: loadingCar,
        error: errorCar,
    } = useGetCarAgencyBtIdQuery(id, locale);
    console.log('carData', carData);

    const trans = data?.data;
    const t = useTranslations('HomePage');
    const breadcrumbs = [
        { label: t('Home'), href: '/' },
        { label: t('Transportation'), href: `/${locale}/transportation` },
        { label: trans?.name },
    ];

    return (
        <div>
            <NavBar />
            <div className={style.transDetails}>
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <div className="text-center mt-4">
                        <p>Error loading transporatation details.</p>
                    </div>
                ) : (
                    <div className="container-fluid mb-5">
                        <div className="row">
                            <DynamicBreadcrumbs items={breadcrumbs} />
                            <div className="col-md-10 m-auto mt-4">
                                <div className={`${style.cardSection} card`}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div
                                                style={{
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '250px',
                                                }}
                                            >
                                                <Image
                                                    src={trans.banner || '/hotel-details/1.jpeg'}
                                                    alt={trans.name}
                                                    fill
                                                    style={{
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="card-body text-left">
                                                <h5 className={style.cardTitle}>
                                                    Name: {trans.name || 'null'}
                                                </h5>
                                                <div className={style.cardBody}>
                                                    <p className="m-0">
                                                        Phone : {trans.phone || 'null'}
                                                    </p>
                                                    <p className="m-0">
                                                        Email : {trans.email || 'null'}
                                                    </p>
                                                    <p className="m-0">
                                                        {' '}
                                                        Provider Type :
                                                        {trans.provider_type || 'null'}
                                                    </p>
                                                    <p className="m-0">
                                                        City : {trans.city || 'null'}
                                                    </p>
                                                    <p className="m-0">
                                                        Country : {trans.country || 'null'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
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
                        <p>Error loading cars.</p>
                    </div>
                ) : (
                    <div className="container-fluid mb-5">
                        <div className="row">
                            <h2> Agency Cars </h2>
                            <div>
                                <div className="col-md-3 mt-4">
                                    <div className={`${style.cardSection} card`}>
                                        <div
                                            style={{
                                                position: 'relative',
                                                width: '100%',
                                                height: '250px',
                                            }}
                                        >
                                            <Image
                                                src={
                                                    carData?.data.images || '/hotel-details/1.jpeg'
                                                }
                                                alt="cars"
                                                fill
                                                style={{
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </div>

                                        <div className={style.cardBody}>
                                            <h6>{carData?.data?.name?.[locale]}</h6>
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        carData?.data.overview?.[locale] ||
                                                        carData?.data.overview?.['en'] ||
                                                        '',
                                                }}
                                            ></p>

                                            <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center">
                                                <div>
                                                    <span>Price</span>
                                                </div>
                                                <div>
                                                    <span>
                                                        {carData?.data.price}{' '}
                                                        {carData?.data.currency}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center">
                                                <div>
                                                    <span>Minimum Booking Days</span>
                                                </div>
                                                <div>
                                                    <span>
                                                        {carData?.data.minimum_booking_days ||
                                                            'null'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center">
                                                <div>
                                                    <span>Maximum Booking Days</span>
                                                </div>
                                                <div>
                                                    <span>
                                                        {carData?.data.maximum_booking_days ||
                                                            'null'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
