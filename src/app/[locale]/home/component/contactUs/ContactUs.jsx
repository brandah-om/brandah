'use client';
import React, { useEffect } from 'react';
import style from './contactUs.module.css';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Aos from 'aos';
import { useGetFooterDataQuery } from '@/store/Footer/FooterDataSlice';

const ContactUs = () => {
    const locale = useLocale();
    const t = useTranslations('HomePage');

    useEffect(() => {
        Aos.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);

    const { data, error, isLoading } = useGetFooterDataQuery(locale);
    const footerData = data?.setting;

    return (
        <div className={style.ContactUs}>
            <div className="container-fluid h-100">
                <div className="d-flex justify-content-between align-items-center flex-wrap h-100">
                    <div
                        data-aos="fade-up"
                        data-aos-delay="0"
                        className={`${style.contactBox} d-flex justify-content-center align-items-center flex-column flex-wrap`}
                    >
                        <img src="/homepage/contact-us/phone.png" alt="phone" />
                        <p>{t('Emergency')}</p>
                        <a
                            className="text-white text-decoration-none"
                            href={`tel:${footerData?.phone}`}
                        >
                            <p> {footerData?.phone || t('No Data Found')}</p>
                        </a>
                    </div>

                    <div
                        data-aos="fade-up"
                        data-aos-delay="300"
                        className={`${style.contactBox} d-flex justify-content-center align-items-center flex-column flex-wrap`}
                    >
                        <img src="/homepage/contact-us/mail.png" alt="mail" />
                        <p>{t('SEND US A MESSAGE')}</p>
                        <a
                            className="text-white text-decoration-none"
                            href={`mailto:${footerData?.email}`}
                        >
                            <p>{footerData?.email}</p>
                        </a>
                    </div>

                    <div
                        data-aos="fade-up"
                        data-aos-delay="600"
                        className={`${style.contactBox} d-flex justify-content-center align-items-center flex-column flex-wrap`}
                    >
                        <img src="/homepage/contact-us/chat.png" alt="chat" />
                        <p>{t('CHAT WITH US NOW')}</p>
                        <Link
                            className="text-white text-decoration-none"
                            href={`/${locale}/contactUs`}
                        >
                            <p>{t('Get Started')}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
