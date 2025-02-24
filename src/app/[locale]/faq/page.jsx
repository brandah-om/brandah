'use client';
import React, { useEffect } from 'react';
import style from './faq.module.css';
import NavBar from '@/components/navBar/NavBar';
import HeroSection from '@/components/heroSection/HeroSection';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Merriweather } from 'next/font/google';

const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['400'],
});
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useGetFaqPageQuery } from '@/store/pages/FaqPageSlice';
import Loading from '@/components/Loading/Loading';
import { useLocale, useTranslations } from 'next-intl';
import Aos from 'aos';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400'],
});

const parnershipTerms = () => {
    const t = useTranslations('HomePage');
    const locale = useLocale();
    const breadcrumbs = [{ label: t('Home'), href: `/${locale}/` }, { label: t('FAQs') }];
    const { data: FaqPage, isLoading, error } = useGetFaqPageQuery(locale);
    useEffect(() => {
        Aos.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);
    return (
        <>
            <NavBar />
            <div className={`${style.faq} mb-5`}>
                {isLoading ? (
                    <Loading />
                ) : error || !FaqPage ? (
                    <p>{t('Error loading Data')}</p>
                ) : (
                    <>
                        <div
                            style={{
                                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.288), rgba(0, 0, 0, 0.274)), 
                        url(${FaqPage?.banner || '/hero-section.jpeg'})`,
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
                                title={FaqPage?.name || 'Faq'}
                                description={
                                    FaqPage?.heading ||
                                    'Dream, Explore, Discover Your Travel Begins Here'
                                }
                            />
                        </div>
                        <div className={style.box}>
                            <DynamicBreadcrumbs items={breadcrumbs} />
                            <div className="pt-3">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className={`${style.questionsTitle} col-md-8`}>
                                            <h4 data-aos="fade-up" className={inter.className}>
                                                {t('Common booking questions')}
                                            </h4>
                                            <h6
                                                data-aos="fade-up"
                                                className={`${merriweather.className} mb-4 mt-3`}
                                            >
                                                {t(
                                                    'If you’re looking at our website from outside the UK and would like to book through an agent in your country, please take a look at our list of'
                                                )}
                                                <Link href="/">
                                                    {t('approved agents by country')}
                                                </Link>
                                            </h6>
                                            {FaqPage.list_items.map((item, index) => (
                                                <Accordion key={index}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls={`panel${index}-content`}
                                                        id={`panel${index}-header`}
                                                        sx={{
                                                            height: '60px',
                                                            minHeight: '60px !important',
                                                            padding: '0 16px',
                                                        }}
                                                    >
                                                        <Typography
                                                            data-aos="fade-up"
                                                            className={`${style.accordionQusetion} ${merriweather.className}`}
                                                        >
                                                            {item.title}
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography
                                                            dangerouslySetInnerHTML={{
                                                                __html: item.description || '',
                                                            }}
                                                        ></Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default parnershipTerms;
