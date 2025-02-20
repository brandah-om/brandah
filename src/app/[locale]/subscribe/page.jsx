'use client';
import NavBar from '@/components/navBar/NavBar';
import React, { useEffect, useState } from 'react';
import style from './subscripePage.module.css';
import { useGetPaymentMethodQuery } from '@/store/PaymentMethods/PaymentMethodsSlice';
import { useLocale, useTranslations } from 'next-intl';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Aos from 'aos';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useBookTripMutation } from '@/store/Booking/TripBookingSlice';
import { useCreatePaymentSessionMutation } from '@/store/Booking/PaymentSlice';
import { useCreateSubscribeMutation } from '@/store/Booking/SubscribeSlice';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
const page = () => {
    const locale = useLocale();
    const router = useRouter();

    useEffect(() => {
        Aos.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);

    const [tabIndex, setTabIndex] = useState(0);
    const t = useTranslations('HomePage');

    const breadcrumbs = [{ label: t('Home'), href: '/' }, { label: t('Subscribe') }];

    const [createSubscribe, { isLoading }] = useCreateSubscribeMutation();
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

    const handleChange = e => {
        const { name, value, type, files, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        // const token = localStorage.getItem('token');
        // if (!token) {
        //     Swal.fire({
        //         text: 'You need to log in to book a trip',
        //         showCancelButton: true,
        //         confirmButtonText: 'Login',
        //         cancelButtonText: 'Cancel',
        //         confirmButtonColor: '#B18D61',
        //     }).then(result => {
        //         if (result.isConfirmed) {
        //             const currentPath = window.location.pathname;
        //             router.push(`/${locale}/login?redirect=${encodeURIComponent(currentPath)}`);
        //         }
        //     });
        //     return;
        // }

        const newErrors = {};
        if (!formData.first_name) newErrors.first_name = 'First name is required!';
        if (!formData.last_name) newErrors.last_name = 'Last name is required!';
        if (!formData.email) newErrors.email = 'Email is required!';
        if (!formData.contact_phone) newErrors.contact_phone = 'Phone number is required!';
        if (!formData.method_payment) newErrors.method_payment = 'Payment Method is required!';

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
            console.log(couponId);

            const newPaymentData = new FormData();
            newPaymentData.append('amount', 1);
            newPaymentData.append('product_name', 'username');
            newPaymentData.append('success_url', 'http://localhost:3000/en/');
            newPaymentData.append('failed_url', 'http://localhost:3000/en/fail');
            // newPaymentData.append('success_url', 'https://brandah.vercel.app/en/');
            // newPaymentData.append('failed_url', 'https://brandah.vercel.app/en/fail');
            newPaymentData.append('book_type', 'trip');
            newPaymentData.append('book_id', couponId);

            const paymentResult = await createPaymentSession(newPaymentData).unwrap();

            if (paymentResult?.data?.payment_url) {
                localStorage.setItem('session_id', paymentResult.data.session_id);

                toast.success(
                    'Payment session created successfully! Redirecting to payment page...',
                    {
                        style: {
                            backgroundColor: '#74B634',
                            color: 'white',
                        },
                    }
                );

                window.location.href = paymentResult.data.payment_url;
            }
        } catch (err) {
            const errorMessage =
                err?.data?.message ||
                err?.message ||
                'Booking or Payment failed! Please try again.';

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

    const handleCoupon = async e => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.coupon_id) newErrors.coupon_id = 'Brochure number is required!';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
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
                                <Tab
                                    sx={{
                                        color: '#B18D61',
                                        '&.Mui-selected': {
                                            color: '#FFFFFF',
                                            backgroundColor: '#B18D61',
                                        },
                                    }}
                                    label="Subscribe"
                                />
                                <Tab
                                    sx={{
                                        color: '#B18D61',
                                        '&.Mui-selected': {
                                            color: '#FFFFFF',
                                            backgroundColor: '#B18D61',
                                        },
                                    }}
                                    label="Have Brochure"
                                />
                            </Tabs>
                        </div>

                        {tabIndex === 0 && (
                            <div className="row">
                                <div
                                    data-aos="fade-up"
                                    className="col-md-6 d-flex flex-column mb-3"
                                >
                                    <label className={`${style.label}`}>
                                        First Name <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        placeholder="Enter the name as in your national ID"
                                    />
                                    {errors.first_name && (
                                        <span className={style.errorText}>{errors.first_name}</span>
                                    )}
                                </div>
                                <div
                                    data-aos="fade-up"
                                    className="col-md-6 d-flex flex-column mb-3"
                                >
                                    <label className={`${style.label}`}>
                                        Last Name <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        placeholder="Enter the name as in your national ID"
                                    />
                                    {errors.last_name && (
                                        <span className={style.errorText}>{errors.last_name}</span>
                                    )}
                                </div>
                                <div
                                    data-aos="fade-up"
                                    className="col-md-6 d-flex flex-column mb-3"
                                >
                                    <label className={`${style.label}`}>
                                        email <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your preferred contact email"
                                    />
                                    {errors.email && (
                                        <span className={style.errorText}>{errors.email}</span>
                                    )}
                                </div>
                                <div
                                    data-aos="fade-up"
                                    className="col-md-6 d-flex flex-column mb-3"
                                >
                                    <label className={`${style.label}`}>
                                        Phone Number <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="text"
                                        name="contact_phone"
                                        value={formData.contact_phone}
                                        onChange={handleChange}
                                        placeholder="Enter your preferred contact number"
                                    />
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
                                        Payment Method <span>*</span>
                                    </label>
                                    <FormControl>
                                        <Select
                                            name="method_payment"
                                            value={formData.method_payment || ''}
                                            onChange={e =>
                                                setFormData(prev => ({
                                                    ...prev,
                                                    method_payment: Number(e.target.value) || '',
                                                }))
                                            }
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {paymentData?.data?.map(pay => (
                                                <MenuItem key={pay.id} value={pay.id}>
                                                    <div className="d-flex justify-content-between align-items-center w-100">
                                                        <p className="m-0">{pay.name}</p>
                                                        <img
                                                            className={style.paypalImg}
                                                            src={pay.image}
                                                            alt=""
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
                                        <span>{isLoading ? 'Submitting...' : 'Submit'}</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {tabIndex === 1 && (
                            <div className="row">
                                <div
                                    data-aos="fade-up"
                                    className="col-md-6 d-flex flex-column mb-3"
                                >
                                    <label className={`${style.label}`}>
                                        Brochure Number <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="text"
                                        name="coupon_id"
                                        value={formData.coupon_id}
                                        onChange={handleChange}
                                        placeholder="Enter the Brochure Number"
                                    />
                                    {errors.coupon_id && (
                                        <span className={style.errorText}>{errors.coupon_id}</span>
                                    )}
                                </div>

                                <div className={style.loginBtn}>
                                    <button onClick={handleCoupon} disabled={isLoading}>
                                        <span>{isLoading ? 'Sending...' : 'Send'}</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
