'use client';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import NavBar from '@/components/navBar/NavBar';
import { useGetAgencysBtIdQuery } from '@/store/Agency/AgencyDetailsSlice';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import style from './details.module.css';
import Loading from '@/components/Loading/Loading';
import ContactUs from '../../home/component/contactUs/ContactUs';
import Newsletter from '../../home/component/newsletter/Newsletter';
import { motion } from 'framer-motion'; 

const Page = ({ params }) => {
    const { id } = params;
    const locale = useLocale();
    const t = useTranslations('HomePage');

    const { data, isLoading, error } = useGetAgencysBtIdQuery({ id, lang: locale });

    let agency = null;
    if (!isLoading && data?.data) {
        agency = data.data;
    }

    const fadeInUp = {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    return (
        <div>
            <NavBar />
            <div className={style.agencyDetails}>
                <div className="container">
                    {isLoading ? (
                        <Loading />
                    ) : error || !agency ? (
                        <p>{t('Error loading Data')}</p>
                    ) : (
                        <>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className={style.DynamicBreadcrumbs}>
                                        <DynamicBreadcrumbs
                                            items={[
                                                { label: t('Home'), href: '/' },
                                                { label: t('Agencies'), href: `/${locale}/agency` },
                                                { label: agency.name || 'Agency' },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-8 mx-auto">
                                    <div className="row">
                                        <motion.div
                                            className="col-md-6 border p-3 rounded shadow d-flex flex-column align-items-center justify-content-center"
                                            {...fadeInUp}
                                        >
                                            {agency.image ? (
                                                <img
                                                    src={agency.image}
                                                    alt={agency.name || 'Agency'}
                                                    className="img-fluid rounded shadow"
                                                    style={{
                                                        maxWidth: '100%',
                                                        height: '250px',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                            ) : (
                                                <p>No Image Available</p>
                                            )}
                                        </motion.div>

                                        <motion.div
                                            className="col-md-6 border p-3 rounded shadow"
                                            {...fadeInUp}
                                        >
                                            <h2 className="mb-3">
                                                {agency.name || 'No Name Available'}
                                            </h2>
                                            <p>
                                                <strong className="text-main">
                                                    {t('Phone Number')}:
                                                </strong>{' '}
                                                {agency.phone || 'N/A'}
                                            </p>
                                            <p>
                                                <strong className="text-main">{t('Email')}:</strong>{' '}
                                                {agency.email || 'N/A'}
                                            </p>
                                            <p>
                                                <strong className="text-main">{t('City')}:</strong>{' '}
                                                {agency.city || 'N/A'}
                                            </p>
                                            <p>
                                                <strong className="text-main">
                                                    {t('Country')}:
                                                </strong>{' '}
                                                {agency.country || 'N/A'}
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ContactUs />
            <Newsletter />
        </div>
    );
};

export default Page;
