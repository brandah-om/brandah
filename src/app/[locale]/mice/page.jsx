'use client';
import React from 'react';
import NavBar from '@/components/navBar/NavBar';
import HeroSection from '@/components/heroSection/HeroSection';
import style from './mice.module.css';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useGetMicePageQuery } from '@/store/pages/MicePageSlice';
import Loading from '@/components/Loading/Loading';
import { useLocale, useTranslations } from 'next-intl';

const Page = () => {
    const t = useTranslations('HomePage');
    const locale = useLocale();
    const breadcrumbs = [{ label: t('Home'), href: '/' }, { label: t('MICE') }];

    const { data: micePage, isLoading, error } = useGetMicePageQuery(locale);

    return (
        <>
            <NavBar />
            <div className={`${style.mice}`}>
                {isLoading ? (
                    <Loading />
                ) : error || !micePage ? (
                    <p>{t('Error loading Data')}</p>
                ) : (
                    <>
                        <div
                            style={{
                                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.288), rgba(0, 0, 0, 0.274)), 
                    url(${micePage?.banner || '/hero-section.jpeg'})`,
                                height: '500px',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <HeroSection
                                title={micePage?.heading || 'MICE'}
                                description={t('Dream, Explore, Discover Your Travel Begins Here')}
                            />
                        </div>

                        <div className="container my-4">
                            <div className="row">
                                <DynamicBreadcrumbs items={breadcrumbs} />
                                {/* <div
                                    className={style.caption}
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            micePage?.content?.[locale] ||
                                            micePage.content?.['en'] ||
                                            '',
                                    }}
                                /> */}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Page;
