'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './forget.module.css';
import NavBar from '@/components/navBar/NavBar';
import { Vujahday_Script } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useForgetPassMutation } from '@/store/forgetPassword/forgetPassSlice';
import Loading from '@/components/Loading/Loading';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const Page = () => {
    const t = useTranslations('HomePage');
    const locale = useLocale();
    const router = useRouter();

    const [formData, setFormData] = useState({ email: '' });
    const [errors, setErrors] = useState({});

    const [forgetPass, { isLoading }] = useForgetPassMutation();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!formData.email) {
            setErrors({ email: t('Email is required') });
            return;
        }

        try {
            const result = await forgetPass(formData).unwrap();
            console.log('Forget password response:', result);
            localStorage.setItem('registeredEmail', formData.email);

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
                progressStyle: { direction: locale === 'ar' ? 'rtl' : 'ltr' },
            });

            setTimeout(() => {
                router.push(`/${locale}/resetPassword`);
            }, 3000);
        } catch (err) {
            console.error('Verify Failed:', err);

            const errorMessage =
                err?.data?.message === 'Verify failed' ? t('VerifyFailed') : err?.data?.message;

            setErrors({ email: errorMessage });

            toast.error(errorMessage || t('Verify failed'), {
                position: locale === 'ar' ? 'top-left' : 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
                rtl: locale === 'ar',
                style: { backgroundColor: '#C64E4E', color: 'white' },
                progressStyle: { direction: locale === 'ar' ? 'rtl' : 'ltr' },
            });
        }
    };

    return (
        <div>
            <NavBar />
            <div className={style.forgetPage}>
                <div className={style.forgetBg}>
                    {isLoading && <Loading />}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 text-center text-white mt-5">
                                <h4 className={vujahday.className}>
                                    {t('Dream, Explore, Discover Your Travel Begins Here')}
                                </h4>
                                <h4 className={`${vujahday.className} mt-2`}>
                                    {t('Forget Your Password')}
                                </h4>
                            </div>
                            <div className={`${style.rightBox} col-md-6 m-auto mt-3`}>
                                <form onSubmit={handleSubmit}>
                                    <div className={`${style.box} row`}>
                                        <div className="col-md-12 d-flex flex-column mb-3">
                                            <label className={style.label}>
                                                {t('Email')} <span>*</span>
                                            </label>
                                            <input
                                                className={style.contactInput}
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder={t('Enter Your Registered Email')}
                                            />
                                            {errors.email && (
                                                <span className={style.errorText}>
                                                    {errors.email}
                                                </span>
                                            )}
                                        </div>

                                        <div className={style.loginBtn}>
                                            <button type="submit" disabled={isLoading}>
                                                <span>
                                                    {isLoading ? t('Sending') : t('Send')}
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
