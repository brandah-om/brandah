'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Vujahday_Script } from 'next/font/google';
import style from './hotesl.module.css';
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

const Hotels = ({ data }) => {
    const t = useTranslations('HomePage');
    const locale = useLocale();
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
        <div className="px-lg-5 px-2">
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-12 text-center mb-4">
                        <motion.h6
                            className={`${vujahday.className} ${style.hotelsTitle}`}
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            {t('wonderful place for you')}
                        </motion.h6>

                        <motion.h2
                            className={style.hotelsMailTitle}
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {t('Popular Hotels')}
                        </motion.h2>

                        <motion.p
                            className={style.hotelsCaption}
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            {t('Explore our popular hotels voted by more than +100,000 customers')}
                        </motion.p>
                    </div>

                    {data?.slice(0, 4).map((hotel, index) => (
                        <motion.div
                            className="col-md-3 mb-3"
                            key={hotel.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href={`/${locale}/hotels/${hotel.id}`}
                                onClick={e => {
                                    e.preventDefault();
                                    handleNavigation(`/${locale}/hotels/${hotel.id}`);
                                }}
                                style={{ textDecoration: 'none' }}
                            >
                                <div className={`${style.cardSection} card`}>
                                    <img
                                        className={`${style.hotelImg} card-img-top`}
                                        src={hotel.images || '/homepage/hotels/1.png'}
                                        alt={hotel.name || t('null')}
                                    />
                                    <div className="card-body">
                                        <h5 className={`${style.cardTitle}`}>
                                            {hotel.name || t('null')}
                                        </h5>
                                        <p
                                            className={`${style.cardBody}`}
                                            dangerouslySetInnerHTML={{
                                                __html: hotel.description || '',
                                            }}
                                        ></p>
                                        <div className={style.cardRate}>
                                            <div className="ml-2">
                                                <img src="/homepage/hotels/star.png" alt="star" />
                                            </div>
                                            <p className="m-0">{hotel.rating || t('null')}</p>
                                        </div>
                                        <div className={style.cardPrice || t('null')}>
                                            <p>
                                                {hotel.price || t('null')} {hotel.currency}
                                            </p>
                                            <div>
                                                {hotel.days || t('null')} {t('nights accomodation')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    <motion.div
                        className={`${style.cardBtn} col-md-12`}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link
                            href={`/${locale}/hotels`}
                            onClick={e => {
                                e.preventDefault();
                                handleNavigation(`/${locale}/hotels`);
                            }}
                        >
                            <span>{t('View More Hotels')}</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hotels;
