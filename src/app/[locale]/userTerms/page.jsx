'use client';
import React, { useEffect } from 'react';
import style from './terms.module.css';
import NavBar from '@/components/navBar/NavBar';
import HeroSection from '@/components/heroSection/HeroSection';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import Loading from '@/components/Loading/Loading';
import { useGetTermsPageQuery } from '@/store/pages/TermsPageSlice';
import { useLocale, useTranslations } from 'next-intl';
import Aos from 'aos';

const userTerms = () => {
    const locale = useLocale();
    const t = useTranslations('HomePage');
    const breadcrumbs = [{ label: t('Home'), href: `/${locale}/` }, { label: t('Terms of usage') }];
    const { data: TermsPage, isLoading, error } = useGetTermsPageQuery(locale);

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
            <div className={`${style.userTerms}`}>
                {isLoading ? (
                    <Loading />
                ) : error || !TermsPage ? (
                    <p>{t('Error loading Data')}</p>
                ) : (
                    <>
                        <div
                            style={{
                                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.288), rgba(0, 0, 0, 0.274)), 
                    url(${TermsPage?.banner || '/hero-section.jpeg'})`,
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
                                title={TermsPage?.heading || 'Terms'}
                                description={t("Dream, Explore, Discover Your Travel Begins Here")}
                            />
                        </div>
                        <div className={style.box}>
                            <DynamicBreadcrumbs items={breadcrumbs} />
                            <div
                                data-aos="fade-up"
                                className={style.caption}
                                dangerouslySetInnerHTML={{
                                    __html:
                                        TermsPage?.content?.[locale] ||
                                        TermsPage.content?.['en'] ||
                                        TermsPage.content ||
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

export default userTerms;
