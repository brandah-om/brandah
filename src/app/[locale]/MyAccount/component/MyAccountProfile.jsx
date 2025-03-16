'use client';
import React, { useEffect, useState } from 'react';
import style from '../MyAccount.module.css';
import { useTranslations } from 'next-intl';
import Loading from '@/components/Loading/Loading';
import { useRouter } from 'next/navigation'; // استيراد useRouter من next/navigation

const MyAccountProfile = ({ data, isLoading, error }) => {
    const t = useTranslations('HomePage');
    const router = useRouter(); // تهيئة useRouter

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        if (data?.success) {
            setUserData({
                firstName: data.user.first_name,
                lastName: data.user.last_name,
                email: data.user.email,
                phone: data.user.phone,
            });
        }
    }, [data]);

    const handleGoToDashboard = () => {
        router.push('https://brandah.inote-tech.com/login');
    };

    return (
        <div>
            <div className={`${style.dataInputs}`}>
                <div className="row">
                    {isLoading ? (
                        <Loading />
                    ) : error ? (
                        <p>{t('Error loading Data')}</p>
                    ) : (
                        <>
                            <div className="col-md-6 d-flex flex-column mb-3">
                                <label className={`${style.label}`}>
                                    {t('First Name')} <span>*</span>
                                </label>
                                <input
                                    className={style.contactInput}
                                    type="text"
                                    value={userData.firstName}
                                    readOnly
                                />
                            </div>
                            <div className="col-md-6 d-flex flex-column mb-3">
                                <label className={`${style.label}`}>
                                    {t('Last Name')} <span>*</span>
                                </label>
                                <input
                                    className={style.contactInput}
                                    type="text"
                                    value={userData.lastName}
                                    readOnly
                                />
                            </div>
                            <div className="col-md-6 d-flex flex-column mb-3">
                                <label className={`${style.label}`}>
                                    {t('Email')} <span>*</span>
                                </label>
                                <input
                                    className={style.contactInput}
                                    type="email"
                                    value={userData.email}
                                    readOnly
                                />
                            </div>
                            <div className="col-md-6 d-flex flex-column mb-3">
                                <label className={`${style.label}`}>
                                    {t('Phone Number')} <span>*</span>
                                </label>
                                <input
                                    className={style.contactInput}
                                    type="text"
                                    value={userData.phone}
                                    readOnly
                                />
                            </div>

                            {data?.user.type === 'tour_guide' && (
                                <div className="col-12 text-center mt-3">
                                    <button
                                        onClick={handleGoToDashboard}
                                        className={style.goTo}
                                    >
                                        {t('Go to Dashboard')}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyAccountProfile;
