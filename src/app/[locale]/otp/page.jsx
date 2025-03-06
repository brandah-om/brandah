'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './otp.module.css';
import NavBar from '@/components/navBar/NavBar';
import { Vujahday_Script } from 'next/font/google';
import { useVerifyOtpMutation } from '@/store/register/VerifyOtpApiSlice';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const Page = () => {
    const t = useTranslations('HomePage');
    const locale = useLocale();
    const router = useRouter();

    const [verifyOtp, { isLoading, error }] = useVerifyOtpMutation();
    const [errors, setErrors] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        otp: '',
    });

    useEffect(() => {
        const savedEmail = localStorage.getItem('registeredEmail');
        if (savedEmail) {
            setFormData(prev => ({
                ...prev,
                email: savedEmail, 
            }));
        }
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const newErrors = {
            otp: formData.otp
                ? formData.otp.length > 6
                    ? t('OTP must be 6 digits')
                    : ''
                : t('OTP is required'),
        };

        setErrors(newErrors);

        if (newErrors.otp) {
            return;
        }

        const data = new FormData();
        for (const key in formData) {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        }

        try {
            const result = await verifyOtp(data).unwrap();
            console.log('Email verified:', result);

            toast.success(result?.message || t('Verify Successful!'), {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
                rtl: locale === 'ar',
                style: { backgroundColor: '#B18D61', color: 'white' },
                progressStyle: {
                    direction: locale === 'ar' ? 'rtl' : 'ltr',
                },
            });
            setErrors('');

            setTimeout(() => {
                router.push(`/${locale}/login`);
            }, 3000);
        } catch (err) {
            console.error('Verify Failed:', err);

            const translatedErrMessage =
                err?.data?.message === 'Verify failed' ? t('VerifyFailed') : err?.data?.message;

            toast.error(translatedErrMessage || t('Verify failed'), {
                position: locale === 'ar' ? 'top-left' : 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                rtl: locale === 'ar',
                style: {
                    backgroundColor: '#C64E4E',
                    color: 'white',
                },
                progressStyle: {
                    direction: locale === 'ar' ? 'rtl' : 'ltr',
                },
            });
        }
    };

    return (
        <div>
            <NavBar />
            <div className={style.otpPage}>
                <div className={style.otpBg}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 text-center text-white mt-3">
                                <h4 className={vujahday.className}>
                                    {t('Dream, Explore, Discover Your Travel Begins Here')}
                                </h4>
                                <h4 className={`${vujahday.className} mt-2`}>
                                    {t('Verify Your Email')}
                                </h4>
                            </div>
                            <div className={`${style.rightBox} col-md-6 m-auto mt-3`}>
                                <form onSubmit={handleSubmit}>
                                    <div className={`${style.box} row`}>
                                        {/* تمت إزالة حقل الإدخال الخاص بالبريد الإلكتروني */}

                                        <div className="col-md-12 d-flex flex-column mb-3">
                                            <label className={`${style.label}`}>
                                                {t('OTP Number')} <span>*</span>
                                            </label>
                                            <input
                                                className={style.contactInput}
                                                type="text"
                                                name="otp"
                                                value={formData.otp}
                                                onChange={handleChange}
                                                placeholder={t('Enter OTP Number From Your Email')}
                                            />
                                            {errors.otp && (
                                                <span className={style.errorText}>
                                                    {errors.otp}
                                                </span>
                                            )}
                                        </div>

                                        <div className={style.loginBtn}>
                                            <button type="submit" disabled={isLoading}>
                                                <span>
                                                    {isLoading ? t('Verifying') : t('Verify')}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
