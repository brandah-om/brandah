'use client';
import * as React from 'react';
import style from './login.module.css';
import Link from 'next/link';
import NavBar from '@/components/navBar/NavBar';
import { toast, ToastContainer } from 'react-toastify';
import { useLoginMutation } from '@/store/login/LoginApiSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import Aos from 'aos';
import Loading from '@/components/Loading/Loading';
import Cookies from 'js-cookie';

const Login = () => {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('HomePage');
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');

    const [login, { isLoading, error }] = useLoginMutation();

    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = React.useState({
        email: '',
        password: '',
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = t('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('Please enter a valid email address');
        }

        if (!formData.password) {
            newErrors.password = t('Password is required');
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const data = new FormData();

        for (const key in formData) {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        }

        try {
            const result = await login(data).unwrap();
            console.log('User signing in:', result);

            const translatedMessage =
                result?.message === 'Login successful!' ? t('loginSuccess') : result?.message;

            toast.success(translatedMessage, {
                position: locale === 'ar' ? 'top-left' : 'top-right',
                autoClose: 3000,
                theme: 'colored',
                rtl: locale === 'ar',
                style: { backgroundColor: '#B18D61', color: 'white' },
                progressStyle: {
                    direction: locale === 'ar' ? 'rtl' : 'ltr',
                },
            });

            localStorage.setItem('token', result.token);
            localStorage.setItem('firstName', result.user.first_name);
            localStorage.setItem('lastName', result.user.last_name);
            localStorage.setItem('email', result.user.email);
            localStorage.setItem('phone', result.user.phone);
            localStorage.setItem('userId', result.user.id);
            localStorage.setItem('role', result.user.type);
            Cookies.set('token', result.token, { expires: 7 });
            Cookies.set('is_subscribed', result.user.is_subscribed, { expires: 7 });
            // const query = new URLSearchParams(window.location.search);
            // let redirectPath = query.get('redirect');

            // if (!redirectPath || redirectPath === 'undefined' || !redirectPath.startsWith('/')) {
            //     redirectPath = `/${locale}/`;
            // }

            // setTimeout(() => {
            //     router.replace(redirectPath);
            // }, 3000);

            if (!result.user.is_subscribed) {
                toast.warning(t('You are not subscribed! Please subscribe to continue'), {
                    position: locale === 'ar' ? 'top-left' : 'top-right',
                    autoClose: 3000,
                    theme: 'colored',
                    rtl: locale === 'ar',
                    style: { backgroundColor: '#FF9800', color: 'white' },
                    progressStyle: {
                        direction: locale === 'ar' ? 'rtl' : 'ltr',
                    },
                });
                setTimeout(() => {
                    router.push(`/${locale}/subscribe`);
                }, 3000);
            } else {
                setTimeout(() => {
                    router.push('/');
                }, 3000);
            }
        } catch (err) {
            console.error('Signing in Failed:', err);

            const translatedErrMessage =
                err?.data?.message === t('Invalid credentials')
                    ? t('loginError')
                    : err?.data?.message;

            toast.error(translatedErrMessage || t('Sign in failed'), {
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

    useEffect(() => {
        Aos.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    return (
        <>
            <NavBar />
            <div className={style.loginPage}>
                {isLoading && <Loading />}

                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-center">
                            <img
                                className={style.logoImg}
                                src="/white-logo.png"
                                alt=""
                                data-aos="fade-down" 
                            />
                        </div>
                        <form action="" onSubmit={handleSubmit} data-aos="fade-up">
                            {' '}
                            <div className="row">
                                <div
                                    className="col-md-8 m-auto d-flex flex-column"
                                    data-aos="fade-right"
                                >
                                    <label className={`${style.label}`}>
                                        {t('Email')} <span style={{ color: '#f00;' }}>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={t('Enter Your Email')}
                                    />
                                    {errors.email && (
                                        <span className={style.errorText}>{errors.email}</span>
                                    )}
                                </div>
                                <div
                                    className="col-md-8 m-auto d-flex flex-column mt-3"
                                    data-aos="fade-up"
                                >
                                    <label className={`${style.label}`}>
                                        {t('Password')}
                                        <span style={{ color: '#f00;' }}>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="*******"
                                    />
                                    {errors.password && (
                                        <span className={style.errorText}>{errors.password}</span>
                                    )}
                                </div>
                                <div className="col-md-8 m-auto">
                                    <div
                                        className="d-flex justify-content-between align-items-center flex-wrap"
                                        data-aos="zoom-in"
                                    >
                                        <div>
                                            <p className={`${style.notHaveAccount} mt-4`}>
                                                {t('Don’t have account?')}
                                                <Link href="/">{t('Sign Up')}</Link>
                                            </p>
                                        </div>
                                        <div>
                                            <Link href="/" className={style.forgetPass}>
                                                {t('Forgot password?')}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8 m-auto">
                                    <div className={style.loginBtn}>
                                        <button type="submit" disabled={isLoading}>
                                            <span>{isLoading ? t('signingIn') : t('Sign In')}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
