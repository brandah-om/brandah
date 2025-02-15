'use client';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import style from './parnershipTerms.module.css';
import NavBar from '@/components/navBar/NavBar';
import HeroSection from '@/components/heroSection/HeroSection';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useTranslations } from 'next-intl';

const PartnershipTerms = () => {
    const t = useTranslations('HomePage');
    const breadcrumbs = [{ label: t('Home'), href: '/' }, { label: t('Partnership terms') }];

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
            <div className={`${style.parnershipTerms}`}>
                <HeroSection
                    imageSrc="/white-logo.png"
                    title={t('Partnership terms')}
                    description={t('Dream, Explore, Discover Your Travel Begins Here')}
                    data-aos="fade-down"
                />
                <div className={style.box} data-aos="fade-up">
                    {' '}
                    <DynamicBreadcrumbs items={breadcrumbs} />
                    {[...Array(4)].map((_, i) => (
                        <p
                            key={i}
                            className={style.caption}
                            data-aos="fade-up"
                            data-aos-delay={i * 200}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                        </p>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PartnershipTerms;
