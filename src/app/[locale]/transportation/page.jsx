'use client';
import React from 'react';
import style from './transportation.module.css';
import NavBar from '@/components/navBar/NavBar';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useGetTransportationQuery } from '@/store/Transportation/AllTransportationSlice';
import Link from 'next/link';
import Loading from '@/components/Loading/Loading';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import ContactUs from '../home/component/contactUs/ContactUs';
import Newsletter from '../home/component/newsletter/Newsletter';

const Transportation = () => {
    const locale = useLocale();
    const breadcrumbs = [{ label: 'Home', href: '/' }, { label: ' Transportation' }];
    const { data, isLoading, error } = useGetTransportationQuery();
    return (
        <div>
            <NavBar />
            <div className={style.transportation}>
                <DynamicBreadcrumbs items={breadcrumbs} />
                <div className="container-fluid mt-3">
                    <div className="row">
                        {isLoading ? (
                            <Loading />
                        ) : error ? (
                            <p>Error loading page content.</p>
                        ) : (
                            <>
                                {data?.data.map(trans => (
                                    <Link
                                        href={`/${locale}/transportation/${trans.id}`}
                                        style={{ textDecoration: 'none' }}
                                        className="col-md-3 mb-3"
                                        key={trans.id}
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
                                                    src={trans.banner || '/hotel-details/1.jpeg'}
                                                    alt={trans.name}
                                                    fill
                                                    style={{
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                            </div>

                                            <div className="card-body">
                                                <h5 className={style.cardTitle}>
                                                    {' '}
                                                    Name : {trans.name || 'null'}
                                                </h5>
                                                <div className={style.cardBody}>
                                                    {/* <p className="m-0">{trans.phone || 'null'}</p> */}
                                                    {/* <p className="m-0">{trans.email || 'null'}</p> */}
                                                    <p className="m-0">
                                                        Provider Type :{' '}
                                                        {trans.provider_type || 'null'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <ContactUs />
            <Newsletter />
        </div>
    );
};

export default Transportation;
