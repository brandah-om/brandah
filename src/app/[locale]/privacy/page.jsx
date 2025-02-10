'use client';
import React from 'react';
import style from './privacy.module.css';
import NavBar from '@/components/navBar/NavBar';
import HeroSection from '@/components/heroSection/HeroSection';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useGetPrivacyPageQuery } from '@/store/pages/PrivacyPageSlice';
import Loading from '@/components/Loading/Loading';
import { useLocale } from 'next-intl';

const page = () => {
    const breadcrumbs = [{ label: 'Home', href: '/' }, { label: ' Privacy Policy' }];

    const { data: PrivacyPage, isLoading, error } = useGetPrivacyPageQuery();
    const locale = useLocale();

    return (
        <>
            <NavBar />
            <div className={`${style.privacy}`}>
                {isLoading ? (
                    <Loading />
                ) : error || !PrivacyPage ? (
                    <p>Error loading page content.</p>
                ) : (
                    <>
                        <div
                            style={{
                                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.288), rgba(0, 0, 0, 0.274)), 
                    url(${PrivacyPage?.banner || '/hero-section.jpeg'})`,
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
                                title={PrivacyPage?.name || 'Privacy'}
                                description={
                                    PrivacyPage?.heading ||
                                    'Dream, Explore, Discover Your Travel Begins Here'
                                }
                            />
                        </div>
                        <div className={style.box}>
                            <DynamicBreadcrumbs items={breadcrumbs} />
                            <div
                                className={style.caption}
                                dangerouslySetInnerHTML={{ __html: PrivacyPage?.content?.[locale] || '' }}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default page;
