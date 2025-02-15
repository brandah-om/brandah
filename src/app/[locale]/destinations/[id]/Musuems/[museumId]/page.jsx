'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Loading from '@/components/Loading/Loading';
import { useGetSiteDetailQuery } from '@/store/States/siteDetailApi';
import NavBar from '@/components/navBar/NavBar';
import HeroSection from '@/components/heroSection/HeroSection';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useLocale, useTranslations } from 'next-intl';
import style from './museumDetails.module.css';
import { useGetStatesBtIdQuery } from '@/store/States/StateDetailsSlice'; // مثال
import ContactUs from '@/app/[locale]/home/component/contactUs/ContactUs';
import Newsletter from '@/app/[locale]/home/component/newsletter/Newsletter';

export default function MuseumDetailPage() {
    const { id, museumId } = useParams();
    const t = useTranslations('HomePage');
    const locale = useLocale();

    const {
        data: cityData,
        isLoading: cityLoading,
        error: cityError,
    } = useGetStatesBtIdQuery({ id, lang: locale });

    const {
        data: museumData,
        isLoading: museumLoading,
        error: museumError,
    } = useGetSiteDetailQuery({ museumId, lang: locale });

    const cityName = cityData?.state_details?.name || 'City';
    const museumName = museumData?.data?.name || 'Museum';

    const breadcrumbs = [
        { label: t('Home'), href: '/' },
        { label: t('Destinations'), href: `${locale}/destinations` },
        { label: cityName, href: `${locale}/destinations/${id}` },
        { label: museumName },
    ];

    return (
        <>
            <NavBar />
            <div className={style.details}>
                {museumLoading ? (
                    <Loading />
                ) : museumError ? (
                    <p>{t('Error loading Data')}</p>
                ) : (
                    <>
                        <div className="container-fluid">
                            <div className="row">
                                <div
                                    className={style.heroSection}
                                    style={{
                                        backgroundImage: `linear-gradient(
                                        to right,
                                        rgba(0, 0, 0, 0.288),
                                        rgba(0, 0, 0, 0.274)
                                      ), url(${museumData?.data?.banner || '/hero-section.jpeg'})`,
                                    }}
                                >
                                    <HeroSection title={museumName || 'site Page'} />
                                </div>
                                <div className={style.box}>
                                    <DynamicBreadcrumbs items={breadcrumbs} />
                                </div>
                                <div className={style.caption}>
                                    <h2 className={style.title}>{museumName}</h2>
                                    <div
                                        className={style.desc}
                                        dangerouslySetInnerHTML={{
                                            __html: museumData?.data?.description,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <ContactUs />
            <Newsletter />
        </>
    );
}
