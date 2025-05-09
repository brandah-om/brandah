'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './reset.module.css';
import NavBar from '../../../components/navBar/NavBar';
import { Vujahday_Script } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useResetPassMutation } from '../../../store/forgetPassword/resetPassSlice';
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useResendOtpMutation } from '../../../store/forgetPassword/resendOtp';
import Loading from '../../../components/Loading/Loading';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const Page = () => {
    const t = useTranslations('HomePage');
    const locale = useLocale();
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prevState => !prevState);
    };

    const [resetPass, { isLoading, error }] = useResetPassMutation();
    const [resetOtp, { isLoading: loadingOtp }] = useResendOtpMutation();
    const [errors, setErrors] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        password: '',
        password_confirmation: '',
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

            password: formData.password
                ? formData.password.length < 6
                    ? t('Password must be at least 6 characters')
                    : ''
                : t('Password is required'),

            password_confirmation: formData.password_confirmation
                ? formData.password_confirmation !== formData.password
                    ? t('Passwords do not match')
                    : ''
                : t('Password confirmation is required'),
        };

        setErrors(newErrors);

        if (newErrors.otp || newErrors.password || newErrors.password_confirmation) {
            return;
        }

        const data = new FormData();
        for (const key in formData) {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        }

        try {
            const result = await resetPass(data).unwrap();
            console.log('Password Reset Successfully:', result);

            toast.success(result?.message || t('Password Reset Successful!'), {
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
            console.error('Password Reset Failed:', err);

            const translatedErrMessage =
                err?.data?.message === 'Password Reset failed'
                    ? t('PasswordResetFailed')
                    : err?.data?.message;

            toast.error(translatedErrMessage || t('Password Reset failed'), {
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

    const [resendDisabled, setResendDisabled] = useState(false);

    const handleResendOtp = async () => {
        const savedEmail = localStorage.getItem('registeredEmail');
        if (!savedEmail) {
            toast.error(t('No email found'), {
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
            return;
        }

        try {
            setResendDisabled(true);
            const result = await resetOtp({ email: savedEmail }).unwrap();

            toast.success(result?.message || t('OTP resent successfully'), {
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

            setTimeout(() => setResendDisabled(false), 30000);
        } catch (error) {
            console.error('Resend OTP Failed:', error);
            toast.error(error?.data?.message || t('Failed to resend OTP'), {
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
            setResendDisabled(false);
        }
    };

    return (
        <div>
            <NavBar />
            <div className={style.ResetPage}>
                <div className={style.ResetBg}>
                    {(isLoading || loadingOtp) && <Loading />}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 text-center text-white mt-3">
                                <h4 className={vujahday.className}>
                                    {t('Dream, Explore, Discover Your Travel Begins Here')}
                                </h4>
                                <h4 className={`${vujahday.className} mt-2`}>
                                    {t('Reset Your Password')}
                                </h4>
                            </div>
                            <div className={`${style.rightBox} col-md-6 m-auto mt-3`}>
                                <form onSubmit={handleSubmit}>
                                    <div className={`${style.box} row`}>
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
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 d-flex flex-column mb-3">
                                            <label className={`${style.label}`}>
                                                {t('Password')} <span>*</span>
                                            </label>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    position: 'relative',
                                                    direction: locale === 'ar' ? 'rtl' : 'ltr',
                                                }}
                                            >
                                                <input
                                                    className={style.contactInput}
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    placeholder="*******"
                                                    style={{
                                                        flex: 1,
                                                        textAlign:
                                                            locale === 'ar' ? 'right' : 'left',
                                                        direction: locale === 'ar' ? 'rtl' : 'ltr',
                                                    }}
                                                />
                                                <IconButton
                                                    onClick={togglePasswordVisibility}
                                                    edge="end"
                                                    sx={{
                                                        position: 'absolute',
                                                        [locale === 'ar' ? 'left' : 'right']:
                                                            '10px',
                                                        [locale === 'ar' ? 'right' : 'left']:
                                                            'auto',
                                                        color: '#666',
                                                    }}
                                                >
                                                    {showPassword ? (
                                                        <VisibilityIcon />
                                                    ) : (
                                                        <VisibilityOffIcon />
                                                    )}
                                                </IconButton>
                                            </div>
                                            {errors.password && (
                                                <span className={style.errorText}>
                                                    {errors.password}
                                                </span>
                                            )}
                                        </div>

                                        <div className="col-md-6 d-flex flex-column mb-3">
                                            <label className={`${style.label}`}>
                                                {t('Confirm password')} <span>*</span>
                                            </label>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    position: 'relative',
                                                    direction: locale === 'ar' ? 'rtl' : 'ltr',
                                                }}
                                            >
                                                <input
                                                    className={style.contactInput}
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    name="password_confirmation"
                                                    value={formData.password_confirmation}
                                                    onChange={handleChange}
                                                    placeholder="*******"
                                                    style={{
                                                        flex: 1,
                                                        textAlign:
                                                            locale === 'ar' ? 'right' : 'left',
                                                        direction: locale === 'ar' ? 'rtl' : 'ltr',
                                                    }}
                                                />
                                                <IconButton
                                                    onClick={toggleConfirmPasswordVisibility}
                                                    edge="end"
                                                    sx={{
                                                        position: 'absolute',
                                                        [locale === 'ar' ? 'left' : 'right']:
                                                            '10px',
                                                        [locale === 'ar' ? 'right' : 'left']:
                                                            'auto',
                                                        color: '#666',
                                                    }}
                                                >
                                                    {showConfirmPassword ? (
                                                        <VisibilityIcon />
                                                    ) : (
                                                        <VisibilityOffIcon />
                                                    )}
                                                </IconButton>
                                            </div>
                                            {errors.password_confirmation && (
                                                <span className={style.errorText}>
                                                    {errors.password_confirmation}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className={style.loginBtn}>
                                        <button type="submit" disabled={isLoading}>
                                            <span>
                                                {isLoading ? t('Confirming') : t('Confirm')}
                                            </span>
                                        </button>
                                    </div>
                                </form>

                                <div className="col-md-12 text-center mt-3">
                                    <button
                                        className={style.resend}
                                        onClick={handleResendOtp}
                                        disabled={resendDisabled}
                                    >
                                        {resendDisabled ? t('Please Wait') : t('Resend OTP')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
