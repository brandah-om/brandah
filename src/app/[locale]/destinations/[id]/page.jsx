'use client';
import React from 'react';
import style from './destination.module.css';
import NavBar from '@/components/navBar/NavBar';
import Loading from '@/components/Loading/Loading';
import Image from 'next/image';
import ContactUs from '../../home/component/contactUs/ContactUs';
import Newsletter from '../../home/component/newsletter/Newsletter';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useLocale } from 'next-intl';
import { useGetDestinationDetailsQuery } from '@/store/HomePage/DestinationDetailsSlice';
import MapComponent from '../components/MapComponent';

const page = ({ params }) => {
    const { id } = params;
    const locale = useLocale();
    const { data, isLoading, error } = useGetDestinationDetailsQuery(id);

    const trans = data?.data;

    const breadcrumbs = [{ label: 'Home', href: '/' }, { label: trans?.name }];

    return (
        <div>
            <NavBar />
            <div className={style.transDetails}>
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <div className="text-center mt-4">
                        <p>Error loading destination details.</p>
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
                                                        height: '100%',
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="card-body text-left">
                                                <h5 className={style.cardTitle}>
                                                    {trans.name || 'null'}
                                                </h5>
                                                <div className={style.cardBody}>
                                                    <p className="m-0">
                                                        <span className="fw-bold">
                                                            Description:
                                                        </span>{' '}
                                                        {trans.description || 'null'}
                                                    </p>
                                                    <p className="m-0">
                                                        <span className="fw-bold">Country:</span>{' '}
                                                        {trans.country || 'null'}
                                                    </p>
                                                    <p className="m-0">
                                                        <span className="fw-bold">Packages:</span>{' '}
                                                        {trans.packages || 'null'}
                                                    </p>
                                                    <p className="m-0">
                                                        <span className="fw-bold">Sites:</span>{' '}
                                                        {trans.sites || 'null'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* إضافة خريطة Google Maps */}
                                <div className="mt-4">
                                    <h4>Location on Map</h4>
                                    <MapComponent
                                        latitude={parseFloat(trans.latitude)}
                                        longitude={parseFloat(trans.longitude)}
                                    />
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
