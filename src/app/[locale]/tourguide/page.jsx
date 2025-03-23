'use client';
import NavBar from '@/components/navBar/NavBar';
import React, { useEffect, useState } from 'react';
import style from './tourguide.module.css';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useGetTourGuideQuery } from '@/store/tourGuide/AllTourGuideApiSlice';
import Loading from '@/components/Loading/Loading';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import Aos from 'aos';

const page = () => {
    const t = useTranslations('HomePage');
    const locale = useLocale();
    const [visibleGuides, setVisibleGuides] = useState(4);

    const breadcrumbs = [{ label: t('Home'), href: `/${locale}/` }, { label: t('Tour Guides') }];
    const { data, error, isLoading } = useGetTourGuideQuery(locale);

    useEffect(() => {
        Aos.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    const handleSeeMore = () => {
        setVisibleGuides(prev => prev + 4);
    };

    return (
        <div>
            <NavBar />
            <div className={style.tourGuide}>
                <div className={style.DynamicBreadcrumbs}>
                    <DynamicBreadcrumbs items={breadcrumbs} />
                </div>
                <div className={style.box}>
                    <div className="container-fluid">
                        <div className="row">
                            {isLoading ? (
                                <Loading />
                            ) : error ? (
                                <p>{t('Error loading Data')}</p>
                            ) : (
                                <>
                                    {data?.data.length === 0 ? (
                                        <p className="text-center mt-3">{t('No Data Available')}</p>
                                    ) : (
                                        data?.data.slice(0, visibleGuides).map(guide => (
                                            <div
                                                data-aos="fade-up"
                                                key={guide.id}
                                                className="position-relative col-md-3 mb-3"
                                            >
                                                <Link
                                                    href={`/${locale}/tourguide/${guide.id}`}
                                                    style={{ textDecoration: 'none' }}
                                                    className="col-md-3 mb-3"
                                                >
                                                    <div>
                                                        <div
                                                            className={`${style.cardSection} card`}
                                                        >
                                                            <img
                                                                className={style.swiperSlideImage}
                                                                src={
                                                                    guide.image ||
                                                                    '/homepage/tour-guide/1.jpeg'
                                                                }
                                                                alt="tourGuide"
                                                            />
                                                            <div className="card-body">
                                                                <h5
                                                                    className={`${style.cardTitle}`}
                                                                >
                                                                    {guide.name}
                                                                </h5>
                                                                <div className={style.cardRate}>
                                                                    <div className="ml-2">
                                                                        <img
                                                                            src="/homepage/tour-guide/star.png"
                                                                            alt="star"
                                                                        />
                                                                    </div>
                                                                    <p className="m-0">
                                                                        {guide.rate || 'null'}
                                                                    </p>
                                                                </div>

                                                                <div className={style.location}>
                                                                    <div>
                                                                        <img
                                                                            src="/homepage/tour-guide/location.png"
                                                                            alt="location"
                                                                        />
                                                                    </div>
                                                                    <p className="m-0">
                                                                        {guide.city} ,{' '}
                                                                        {guide.country}
                                                                    </p>
                                                                </div>

                                                                <div className={style.location}>
                                                                    <div>
                                                                        <img
                                                                            src="/homepage/tour-guide/lang.png"
                                                                            alt="lang"
                                                                        />
                                                                    </div>
                                                                    <p className={style.language}>
                                                                        {guide.languages
                                                                            .map(lang => lang.name)
                                                                            .join(', ')}
                                                                    </p>
                                                                </div>
                                                                <div className={style.cardPrice}>
                                                                    <p>$ {guide.price}</p>
                                                                    <div>
                                                                        {t('for')} {guide.days}{' '}
                                                                        {t(
                                                                            'days including accomodation'
                                                                        )}
                                                                    </div>
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
                                            <button
                                                onClick={handleSeeMore}
                                                className={style.btnMore}
                                            >
                                                {t('See More')}
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
