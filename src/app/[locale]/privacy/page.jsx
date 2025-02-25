'use client';
import React, { useEffect } from 'react';
import style from './privacy.module.css';
import NavBar from '@/components/navBar/NavBar';
import HeroSection from '@/components/heroSection/HeroSection';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useGetPrivacyPageQuery } from '@/store/pages/PrivacyPageSlice';
import Loading from '@/components/Loading/Loading';
import { useLocale, useTranslations } from 'next-intl';
import Aos from 'aos';

const page = () => {
    const t = useTranslations('HomePage');
    const locale = useLocale();

    const breadcrumbs = [{ label: t('Home'), href: `/${locale}/` }, { label: t('Privacy Policy') }];

    const { data: PrivacyPage, isLoading, error } = useGetPrivacyPageQuery(locale);

    useEffect(() => {
        Aos.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    return (
        <>
            <NavBar />
            <div className={`${style.privacy}`}>
                {isLoading ? (
                    <Loading />
                ) : error || !PrivacyPage ? (
                    <p>{t('Error loading Data')}</p>
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
                            data-aos="fade-up"
                        >
                            <HeroSection
                                title={PrivacyPage?.heading || 'Privacy'}
                                description={
                                    // PrivacyPage?.heading ||
                                    t('Dream, Explore, Discover Your Travel Begins Here')
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
                                        PrivacyPage?.content?.[locale] ||
                                        PrivacyPage.content?.['en'] ||
                                        PrivacyPage.content ||
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

export default page;
