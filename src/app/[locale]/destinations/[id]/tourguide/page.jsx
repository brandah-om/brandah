'use client';
import NavBar from '@/components/navBar/NavBar';
import React, { useEffect } from 'react';
import style from './details.module.css';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import Loading from '@/components/Loading/Loading';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import Aos from 'aos';
import { useGetGuideStatesBtIdQuery } from '@/store/tourGuide/GuideByDestinationSlice';
import ContactUs from '@/app/[locale]/home/component/contactUs/ContactUs';
import Newsletter from '@/app/[locale]/home/component/newsletter/Newsletter';

const page = ({ params }) => {
    const locale = useLocale();
    const { id } = params || {};

    const { data, error, isLoading } = useGetGuideStatesBtIdQuery({ id, lang: locale });

    const t = useTranslations('HomePage');
    const breadcrumbs = [{ label: t('Home'), href: `/${locale}/` }, { label: t('Tour Guides') }];

    const guides = data?.data || [];

    useEffect(() => {
        Aos.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    return (
        <div>
            <NavBar />
            <div className={style.tourGuide}>
                <DynamicBreadcrumbs items={breadcrumbs} />

                <div className="container-fluid mt-4">
                    <div className="row">
                        {isLoading ? (
                            <Loading />
                        ) : error ? (
                            <p>{t('Error loading Data')}</p>
                        ) : (
                            <>
                                <h2 className="mb-4">
                                    {t('Tour Guides in')}{' '}
                                    {guides.length > 0 ? guides[0]?.state : 'Unknown'}
                                </h2>
                                {guides.map(guide => (
                                    <Link
                                        key={guide.id}
                                        href={`/${locale}/tourguide/${guide.id}`}
                                        style={{ textDecoration: 'none' }}
                                        className="col-md-3 mb-3 position-relative"
                                    >
                                        <div>
                                            <div className={`${style.cardSection} card`}>
                                                <img
                                                    className={style.swiperSlideImage}
                                                    src={
                                                        guide.image || '/homepage/tour-guide/1.jpeg'
                                                    }
                                                    alt="tourGuide"
                                                />
                                                <div className="card-body">
                                                    <h5 className={`${style.cardTitle}`}>
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
                                                            {guide.city} , {guide.country}
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
                                                            {t('days including accomodation')}
                                                        </div>
                                                    </div>
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
            {/* <ContactUs /> */}
            {/* <Newsletter /> */}
        </div>
    );
};

export default page;
