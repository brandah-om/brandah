'use client';
import * as React from 'react';
import style from './register.module.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useRegisterTouristMutation } from '../../../store/register/RegisterTouristApiSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../../../components/navBar/NavBar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import Typography from '@mui/material/Typography';
import Loading from '../../../components/Loading/Loading';
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const RegisterPage = () => {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('HomePage');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prevState => !prevState);
    };
    const [registerTourist, { isLoading, error }] = useRegisterTouristMutation();

    const [formData, setFormData] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        hasCoupon: '',
        coupon: '',
    });

    const [errors, setErrors] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        // phone: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = e => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
            ...(name === 'hasCoupon' && value === 'no' ? { coupon: '' } : {}),
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (formData.hasCoupon === 'yes' && !formData.coupon.trim()) {
            newErrors.coupon = t('Coupon code is required');
        }

        if (!formData.first_name) {
            newErrors.first_name = t('First name is required');
        }
        if (!formData.last_name) {
            newErrors.last_name = t('Last name is required');
        }
        if (!formData.email) {
            newErrors.email = t('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('Email is invalid');
        }
        // if (!formData.phone) {
        //     newErrors.phone = t('Phone number is required');
        // }
        if (!formData.password) {
            newErrors.password = t('Password is required');
        } else if (formData.password.length < 6) {
            newErrors.password = t('Password must be at least 6 characters');
        }
        if (!formData.password_confirmation) {
            newErrors.password_confirmation = t('Password is required');
        }
        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = t('Passwords do not match');
        }

        if (!formData.acceptTerms) {
            newErrors.acceptTerms = t('You must accept the policy and terms');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!validateForm()) return;

        // if (formData.hasCoupon === 'yes' && !formData.coupon) {
        //     toast.error(t('Coupon code is required!'), {
        //         position: 'top-right',
        //         autoClose: 3000,
        //         theme: 'colored',
        //         style: { backgroundColor: '#C64E4E', color: 'white' },
        //     });
        //     return;
        // }

        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key]) {
                    data.append(key, formData[key]);
                }
            });

            const result = await registerTourist(data).unwrap();
            console.log('User Registered:', result);
            localStorage.setItem('registeredEmail', formData.email);

            toast.success(result?.message || t('Registration Successful!'), {
                position: 'top-right',
                autoClose: 3000,
                theme: 'colored',
                style: { backgroundColor: '#B18D61', color: 'white' },
            });

            setTimeout(() => {
                router.push(`/${locale}/otp`);
            }, 3000);
        } catch (err) {
            console.error('Error:', err);

            if (!err?.data?.message?.includes('Check your email for OTP')) {
                toast.error(err?.data?.message || t('Failed! Please try again'), {
                    position: 'top-right',
                    autoClose: 3000,
                    theme: 'colored',
                    style: { backgroundColor: '#C64E4E', color: 'white' },
                });
            }
        }
    };

    return (
        <>
            <NavBar />

            <div className={style.registerPage}>
                {isLoading && <Loading />}

                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className={style.registerAs}>{t('Register as Tourist')}</p>
                                <p className={style.stayHere}>{t('Tour the World, Start Here')}</p>
                            </div>
                            <img className={style.logoImg} src="/navbar-logo.png" alt="logo" />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 d-flex flex-column mb-3">
                                <label className={`${style.label}`}>
                                    {t('First Name')} <span>*</span>
                                </label>
                                <input
                                    className={style.contactInput}
                                    type="text"
                                    name="first_name"
                                    placeholder={t('Enter Your First Name')}
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                                {errors.first_name && (
                                    <span className={style.errorText}>{errors.first_name}</span>
                                )}
                            </div>

                            <div className="col-md-6 d-flex flex-column mb-3">
                                <label className={`${style.label}`}>
                                    {t('Last Name')} <span>*</span>
                                </label>
                                <input
                                    className={style.contactInput}
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    placeholder={t('Enter Your Last Name')}
                                />
                                {errors.last_name && (
                                    <span className={style.errorText}>{errors.last_name}</span>
                                )}
                            </div>

                            <div className="col-md-6 d-flex flex-column mb-3">
                                <label className={`${style.label}`}>
                                    {t('Email')} <span>*</span>
                                </label>
                                <input
                                    className={style.contactInput}
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={t('Enter your preferred contact email')}
                                />
                                {errors.email && (
                                    <span className={style.errorText}>{errors.email}</span>
                                )}
                            </div>

                            <div className="col-md-6 d-flex flex-column mb-3">
                                <label className={`${style.label}`}>
                                    {t('Phone Number')} <span>*</span>
                                </label>
                                <div className="d-flex align-items-center">
                                    <PhoneInput
                                        international
                                        defaultCountry="OM"
                                        value={formData.phone}
                                        onChange={value =>
                                            setFormData(prev => ({ ...prev, phone: value }))
                                        }
                                        className={`${style.contactInput} w-100`}
                                        placeholder={t('Enter your preferred contact number')}
                                    />
                                </div>
                                {/* {errors.phone && (
                                    <span className={style.errorText}>{errors.phone}</span>
                                )} */}
                            </div>

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
                                            textAlign: locale === 'ar' ? 'right' : 'left',
                                            direction: locale === 'ar' ? 'rtl' : 'ltr',
                                        }}
                                    />
                                    <IconButton
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                        sx={{
                                            position: 'absolute',
                                            [locale === 'ar' ? 'left' : 'right']: '10px',
                                            [locale === 'ar' ? 'right' : 'left']: 'auto',
                                            color: '#666',
                                        }}
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </div>
                                {errors.password && (
                                    <span className={style.errorText}>{errors.password}</span>
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
                                            textAlign: locale === 'ar' ? 'right' : 'left',
                                            direction: locale === 'ar' ? 'rtl' : 'ltr',
                                        }}
                                    />
                                    <IconButton
                                        onClick={toggleConfirmPasswordVisibility}
                                        edge="end"
                                        sx={{
                                            position: 'absolute',
                                            [locale === 'ar' ? 'left' : 'right']: '10px',
                                            [locale === 'ar' ? 'right' : 'left']: 'auto',
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

                            <div className="col-md-12 d-flex flex-column mb-3">
                                <label className="form-label">{t('Do you have a coupon?')}</label>
                                <div>
                                    <label className="mx-3">
                                        <input
                                            type="radio"
                                            name="hasCoupon"
                                            value="yes"
                                            checked={formData.hasCoupon === 'yes'}
                                            onChange={handleChange}
                                        />{' '}
                                        {t('Yes')}
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="hasCoupon"
                                            value="no"
                                            checked={formData.hasCoupon === 'no'}
                                            onChange={handleChange}
                                        />{' '}
                                        {t('No')}
                                    </label>
                                </div>
                            </div>

                            {formData.hasCoupon === 'yes' && (
                                <div className="col-md-6 d-flex flex-column mb-3">
                                    <label className="form-label">{t('Enter Coupon Code')}</label>
                                    <input
                                        type="text"
                                        name="coupon"
                                        className="form-control"
                                        placeholder={t('Enter Coupon Code')}
                                        value={formData.coupon}
                                        onChange={handleChange}
                                    />
                                    {errors.coupon && (
                                        <span className="text-danger">{errors.coupon}</span>
                                    )}
                                </div>
                            )}

                            <div className="col-md-12">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="acceptTerms"
                                            checked={formData.acceptTerms || false}
                                            onChange={handleChange}
                                            sx={{
                                                color: '#9F733C',
                                                '&.Mui-checked': {
                                                    color: '#65558F',
                                                },
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography component="span">
                                            {t('Accept')}{' '}
                                            <Link
                                                className="text-main"
                                                href={`/${locale}/privacy`}
                                                passHref
                                            >
                                                {t('Privacy Policy')}
                                            </Link>{' '}
                                            {t('and')}{' '}
                                            <Link
                                                className="text-main"
                                                href={`/${locale}/userTerms`}
                                                passHref
                                            >
                                                {t('Terms of usage')}
                                            </Link>
                                        </Typography>
                                    }
                                />
                            </div>
                            <div>
                                {errors.acceptTerms && (
                                    <span className={style.errorText}>{errors.acceptTerms}</span>
                                )}
                            </div>

                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <div>
                                    <p className={style.OrRegister}>
                                        {t('Or You can register as')}
                                        <Link
                                            className="text-main mx-1"
                                            href={`/${locale}/RegisterTourGuide`}
                                        >
                                            {t('Tour Guide')}
                                        </Link>
                                        {t('or')}
                                        <Link
                                            className="text-main mx-1"
                                            href={`/${locale}/RegisterAgency`}
                                        >
                                            {t('Agency')}
                                        </Link>
                                    </p>
                                </div>
                                <div>
                                    <div
                                        className={`${style.haveAccount} d-flex justify-content-center align-items-center `}
                                    >
                                        <p>{t('I already have an account?')}</p>
                                        <Link href={`/${locale}/login`}>{t('Sign In')}</Link>
                                    </div>
                                </div>
                            </div>

                            <div className={style.loginBtn}>
                                <button type="submit" disabled={isLoading}>
                                    <span>{isLoading ? t('submitting') : t('submit')}</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
