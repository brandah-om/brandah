import React from 'react';
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

const inter = Inter({
    subsets: ['latin'],
    weight: ['400'],
});

const parnershipTerms = () => {
    const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'FAQ' }];
    const accordionItems = [
        {
            question: 'Thinking about booking a trip?',
            answer: 'Thinking about booking a trip?',
        },
        {
            question: 'How do I make changes to my booking?',
            answer: 'How do I make changes to my booking?',
        },
        {
            question: 'How do I cancel or transfer my booking?',
            answer: 'How do I cancel or transfer my booking?',
        },
        {
            question: 'How do I pay my balance?',
            answer: 'How do I pay my balance?',
        },
        {
            question: "About my 'land only' booking",
            answer: "About my 'land only' booking",
        },
        {
            question: 'How to book flights to join our tours',
            answer: 'How to book flights to join our tours',
        },
    ];
    return (
        <>
            <NavBar />
            <div className={`${style.faq}`}>
                <HeroSection
                    imageSrc="/white-logo.png"
                    title="FAQ"
                    description="Dream, Explore, Discover Your Travel Begins Here "
                />
                <div className={style.box}>
                    <DynamicBreadcrumbs items={breadcrumbs} />
                    <div className="pt-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className={`${style.questionsTitle} col-md-8`}>
                                    <h4 className={inter.className}>Common booking questions</h4>
                                    <h6 className={`${merriweather.className} mb-4 mt-3`}>
                                        If you’re looking at our website from outside the UK and
                                        would like to book through an agent in your country, please
                                        take a look at our list of
                                        <Link href="/">approved agents by country</Link>
                                    </h6>

                                    {/* <hr /> */}
                                    {accordionItems.map((item, index) => (
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
                                                    className={`${style.accordionQusetion} ${merriweather.className}`}
                                                >
                                                    {item.question}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>{item.answer}</Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default parnershipTerms;
