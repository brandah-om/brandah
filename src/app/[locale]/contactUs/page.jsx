import NavBar from '@/components/navBar/NavBar';
import React from 'react';
import style from './contactUs.module.css';
import Link from 'next/link';
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
import { useLocale, useTranslations } from 'next-intl';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400'],
});

const ContactUs = () => {
    const locale = useLocale();
    const t = useTranslations('HomePage');
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
        <div>
            <NavBar />
            <div className={style.contactUs}>
                <div className="container mb-5">
                    <div className="row">
                        <div className="col-md-6 col-lg-8">
                            <div className={style.helpYou}>
                                <p>
                                    {' '}
                                    {t(
                                        'We want to make sure that we can help you to find the perfect adventure holiday If you have any questions about anything, please get in touch with one of our experts using our Contact Form or by simply calling us You can also find the answer to our most commonly asked questions'
                                    )}
                                    <Link className="mx-1" href="/">
                                        {t('here')}
                                    </Link>
                                </p>
                            </div>

                            <form className={`${style.contactForm} p-lg-5 p-3 mt-4 mb-3`}>
                                <div className="row">
                                    <div className="col-md-6 mt-3 d-flex flex-column">
                                        <label
                                            className={`${style.label} ${merriweather.className}`}
                                        >
                                            {t('First Name')}{' '}
                                            <span style={{ color: '#C64E4E;' }}>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </div>
                                    <div className="col-md-6 mt-3 d-flex flex-column">
                                        <label
                                            className={`${style.label} ${merriweather.className}`}
                                        >
                                            {t('Last Name')}{' '}
                                            <span style={{ color: '#C64E4E;' }}>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mt-3 d-flex flex-column">
                                        <label
                                            className={`${style.label} ${merriweather.className}`}
                                        >
                                            {t('Email')}{' '}
                                            <span style={{ color: '#C64E4E;' }}>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </div>
                                    <div className="col-md-6 mt-3 d-flex flex-column">
                                        <label
                                            className={`${style.label} ${merriweather.className}`}
                                        >
                                            {t('Phone Number')}
                                            <span style={{ color: '#C64E4E;' }}>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 mt-3 d-flex flex-column">
                                        <label
                                            className={`${style.label} ${merriweather.className}`}
                                        >
                                            {t(
                                                'Country of residence (so we can assign the correct team)'
                                            )}
                                            <span style={{ color: '#C64E4E;' }}>*</span>
                                        </label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            style={{ color: '#5B6A6A' }}
                                        >
                                            <option selected>{t('Choose Country')}</option>
                                            <option value="">United States</option>
                                            <option value="">egypt</option>
                                            <option value="">palstine</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 mt-3 d-flex flex-column">
                                        <label
                                            className={`${style.label} ${merriweather.className}`}
                                        >
                                            {t('Type of Enquiry')}
                                            <span style={{ color: '#C64E4E;' }}>*</span>
                                        </label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            style={{ color: '#5B6A6A' }}
                                        >
                                            <option selected>{t('Please Select')}</option>
                                            <option value="">1</option>
                                            <option value="">2</option>
                                            <option value="">3</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 mt-3 d-flex flex-column">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="flexCheckDefault"
                                            />
                                            <label
                                                className={`${style.label} ${merriweather.className}`}
                                                for="flexCheckDefault"
                                            >
                                                {t(
                                                    'Keep me up to date with news and offers from Brandah through Digital Marketing'
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 mt-3 d-flex flex-column">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="flexCheckDefault"
                                            />
                                            <label
                                                className={`${style.label} ${merriweather.className}`}
                                                for="flexCheckDefault"
                                            >
                                                {t(
                                                    'I would like to receive information from Brandah by SMS'
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 mt-3 d-flex flex-column">
                                        <p
                                            className={`${style.fullDetails} ${merriweather.className}`}
                                        >
                                            {' '}
                                            {t(
                                                'For full details regarding your data including digital marketing please read our'
                                            )}{' '}
                                            <Link href={`/${locale}/privacy`}>
                                                {t('Privacy Policy')} {t('here')}
                                            </Link>{' '}
                                            {t(
                                                'You can withdraw your consent anytime by either clicking unsubscribe or by contacting us'
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    className={`${style.formBtn} ${merriweather.className} mt-lg-5 mt-1`}
                                    type="submit"
                                >
                                    {t('SUBMIT')}
                                </button>
                            </form>
                        </div>
                        <div className="col-lg-1"></div>
                        <div className="col-md-6 col-lg-3">
                            <div className="border p-4">
                                <h4>{t('Bookings')}</h4>
                                <p className="my-1">{t('Call us on')}:</p>
                                <p className="my-1">+1 (XXX) XXX-XXXX</p>
                                <p className="my-1">{t('Email us at')}:</p>
                                <p className="my-1" style={{ color: '#B18D61' }}>
                                    Info@brandahtravel.example
                                </p>
                                <p>Tue: 9:00am – 8:00pm EST</p>
                                <p>Wed: 9:00am – 8:00pm  EST</p>
                                <p>Thu: 9:00am – 8:00pm EST00pm EST</p>
                                <p>Fri:  9:00am – 8:00pm EST</p>
                                <p>Sat: 10:00am – 7:00pm EST</p>
                                <p>Sun: Closed</p>
                            </div>
                        </div>

                        <div className="pt-3">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className={`${style.questionsTitle} col-md-8`}>
                                        <h4 className={inter.className}>
                                            {t('Common booking questions')}
                                        </h4>
                                        <h6 className={`${merriweather.className} mb-4 mt-3`}>
                                            {' '}
                                            {t(
                                                'If you’re looking at our website from outside the UK and would like to book through an agent in your country, please take a look at our list of'
                                            )}{' '}
                                            <Link href="/">{t('approved agents by country')}</Link>
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
            </div>
        </div>
    );
};

export default ContactUs;
