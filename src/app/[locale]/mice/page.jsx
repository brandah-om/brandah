'use client';
import React from 'react';
import NavBar from '@/components/navBar/NavBar';
import HeroSection from '@/components/heroSection/HeroSection';
import style from './mice.module.css';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useGetMicePageQuery } from '@/store/pages/MicePageSlice';
import Loading from '@/components/Loading/Loading';
import { useLocale } from 'next-intl';

const Page = () => {
    const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'MICE' }];

    const { data: micePage, isLoading, error } = useGetMicePageQuery();
    const locale = useLocale();

    return (
        <>
            <NavBar />
            <div className={`${style.mice}`}>
                {isLoading ? (
                    <Loading />
                ) : error || !micePage ? (
                    <p>Error loading page content.</p>
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
                                description="Dream, Explore, Discover Your Travel Begins Here"
                            />
                        </div>

                        <div className={style.box}>
                            <DynamicBreadcrumbs items={breadcrumbs} />
                            <div
                                className={style.caption}
                                dangerouslySetInnerHTML={{
                                    __html: micePage?.content?.[locale] || '',
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Page;
