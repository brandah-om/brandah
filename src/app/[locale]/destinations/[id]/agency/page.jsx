'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import style from './agency.module.css';
import { Vujahday_Script } from 'next/font/google';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NavBar from '@/components/navBar/NavBar';
import Loading from '@/components/Loading/Loading';
import { useGetAgencyQuery } from '@/store/Agency/AgencySlice';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FlagIcon from '@mui/icons-material/Flag';
import { motion } from 'framer-motion';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import ContactUs from '@/app/[locale]/home/component/contactUs/ContactUs';
import Newsletter from '@/app/[locale]/home/component/newsletter/Newsletter';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const page = () => {
    const t = useTranslations('HomePage');
    const router = useRouter();
    const locale = useLocale();
    const { data, isLoading, error } = useGetAgencyQuery(locale);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
    };

    const breadcrumbs = [{ label: t('Home'), href: `/${locale}/` }, { label: t('Agency') }];

    return (
        <div>
            <NavBar />
            <div className={style.destinationPage}>
                <div className="mb-3 px-lg-3 px-1">
                    <DynamicBreadcrumbs items={breadcrumbs} />
                </div>
                <div className="container-fluid mb-5">
                    <div className="row">
                        <div className="col-md-12 text-center mb-3">
                            <motion.h6
                                className={`${vujahday.className} ${style.destinationTitle}`}
                                {...fadeInUp}
                            >
                                {t('Discover your happy place')}
                            </motion.h6>
                            <motion.h2 className={style.destinationMailTitle} {...fadeInUp}>
                                {t('Agency')}
                            </motion.h2>
                            <motion.p className={style.destinationCaption} {...fadeInUp}>
                                {t('Explore top Agencies voted by more than +100,000 customers')}
                            </motion.p>
                        </div>
                        {isLoading ? (
                            <Loading />
                        ) : error ? (
                            <div className="text-center mt-4">
                                <p>{t('Error Loading Data')}</p>
                            </div>
                        ) : (
                            <div className="container-fluid">
                                <div className="row">
                                    {data?.data?.map(agency => (
                                        <Link
                                            className="text-decoration-none col-md-3 mb-3"
                                            href={`/${locale}/agency/${agency.id}`}
                                        >
                                            <div className={`${style.cardSection} card`}>
                                                <img
                                                    className={style.swiperSlideImage}
                                                    src={
                                                        agency.image ||
                                                        '/homepage/tour-guide/1.jpeg'
                                                    }
                                                    alt="agency"
                                                />
                                                <div className="card-body">
                                                    <h5 className={`${style.cardTitle}`}>
                                                        {agency.name}
                                                    </h5>
                                                    <div className={style.cardDetails}>
                                                        <div className="ml-2">
                                                            <LocalPhoneIcon
                                                                sx={{ color: '#9F733C' }}
                                                            />
                                                        </div>
                                                        <p className="m-0">{agency.phone}</p>
                                                    </div>

                                                    <div className={style.cardDetails}>
                                                        <div>
                                                            <EmailIcon sx={{ color: '#9F733C' }} />
                                                        </div>
                                                        <p className="m-0">{agency.email}</p>
                                                    </div>

                                                    <div className={style.cardDetails}>
                                                        <div>
                                                            <AssessmentIcon
                                                                sx={{ color: '#9F733C' }}
                                                            />
                                                        </div>
                                                        <p className="m-0">
                                                            {agency.provider_type}
                                                        </p>
                                                    </div>

                                                    <div className={style.cardDetails}>
                                                        <div className="d-flex align-items-center justify-content-start">
                                                            <LocationCityIcon
                                                                sx={{ color: '#9F733C' }}
                                                            />
                                                            <p className="m-0">{agency.city}</p>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-start">
                                                            <FlagIcon sx={{ color: '#9F733C' }} />
                                                            <p className="m-0">{agency.country}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* <ContactUs /> */}
                {/* <Newsletter /> */}
            </div>
        </div>
    );
};

export default page;
