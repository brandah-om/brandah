'use client';
import * as React from 'react';
import style from './register.module.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useRegisterTouristMutation } from '@/store/register/RegisterTouristApiSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '@/components/navBar/NavBar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import Typography from '@mui/material/Typography';
import Loading from '@/components/Loading/Loading';
const RegisterPage = () => {
    const router = useRouter();
    const locale = useLocale();
    // const [previewImage, setPreviewImage] = React.useState(null);
    const t = useTranslations('HomePage');

    const [registerTourist, { isLoading, error }] = useRegisterTouristMutation();

    const [formData, setFormData] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        // national_id: '',
        password: '',
        password_confirmation: '',
        // image: null,
    });

    const [errors, setErrors] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        // national_id: '',
        password: '',
        password_confirmation: '',
        // image: '',
    });

    // const handleChange = e => {
    //     const { name, value, type, files } = e.target;
    //     if (type === 'file' && files.length > 0) {
    //         setPreviewImage(URL.createObjectURL(files[0]));
    //     }

    //     setFormData(prev => ({
    //         ...prev,
    //         [name]: type === 'file' ? files[0] : value,
    //     }));
    // };

    const handleChange = e => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        Object.entries(formData).forEach(([key, value]) => {
            if (!value) {
                newErrors[key] = `${key.replace('_', ' ')} is required`;
            }
        });

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
            const result = await registerTourist(data).unwrap();
            console.log('User Registered:', result);

            toast.success(result?.message || 'Registration Successful!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                style: {
                    backgroundColor: '#B18D61',
                    color: 'white',
                },
            });

            setTimeout(() => {
                router.push(`/${locale}/otp`);
            }, 3000);
        } catch (err) {
            console.error('Registration Failed:', err);

            toast.error(err?.data?.message || 'Registration failed', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                style: {
                    backgroundColor: '#C64E4E',
                    color: 'white',
                },
            });
        }
    };

    return (
        <>
            <NavBar />
            {/* <ToastContainer /> */}

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
                                    placeholder={t('Enter the name as in your national ID')}
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
                                    placeholder={t('Enter the name as in your national ID')}
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
                                <input
                                    className={style.contactInput}
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder={t('Enter your preferred contact number')}
                                />
                                {errors.phone && (
                                    <span className={style.errorText}>{errors.phone}</span>
                                )}
                            </div>

                            <div className="col-md-6 d-flex flex-column mb-3">
                                <label className={`${style.label}`}>
                                    {t('Password')} <span>*</span>
                                </label>
                                <input
                                    className={style.contactInput}
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="*******"
                                />
                                {errors.password && (
                                    <span className={style.errorText}>{errors.password}</span>
                                )}
                            </div>

                            <div className="col-md-6 d-flex flex-column mb-3">
                                <label className={`${style.label}`}>
                                    {t('Confirm password')} <span>*</span>
                                </label>
                                <input
                                    className={style.contactInput}
                                    type="password"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    placeholder="*******"
                                />
                                {errors.password_confirmation && (
                                    <span className={style.errorText}>
                                        {errors.password_confirmation}
                                    </span>
                                )}
                            </div>

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
