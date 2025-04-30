'use client';
import React, { useEffect, useState } from 'react';
import style from '../MyAccount.module.css';
import { useTranslations } from 'next-intl';
import Loading from '../../../../components/Loading/Loading';
import { useRouter } from 'next/navigation';

const MyAccountProfile = ({ data, isLoading, error }) => {
    const t = useTranslations('HomePage');
    const router = useRouter();

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        name: '',
    });

    useEffect(() => {
        if (data?.success) {
            setUserData({
                firstName: data.user.first_name,
                lastName: data.user.last_name,
                email: data.user.email,
                phone: data.user.phone,
                name: data.user.name,
            });
        }
    }, [data]);

    const handleGoToDashboard = () => {
        router.push(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`);
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
                            {userData.name && (
                                <div className="col-md-6 d-flex flex-column mb-3">
                                    <label className={`${style.label}`}>
                                        {t('Full Name')} <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="text"
                                        value={userData.name}
                                        readOnly
                                    />
                                </div>
                            )}
                            {userData.firstName && (
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
                            )}
                            {userData.lastName && (
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
                            )}
                            {userData.email && (
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
                            )}
                            {userData.phone && (
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
                            )}
                            {data?.user.type !== 'user' && (
                                <div className="col-12 text-center mt-3">
                                    <button onClick={handleGoToDashboard} className={style.goTo}>
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
