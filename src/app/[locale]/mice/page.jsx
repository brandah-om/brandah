'use client';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
    const breadcrumbs = [{ label: t('Home'), href: `/${locale}/` }, { label: t('MICE') }];
    const { data: micePage, isLoading, error } = useGetMicePageQuery(locale);

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

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
                            data-aos="fade-down"
                        >
                            <HeroSection
                                title={micePage?.heading || 'MICE'}
                                description={t('Dream, Explore, Discover Your Travel Begins Here')}
                            />
                        </div>

                        <div className="container my-4" data-aos="fade-up">
                            {' '}
                            <div className="row">
                                <DynamicBreadcrumbs items={breadcrumbs} />
                            </div>
                            <div
                                className={style.caption}
                                dangerouslySetInnerHTML={{
                                    __html:
                                        micePage?.content?.[locale] ||
                                        micePage.content?.['en'] ||
                                        micePage.content ||
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

export default Page;
