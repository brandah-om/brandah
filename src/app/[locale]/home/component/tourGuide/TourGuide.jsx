'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Vujahday_Script } from 'next/font/google';
import style from './tourGuide.module.css';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const TourGuide = ({ data }) => {
    const locale = useLocale();
    const t = useTranslations('HomePage');
    const [isSubscribed, setIsSubscribed] = useState(null);
    const [token, setToken] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const userToken = Cookies.get('token') || null;
        const subscriptionStatus = Cookies.get('is_subscribed') === 'true';

        setToken(userToken);
        setIsSubscribed(subscriptionStatus);
    }, []);

    const handleNavigation = path => {
        if (!token) {
            Swal.fire({
                title: t('You must be logged in or register to access this page'),
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: false,
                showCloseButton: true,
                customClass: {
                    title: 'swal-title-small',
                },
                // <p>${t('Please choose an option')}</p>
                html: `
                    <div class='d-flex justify-content-between align-items-center flex-lg-row flex-column gap-2' >
                        <a 
                            href="/${locale}/RegisterTourist" 
                            style="
                                padding: 5px 10px;
                                background-color: #9F733C;
                                color: white;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 14px;
                                transition: background-color 0.3s ease;
                            "
                        >
                            ${t('Register Tourist')}
                        </a>
                        <a 
                            href="/${locale}/RegisterAgency" 
                            style="
                                padding: 5px 10px;
                                background-color: #9F733C;
                                color: white;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 14px;
                                transition: background-color 0.3s ease;
                            "
                        >
                            ${t('Register Agency')}
                        </a>
                        <a 
                            href="/${locale}/RegisterTourGuide" 
                            style="
                                padding: 5px 10px;
                                background-color: #9F733C;
                                color: white;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 14px;
                                transition: background-color 0.3s ease;
                            "
                        >
                            ${t('Register Tour Guide')}
                        </a>
                        <a
                            href="/${locale}/login" 
                            style="
                                padding: 5px 10px;
                                background-color: #9F733C;
                                color: white;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 14px;
                                transition: background-color 0.3s ease;
                            "
                        >
                            ${t('Sign In')}
                        </a>
                    </div>
                `,
                didOpen: () => {
                    const links = document.querySelectorAll('a');
                    links.forEach(link => {
                        link.addEventListener('click', () => {
                            Swal.close();
                        });
                    });
                },
            });
            return;
        }

        if (!isSubscribed) {
            Swal.fire({
                title: t('You must be subscribed to access this page'),
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: t('Subscribe'),
                timer: 3000,
                timerProgressBar: true,
            }).then(result => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                    router.push(`/${locale}/subscribe`);
                }
            });
            return;
        }

        router.push(path);
    };

    return (
        <motion.div
            className={style.tourguide}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
        >
            <div className="px-lg-5 px-2">
                <div className="container-fluid mt-5">
                    <div className="row">
                        <motion.div
                            className="col-md-12 text-center mb-4"
                            initial={{ opacity: 0, y: -30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h6 className={`${vujahday.className} ${style.tourGuideTitle}`}>
                                {t('We’re here for you')}
                            </h6>
                            <h2 className={style.tourGuideMailTitle}>{t('Tour Guides')}</h2>
                            <p className={style.tourGuideCaption}>
                                {t('Hire expert tour guides trusted by +100,000 customers')}
                            </p>
                        </motion.div>

                        {data?.slice(0, 4).map((guide, index) => (
                            <motion.div
                                className="col-md-3 mb-3"
                                key={guide.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    href={`/${locale}/tourguide/${guide.id}`}
                                    onClick={e => {
                                        e.preventDefault();
                                        handleNavigation(`/${locale}/tourguide/${guide.id}`);
                                    }}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <div className={`${style.cardSection} card`}>
                                        <img
                                            className={style.cardSectionImg}
                                            src={guide.image || '/homepage/tour-guide/1.jpeg'}
                                            alt={guide.name || 'tourGuide'}
                                        />
                                        <div className="card-body">
                                            <h5 className={`${style.cardTitle}`}>{guide.name}</h5>
                                            <div className={style.cardRate}>
                                                <div className="ml-2">
                                                    <img
                                                        src="/homepage/tour-guide/star.png"
                                                        alt="star"
                                                    />
                                                </div>
                                                <p className="m-0">{guide.rate || 'null'}</p>
                                            </div>

                                            <div className={style.location}>
                                                <div>
                                                    <img
                                                        src="/homepage/tour-guide/location.png"
                                                        alt="location"
                                                    />
                                                </div>
                                                <p className="m-0">
                                                    {guide.city} , {guide.country}
                                                </p>
                                            </div>

                                            <div className={style.location}>
                                                <div>
                                                    <img
                                                        src="/homepage/tour-guide/lang.png"
                                                        alt="location"
                                                    />
                                                </div>
                                                {guide.languages.map(lang => (
                                                    <p className="m-0" key={lang.id}>
                                                        {lang.name}
                                                    </p>
                                                ))}
                                            </div>

                                            <div className={style.cardPrice}>
                                                <p>$ {guide.price}</p>
                                                <div>
                                                    {t('for')} {guide.days}{' '}
                                                    {t('days including accomodation')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}

                        <motion.div
                            className={`${style.cardBtn} col-md-12`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href={`/${locale}/tourguide`}
                                onClick={e => {
                                    e.preventDefault();
                                    handleNavigation(`/${locale}/tourguide`);
                                }}
                            >
                                <span>{t('View More Guides')}</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TourGuide;
