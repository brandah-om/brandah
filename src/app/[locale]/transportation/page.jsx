'use client';
import React, { useEffect } from 'react';
import style from './transportation.module.css';
import NavBar from '@/components/navBar/NavBar';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useGetTransportationQuery } from '@/store/Transportation/AllTransportationSlice';
import Link from 'next/link';
import Loading from '@/components/Loading/Loading';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import ContactUs from '../home/component/contactUs/ContactUs';
import Newsletter from '../home/component/newsletter/Newsletter';
import Aos from 'aos';
import { motion } from 'framer-motion';
import { Vujahday_Script } from 'next/font/google';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const Transportation = () => {
    const locale = useLocale();
    const t = useTranslations('HomePage');
    const breadcrumbs = [{ label: t('Home'), href: `/${locale}/` }, { label: t('Transportation') }];
    const { data, isLoading, error } = useGetTransportationQuery(locale);

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
            <div className={style.transportation}>
                <DynamicBreadcrumbs items={breadcrumbs} />
                <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-md-12 text-center mb-3">
                            <motion.h2 className={style.destinationMailTitle} {...fadeInUp}>
                                {t('Transportation')}
                            </motion.h2>
                            <motion.h6
                                className={`${vujahday.className} ${style.destinationTitle}`}
                                {...fadeInUp}
                            >
                                {t('Discover your happy place')}
                            </motion.h6>
                            <motion.p className={style.destinationCaption} {...fadeInUp}>
                                {t(
                                    'Explore top Transportations voted by more than +100,000 customers'
                                )}
                            </motion.p>
                        </div>

                        {isLoading ? (
                            <Loading />
                        ) : error ? (
                            <p>{t('Error loading Data')}</p>
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
                                                    src={trans.image || '/hotel-details/1.jpeg'}
                                                    alt={trans.name}
                                                    fill
                                                    style={{
                                                        objectFit: 'cover',
                                                    }}
                                                    data-aos="fade-up"
                                                />
                                            </div>

                                            <div className="card-body">
                                                <h5 data-aos="fade-up" className={style.cardTitle}>
                                                    {' '}
                                                    {t('Name')} : {trans.name || ''}
                                                </h5>
                                                <div data-aos="fade-up" className={style.cardBody}>
                                                    <p className="m-0">
                                                        {t('Provider Type')} :{' '}
                                                        {trans.provider_type || ''}
                                                    </p>
                                                    <p className="m-0">
                                                        {trans.city || ''}
                                                    </p>
                                                    <p className="m-0">
                                                        {trans.country || ''}
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
        </div>
    );
};

export default Transportation;
