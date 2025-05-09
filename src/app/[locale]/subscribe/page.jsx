'use client';
import NavBar from '../../../components/navBar/NavBar';
import React, { useEffect, useState } from 'react';
import style from './subscripePage.module.css';
import { useGetPaymentMethodQuery } from '../../../store/PaymentMethods/PaymentMethodsSlice';
import { useLocale, useTranslations } from 'next-intl';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Aos from 'aos';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DynamicBreadcrumbs from '../../../components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useCreatePaymentSessionMutation } from '../../../store/Booking/PaymentSlice';
import { useCreateSubscribeMutation } from '../../../store/Booking/SubscribeSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading/Loading';
import { useCreateApplyCodeMutation } from '../../../store/Booking/ApplyCodeUserSlice';
import { useGetuserDataMutation } from '../../../store/User/UserDataSlice';
import Cookies from 'js-cookie';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const page = () => {
    const locale = useLocale();
    const router = useRouter();
    const token = localStorage.getItem('token');

    useEffect(() => {
        Aos.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);

    const [tabIndex, setTabIndex] = useState(0);
    const t = useTranslations('HomePage');

    const breadcrumbs = [{ label: t('Home'), href: `/${locale}/` }, { label: t('Subscribe') }];

    const [createSubscribe, { isLoading, error }] = useCreateSubscribeMutation();
    const [createPaymentSession, { isLoading: isLoadingPayment, error: paymentError }] =
        useCreatePaymentSessionMutation();

    const [formData, setFormData] = React.useState(() => {
        return {
            first_name: localStorage.getItem('firstName') || '',
            last_name: localStorage.getItem('lastName') || '',
            email: localStorage.getItem('email') || '',
            contact_phone: localStorage.getItem('phone') || '',
            method_payment: '',
        };
    });
    const [errors, setErrors] = useState({});
    const { data: paymentData } = useGetPaymentMethodQuery(locale);

    // useEffect(() => {
    //     if (paymentData?.data?.length) {
    //         const Oman_Arab_Bank = paymentData.data.find(pay => pay.name === 'Oman Arab Bank');
    //         if (Oman_Arab_Bank) {
    //             setFormData(prev => ({
    //                 ...prev,
    //                 method_payment: Oman_Arab_Bank.id,
    //             }));
    //         }
    //     }
    // }, [paymentData]);

    useEffect(() => {
        if (paymentData?.data?.length) {
            const firstPaymentMethod = paymentData.data[0];
            if (firstPaymentMethod) {
                setFormData(prev => ({
                    ...prev,
                    method_payment: firstPaymentMethod.id,
                }));
            }
        }
    }, [paymentData]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const firstName = localStorage.getItem('firstName');
            const lastName = localStorage.getItem('lastName');
            const email = localStorage.getItem('email');
            const phone = localStorage.getItem('phone');

            if (firstName && lastName && email && phone) {
                setFormData(prevState => ({
                    ...prevState,
                    email: email || '',
                    name: `${firstName} ${lastName}` || '',
                    phone: phone || '',
                }));
            } else {
                console.warn('Missing user data in localStorage');
            }
        }
    }, []);
    const handleChange = e => {
        const { name, value, type, files, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.first_name) newErrors.first_name = t('First name is required');
        if (!formData.last_name) newErrors.last_name = t('Last name is required');
        if (!formData.email) newErrors.email = t('Email is required');
        if (!formData.contact_phone) newErrors.contact_phone = t('Phone Number is required');
        if (!formData.method_payment) newErrors.method_payment = t('Payment Method is required');

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const bookingData = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            contact_phone: formData.contact_phone,
            email: formData.email,
            method_payment: formData.method_payment,
        };

        try {
            const response = await createSubscribe({ userData: bookingData }).unwrap();
            const couponId = response.coupon_id;
            const amountId = response.amount;
            console.log(couponId);
            console.log(amountId);

            const newPaymentData = new FormData();
            newPaymentData.append('amount', amountId);
            newPaymentData.append('product_name', 'username');
            // newPaymentData.append('success_url', 'http://localhost:3000/en/success');
            // newPaymentData.append('failed_url', 'http://localhost:3000/en/fail');
            // newPaymentData.append('success_url', 'https://brandah.vercel.app/en/success');
            // newPaymentData.append('failed_url', 'https://brandah.vercel.app/en/fail');
            newPaymentData.append('success_url', 'https://brandah-om.com/en/success');
            newPaymentData.append('failed_url', 'https://brandah-om.com/en/fail');
            newPaymentData.append('book_type', 'subscription');
            newPaymentData.append('book_id', couponId);
            newPaymentData.append('gateway_id', formData.method_payment);

            const paymentResult = await createPaymentSession(newPaymentData).unwrap();

            if (paymentResult?.data?.payment_url) {
                localStorage.setItem('session_id', paymentResult.data.session_id);

                toast.success(
                    t('Payment session created successfully! Redirecting to payment page'),
                    {
                        position: locale === 'ar' ? 'top-left' : 'top-right',
                        autoClose: 3000,
                        theme: 'colored',
                        rtl: locale === 'ar',
                        style: { backgroundColor: '#B18D61', color: 'white' },
                        progressStyle: { direction: locale === 'ar' ? 'rtl' : 'ltr' },
                    }
                );
                window.location.href = paymentResult.data.payment_url;
            }
        } catch (err) {
            const errorMessage =
                err?.data?.message || err?.message || t('Payment failed Please try again');

            toast.error(errorMessage, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
            });
            console.error('Error:', err);
        }
    };

    const [createApplyCode, { isLoading: CouponLoading, error: CouponError }] =
        useCreateApplyCodeMutation();
    const [getUserData] = useGetuserDataMutation();

    const [formDataCoupon, setFormDataCoupon] = useState({ coupon: '' });
    const [errorsCoupon, setErrorsCoupon] = useState({});

    const handleChangeCoupon = e => {
        setFormDataCoupon({ ...formDataCoupon, [e.target.name]: e.target.value });
        setErrorsCoupon({ ...errorsCoupon, [e.target.name]: '' });
    };

    const handleCoupon = async e => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error(t('You need to login first'), {
                position: locale === 'ar' ? 'top-left' : 'top-right',
                autoClose: 3000,
                theme: 'colored',
                rtl: locale === 'ar',
                style: { backgroundColor: '#C64E4E', color: 'white' },
                progressStyle: { direction: locale === 'ar' ? 'rtl' : 'ltr' },
            });

            setTimeout(() => {
                router.push(`/${locale}/login`);
            }, 3000);
            return;
        }

        const newErrors = {};
        if (!formDataCoupon.coupon) {
            newErrors.coupon = t('Brochure number is required');
            setErrorsCoupon(newErrors);
            return;
        }

        try {
            const response = await createApplyCode(formDataCoupon).unwrap();
            toast.success(response.message || t('Coupon applied successfully'), {
                position: locale === 'ar' ? 'top-left' : 'top-right',
                autoClose: 3000,
                theme: 'colored',
                rtl: locale === 'ar',
                style: { backgroundColor: '#B18D61', color: 'white' },
                progressStyle: { direction: locale === 'ar' ? 'rtl' : 'ltr' },
            });

            const userDataResponse = await getUserData({}).unwrap();

            const isSubscribed = userDataResponse?.user?.is_subscribed;

            if (typeof isSubscribed !== 'undefined') {
                Cookies.set('is_subscribed', isSubscribed.toString(), { expires: 7, path: '/' });
            }

            setTimeout(() => {
                router.push(`/${locale}`);
            }, 3000);
        } catch (err) {
            console.error('Error:', err);
            toast.error(err?.data?.message || t('Failed to apply the Coupon'), {
                position: locale === 'ar' ? 'top-left' : 'top-right',
                autoClose: 3000,
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
            <div className={style.subscribePage}>
                <div className="px-lg-4 px-1">
                    <DynamicBreadcrumbs items={breadcrumbs} />
                </div>

                <div className="container mb-5">
                    <div className="row">
                        <div className="row my-4">
                            <Tabs
                                value={tabIndex}
                                onChange={(_, newValue) => setTabIndex(newValue)}
                                variant="fullWidth"
                                className="mb-3"
                                sx={{
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: '#000 !important',
                                    },
                                    '& .MuiTab-root': {
                                        color: '#B18D61',
                                        fontWeight: 'bold',
                                    },
                                }}
                            >
                                {/* {token ? ( */}
                                <Tab
                                    sx={{
                                        color: '#B18D61',
                                        '&.Mui-selected': {
                                            color: '#FFFFFF',
                                            backgroundColor: '#B18D61',
                                        },
                                    }}
                                    label={t('Subscribe')}
                                />
                                {/* ) : ( */}
                                <Tab
                                    sx={{
                                        color: '#B18D61',
                                        '&.Mui-selected': {
                                            color: '#FFFFFF',
                                            backgroundColor: '#B18D61',
                                        },
                                    }}
                                    label={t('Have Brochure')}
                                />
                                {/* )} */}
                            </Tabs>
                        </div>

                        {isLoading || isLoadingPayment || CouponLoading ? (
                            <Loading />
                        ) : error ? (
                            <p>{t('Error loading Data')}</p>
                        ) : (
                            <>
                                {/* {token */}
                                {tabIndex === 1 && (
                                    <div className="row">
                                        <div
                                            data-aos="fade-up"
                                            className="col-md-6 d-flex flex-column mb-3"
                                        >
                                            <label className={`${style.label}`}>
                                                {t('Brochure Number')} <span>*</span>
                                            </label>
                                            <input
                                                className={style.contactInput}
                                                type="text"
                                                name="coupon"
                                                value={formDataCoupon.coupon}
                                                onChange={handleChangeCoupon}
                                                placeholder={t('Enter the Brochure Number')}
                                            />
                                            {errorsCoupon.coupon && (
                                                <span className={style.errorText}>
                                                    {errorsCoupon.coupon}
                                                </span>
                                            )}
                                        </div>
                                        <div className={style.loginBtn}>
                                            <button onClick={handleCoupon} disabled={CouponLoading}>
                                                <span>
                                                    {CouponLoading ? t('Sending') : t('Send')}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {/* // : tabIndex === 0 && ( */}
                                {tabIndex === 0 && (
                                    <div className="row">
                                        <div
                                            data-aos="fade-up"
                                            className="col-md-6 d-flex flex-column mb-3"
                                        >
                                            <label className={`${style.label}`}>
                                                {t('First Name')} <span>*</span>
                                            </label>
                                            <input
                                                className={style.contactInput}
                                                type="text"
                                                name="first_name"
                                                value={formData.first_name}
                                                onChange={handleChange}
                                                placeholder={t(
                                                    'Enter the name as in your national ID'
                                                )}
                                            />
                                            {errors.first_name && (
                                                <span className={style.errorText}>
                                                    {errors.first_name}
                                                </span>
                                            )}
                                        </div>
                                        <div
                                            data-aos="fade-up"
                                            className="col-md-6 d-flex flex-column mb-3"
                                        >
                                            <label className={`${style.label}`}>
                                                {t('Last Name')} <span>*</span>
                                            </label>
                                            <input
                                                className={style.contactInput}
                                                type="text"
                                                name="last_name"
                                                value={formData.last_name}
                                                onChange={handleChange}
                                                placeholder={t(
                                                    'Enter the name as in your national ID'
                                                )}
                                            />
                                            {errors.last_name && (
                                                <span className={style.errorText}>
                                                    {errors.last_name}
                                                </span>
                                            )}
                                        </div>
                                        <div
                                            data-aos="fade-up"
                                            className="col-md-6 d-flex flex-column mb-3"
                                        >
                                            <label className={`${style.label}`}>
                                                {t('Email')} <span>*</span>
                                            </label>
                                            <input
                                                className={style.contactInput}
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder={t(
                                                    'Enter your preferred contact email'
                                                )}
                                            />
                                            {errors.email && (
                                                <span className={style.errorText}>
                                                    {errors.email}
                                                </span>
                                            )}
                                        </div>
                                        <div
                                            data-aos="fade-up"
                                            className="col-md-6 d-flex flex-column mb-3"
                                        >
                                            <label className={`${style.label}`}>
                                                {t('Phone Number')} <span>*</span>
                                            </label>

                                            <div className="d-flex align-items-center">
                                                <PhoneInput
                                                    international
                                                    defaultCountry="OM"
                                                    value={formData.contact_phone}
                                                    onChange={value =>
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            contact_phone: value,
                                                        }))
                                                    }
                                                    className={`${style.contactInput} w-100`}
                                                    placeholder={t(
                                                        'Enter your preferred contact number'
                                                    )}
                                                />
                                            </div>
                                            {errors.contact_phone && (
                                                <span className={style.errorText}>
                                                    {errors.contact_phone}
                                                </span>
                                            )}
                                        </div>

                                        <div
                                            data-aos="fade-up"
                                            className="col-md-6 d-flex flex-column mb-3"
                                        >
                                            <label className={`${style.label}`}>
                                                {t('Payment Method')} <span>*</span>
                                            </label>
                                            <FormControl>
                                                <Select
                                                    name="method_payment"
                                                    value={formData.method_payment || ''}
                                                    onChange={e =>
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            method_payment:
                                                                Number(e.target.value) || '',
                                                        }))
                                                    }
                                                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                                    sx={{
                                                        '& .MuiSelect-select': {
                                                            textAlign:
                                                                locale === 'ar' ? 'right' : 'left',
                                                            direction:
                                                                locale === 'ar' ? 'rtl' : 'ltr',
                                                        },
                                                        '& .MuiSvgIcon-root': {
                                                            transform:
                                                                locale === 'ar'
                                                                    ? 'scaleX(-1)'
                                                                    : 'none',
                                                            [locale === 'ar'
                                                                ? 'left'
                                                                : 'right']: 10,
                                                            [locale === 'ar' ? 'right' : 'left']:
                                                                'auto',
                                                        },
                                                        '& .MuiMenuItem-root': {
                                                            direction:
                                                                locale === 'ar' ? 'rtl' : 'ltr',
                                                            justifyContent:
                                                                locale === 'ar'
                                                                    ? 'flex-end'
                                                                    : 'flex-start',
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em
                                                            style={{
                                                                textAlign:
                                                                    locale === 'ar'
                                                                        ? 'right'
                                                                        : 'left',
                                                                width: '100%',
                                                            }}
                                                        >
                                                            {t('Select')}
                                                        </em>{' '}
                                                    </MenuItem>
                                                    {paymentData?.data?.map(pay => (
                                                        <MenuItem key={pay.id} value={pay.id}>
                                                            <div
                                                                className="d-flex justify-content-between align-items-center w-100 px-4"
                                                                style={{
                                                                    direction:
                                                                        locale === 'ar'
                                                                            ? 'rtl'
                                                                            : 'ltr',
                                                                    textAlign:
                                                                        locale === 'ar'
                                                                            ? 'right'
                                                                            : 'left',
                                                                }}
                                                            >
                                                                <p className="m-0">{pay.name}</p>
                                                                <img
                                                                    className={style.paypalImg}
                                                                    src={pay.image}
                                                                    alt="Payment Method"
                                                                />
                                                            </div>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            {errors.method_payment && (
                                                <span className={style.errorText}>
                                                    {errors.method_payment}
                                                </span>
                                            )}
                                        </div>
                                        <div className={style.loginBtn}>
                                            <button onClick={handleSubmit} disabled={isLoading}>
                                                <span>
                                                    {isLoading ? t('Submitting') : t('Submit')}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
