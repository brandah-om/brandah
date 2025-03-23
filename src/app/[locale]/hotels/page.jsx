'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/navBar/NavBar';
import Link from 'next/link';
import style from './hotels.module.css';
import Filter from '@/components/filter/Filter';
import { useGetHotelsQuery } from '@/store/hotels/hotelsApiSlice';
import Loading from '@/components/Loading/Loading';
import { useLocale, useTranslations } from 'next-intl';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import Aos from 'aos';
import { Vujahday_Script } from 'next/font/google';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const Hotels = () => {
    const locale = useLocale();
    const [visibleGuides, setVisibleGuides] = useState(4);
    const { data, error, isLoading } = useGetHotelsQuery(locale);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const t = useTranslations('HomePage');
    const breadcrumbs = [{ label: t('Home'), href: `/${locale}/` }, { label: t('Hotels') }];

    useEffect(() => {
        Aos.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
    };

    const handleSeeMore = () => {
        setVisibleGuides(prev => prev + 4);
    };

    return (
        <div>
            <NavBar />
            <div className={style.hotelsPage}>
                <DynamicBreadcrumbs items={breadcrumbs} />
                <div className="text-center mt-3">
                    <motion.h2 className={style.destinationMailTitle} {...fadeInUp}>
                        {t('Hotels')}
                    </motion.h2>
                    <motion.h6
                        className={`${vujahday.className} ${style.destinationTitle}`}
                        {...fadeInUp}
                    >
                        {t('Discover your happy place')}
                    </motion.h6>
                    <motion.p className={style.destinationCaption} {...fadeInUp}>
                        {t('Explore top Hotels voted by more than +100,000 customers')}
                    </motion.p>
                </div>

                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <p>{t('Error loading Data')}</p>
                ) : (
                    <>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.3,
                                ease: 'easeOut',
                            }}
                            viewport={{ once: true }}
                            className="mt-4 d-flex justify-content-between align-items-center"
                        >
                            {/* <form className="d-flex justify-content-start">
                                <input
                                    type="text"
                                    className={style.subscribeInput}
                                    placeholder={t('Type here')}
                                />
                                <button className={style.subscribeBtn}>{t('Subscribe')}</button>
                            </form> */}
                            <Filter
                                open={open}
                                handleClickOpen={handleClickOpen}
                                handleClose={handleClose}
                            />
                        </motion.div>

                        <div className="container-fluid mt-4">
                            <div className="row">
                                {data.data.length === 0 ? (
                                    <p className="text-center">{t('No Data Available')}</p>
                                ) : (
                                    data.data.map((hotel, index) => (
                                        <div key={hotel.id} className="col-md-3 mb-3">
                                            <Link
                                                href={`/${locale}/hotels/${hotel.id}`}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <div
                                                    className={`${style.cardSection} card`}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <img
                                                        data-aos="fade-up"
                                                        className={style.cardSectionImg}
                                                        src={hotel.image}
                                                        alt={hotel.name}
                                                    />
                                                    <div className="card-body">
                                                        <h5
                                                            data-aos="fade-up"
                                                            className={`${style.cardTitle}`}
                                                        >
                                                            {hotel.name || 'No Name'}
                                                        </h5>
                                                        <p
                                                            data-aos="fade-up"
                                                            className={`${style.cardBody}`}
                                                            dangerouslySetInnerHTML={{
                                                                __html: hotel.description || '',
                                                            }}
                                                        />
                                                        <div
                                                            data-aos="fade-up"
                                                            className={style.cardRate}
                                                        >
                                                            <div className="ml-2">
                                                                <img
                                                                    src="/homepage/hotels/star.png"
                                                                    alt="star"
                                                                />
                                                            </div>
                                                            <p className="m-0">
                                                                {hotel.rating || 'no rate'}
                                                            </p>
                                                        </div>
                                                        <div
                                                            data-aos="fade-up"
                                                            className={style.cardPrice}
                                                        >
                                                            <p>
                                                                {hotel.price || 'No price'}{' '}
                                                                {hotel.currency}
                                                            </p>
                                                            <div>
                                                                {hotel.days}{' '}
                                                                {t('nights accomodation')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                )}

                                {data?.data.length > visibleGuides && (
                                    <div className="col-12 text-center mt-3">
                                        <button onClick={handleSeeMore} className={style.btnMore}>
                                            {t('See More')}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Hotels;
