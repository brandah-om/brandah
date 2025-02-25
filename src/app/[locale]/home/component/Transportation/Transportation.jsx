'use client';
import React, { useEffect, useState } from 'react';
import style from './transportation.module.css';
import NavBar from '@/components/navBar/NavBar';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useGetTransportationQuery } from '@/store/Transportation/AllTransportationSlice';
import Link from 'next/link';
import Loading from '@/components/Loading/Loading';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Aos from 'aos';
import { motion } from 'framer-motion';
import { Vujahday_Script } from 'next/font/google';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const Transportation = () => {
    const locale = useLocale();
    const t = useTranslations('HomePage');
    const { data, isLoading, error } = useGetTransportationQuery(locale);

    useEffect(() => {
        Aos.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
    };

    const [isSubscribed, setIsSubscribed] = useState(null);
    const [token, setToken] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const userToken = Cookies.get('token') || null;
        const subscriptionStatus = Cookies.get('is_subscribed') === 'true';

        setToken(userToken);
        setIsSubscribed(subscriptionStatus);
    }, []);

    const handleNavigation = path => {
        if (!token) {
            toast.error(t('You must be logged in to access this page'), {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
            });

            setTimeout(() => {
                router.push(`/${locale}/login`);
            }, 3000);

            return;
        }

        if (!isSubscribed) {
            toast.error(t('You must be subscribed to access this page'), {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
            });

            setTimeout(() => {
                router.push(`/${locale}/subscribe`);
            }, 3000);

            return;
        }

        router.push(path);
    };

    return (
        <div>
            <NavBar />
            <div className={style.transportation}>
                <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-md-12 text-center mb-3">
                            <motion.h6
                                className={`${vujahday.className} ${style.destinationTitle}`}
                                {...fadeInUp}
                            >
                                {t('Discover your happy place')}
                            </motion.h6>
                            <motion.h2 className={style.destinationMailTitle} {...fadeInUp}>
                                {t('Transportation')}
                            </motion.h2>
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
                                {data?.data.slice(0, 5).map(trans => (
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
                                                    data-aos="fade-up"
                                                />
                                            </div>

                                            <div className="card-body">
                                                <h5 data-aos="fade-up" className={style.cardTitle}>
                                                    {' '}
                                                    {t('Name')} : {trans.name || 'null'}
                                                </h5>
                                                <div data-aos="fade-up" className={style.cardBody}>
                                                    <p className="m-0">
                                                        {t('Provider Type')} :{' '}
                                                        {trans.provider_type || 'null'}
                                                    </p>
                                                    <p className="m-0">
                                                        {trans.city || 'null-city'}
                                                    </p>
                                                    <p className="m-0">
                                                        {trans.country || 'null-country'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </>
                        )}

                        <motion.div
                            className={`${style.cardBtn} col-md-12`}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link
                                href={`/${locale}/transportation`}
                                onClick={e => {
                                    e.preventDefault();
                                    handleNavigation(`/${locale}/transportation`);
                                }}
                            >
                                <span>{t('View More Transportation')}</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transportation;
