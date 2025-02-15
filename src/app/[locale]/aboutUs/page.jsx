'use client';
import React, { useEffect } from 'react';
import style from './aboutUs.module.css';
import NavBar from '@/components/navBar/NavBar';
import HeroSection from '@/components/heroSection/HeroSection';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useGetAboutPageQuery } from '@/store/pages/AboutPageSlice';
import Loading from '@/components/Loading/Loading';
import { useLocale, useTranslations } from 'next-intl';
import Aos from 'aos';

const AboutUs = () => {
    const t = useTranslations('About');

    const locale = useLocale();
    const breadcrumbs = [{ label: t('Home'), href: '/' }, { label: t('About Us') }];

    const { data: aboutPage, isLoading, error } = useGetAboutPageQuery(locale);
    useEffect(() => {
        Aos.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);
    return (
        <>
            <NavBar />
            <div className={`${style.aboutUs}`}>
                {isLoading ? (
                    <Loading />
                ) : error || !aboutPage ? (
                    <p>{t('Error loading Data')}</p>
                ) : (
                    <>
                        <div
                            style={{
                                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.288), rgba(0, 0, 0, 0.274)), 
                    url(${aboutPage?.banner || '/hero-section.jpeg'})`,
                                height: '500px',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            data-aos="fade-up"
                        >
                            <HeroSection
                                title={aboutPage?.name || 'about Page'}
                                description={
                                    aboutPage?.heading ||
                                    'Dream, Explore, Discover Your Travel Begins Here'
                                }
                            />
                        </div>

                        <div className={style.box}>
                            <DynamicBreadcrumbs items={breadcrumbs} />
                            <div
                                data-aos="fade-up"
                                className={style.caption}
                                dangerouslySetInnerHTML={{
                                    __html:
                                        aboutPage.content?.[locale] ||
                                        aboutPage.content?.['en'] ||
                                        '',
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default AboutUs;
