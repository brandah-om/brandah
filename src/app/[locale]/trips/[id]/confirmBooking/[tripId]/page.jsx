'use client';
import React, { useEffect, useState } from 'react';
import style from './confirm.module.css';
import NavBar from '@/components/navBar/NavBar';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Aos from 'aos';
import Typography from '@mui/material/Typography';
import { useGetTripsBtIdQuery } from '@/store/trips/TripsDetailsSlice';
import { useBookTripMutation } from '@/store/Booking/TripBookingSlice';
import { useGetPaymentMethodQuery } from '@/store/PaymentMethods/PaymentMethodsSlice';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Loading from '@/components/Loading/Loading';
import { useGetCountriesQuery } from '@/store/Countries/CountriesSlice';
import { useCreatePaymentSessionMutation } from '@/store/Booking/PaymentSlice';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const page = ({ params }) => {
    const { id } = params;
    const locale = useLocale();
    const router = useRouter();
    const t = useTranslations('HomePage');
    const { data, error, isLoading: isLoadingData } = useGetTripsBtIdQuery({ id, lang: locale });
    const trip = data?.data;
    const priceData = trip?.prices?.[0];
    // const min = priceData?.min ?? 1;
    // const max = priceData?.max ?? 10;

    React.useEffect(() => {
        const storedFirstName = localStorage.getItem('firstName') || '';
        const storedLastName = localStorage.getItem('lastName') || '';
        const storedEmail = localStorage.getItem('email') || '';
        const storedPhone = localStorage.getItem('phone') || '';

        setFormData(prev => ({
            ...prev,
            first_name: storedFirstName,
            last_name: storedLastName,
            email: storedEmail,
            contact_phone: storedPhone !== 'undefined' ? storedPhone : '',
        }));
    }, []);

    const breadcrumbs = [
        { label: t('Home'), href: `/${locale}/` },
        { label: t('Trips'), href: `/${locale}/trips` },
        { label: trip?.name || '', href: `/${locale}/trips/${id}` },
        { label: t('Confirm booking') },
    ];

    useEffect(() => {
        Aos.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);

    const [counter, setCounter] = useState(1);

    const handleIncrement = () => {
        setCounter(prev => prev + 1);
    };

    const handleDecrement = () => {
        setCounter(prev => (prev > 1 ? prev - 1 : 1));
    };

    const { data: countriesData } = useGetCountriesQuery(locale);
    const { data: paymentData } = useGetPaymentMethodQuery(locale);

    useEffect(() => {
        if (paymentData?.data?.length) {
            const thawani = paymentData.data.find(pay => pay.name === 'Thawani');
            if (thawani) {
                setFormData(prev => ({
                    ...prev,
                    method_payment: thawani.id,
                }));
            }
        }
    }, [paymentData]);

    useEffect(() => {
        if (trip?.prices?.length) {
            setFormData(prev => ({
                ...prev,
                total_price: trip.prices[0].id,
            }));
        }
    }, [trip]);

    const [BookTrip, { isLoading }] = useBookTripMutation();
    const [createPaymentSession, { isLoading: isLoadingPayment, error: paymentError }] =
        useCreatePaymentSessionMutation();

    const [formData, setFormData] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        contact_phone: '',
        total_price: '',
        // from_date: '',
        // to_date: '',
        country_id: '',
        method_payment: '',
        acceptTerms: false,
    });

    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const { name, value, type, files, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
        }));
    };

    const handleCountryChange = (event, newValue) => {
        setFormData(prev => ({
            ...prev,
            country_id: newValue ? newValue.id : '',
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({
                text: 'You need to log in to book a trip',
                showCancelButton: true,
                confirmButtonText: 'Login',
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#B18D61',
            }).then(result => {
                if (result.isConfirmed) {
                    const currentPath = window.location.pathname;
                    router.push(`/${locale}/login?redirect=${encodeURIComponent(currentPath)}`);
                }
            });
            return;
        }

        if (!trip?.id) {
            alert('Trip ID is missing!');
            return;
        }

        const priceData = trip?.prices?.[0];
        if (!priceData) {
            alert('Price data is not available!');
            return;
        }

        const newErrors = {};
        if (!formData.first_name) newErrors.first_name = t('First name is required');
        if (!formData.last_name) newErrors.last_name = t('Last name is required');
        if (!formData.email) newErrors.email = t('Email is required');
        if (!formData.contact_phone) newErrors.contact_phone = t('Phone number is required');
        if (!formData.country_id) newErrors.country_id = t('Country is required');
        if (!formData.method_payment) newErrors.method_payment = t('Payment Method is required');
        if (!formData.total_price) newErrors.total_price = t('price is required');
        if (!formData.acceptTerms)
            newErrors.acceptTerms = t('You must accept the policy and terms');

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const bookingData = {
            price_id: priceData.id,
            trip_id: trip.id,
            person_number: counter,
            first_name: formData.first_name,
            last_name: formData.last_name,
            contact_phone: formData.contact_phone,
            email: formData.email,
            country_id: formData.country_id,
            method_payment: formData.method_payment,
            total_price: formData.total_price,
            // total_price: counter * priceData.standard_price,
        };

        try {
            const response = await BookTrip({ id: trip.id, userData: bookingData }).unwrap();
            console.log(response);
            const bookId = response?.data.id;
            const total_amount = response?.data.total_amount;
            console.log(bookId);

            const newPaymentData = new FormData();
            newPaymentData.append('amount', total_amount);
            newPaymentData.append('product_name', trip?.name || 'Trip Package');
            // newPaymentData.append('success_url', 'http://localhost:3000/en/success');
            // newPaymentData.append('failed_url', 'http://localhost:3000/en/fail');
            newPaymentData.append('success_url', 'https://brandah.vercel.app/en/success');
            newPaymentData.append('failed_url', 'https://brandah.vercel.app/en/fail');
            newPaymentData.append('book_type', 'trip');
            newPaymentData.append('book_id', bookId);

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
            const errorMessage = err?.data?.message || err?.message || t('PaymentFail');

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

    return (
        <div>
            <NavBar />
            <div className={style.hireGuide}>
                {(isLoading || isLoadingPayment) && <Loading />}
                <div className={style.hireBody}>
                    <DynamicBreadcrumbs items={breadcrumbs} />
                    <div className="container-fluid mt-4">
                        <div className="row">
                            <div className="col-md-7 mb-2">
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <div className="row">
                                            <label className={`${style.label}`}>
                                                {t('Number Of People')} <span>*</span>
                                            </label>
                                            <div className="col-md-3 d-flex align-items-center justify-content-between mt-3">
                                                <button
                                                    onClick={handleDecrement}
                                                    disabled={counter === 1}
                                                    className="btn-outline-primary-main"
                                                >
                                                    -
                                                </button>
                                                <span className={style.counterNumber}>
                                                    {counter}
                                                </span>
                                                <button
                                                    onClick={handleIncrement}
                                                    // disabled={counter === 100}
                                                    className="btn-primary-main"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

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
                                            placeholder={t('Enter the name as in your national ID')}
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
                                            placeholder={t('Enter the name as in your national ID')}
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
                                            placeholder={t('Enter your preferred contact email')}
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
                                            {t('Phone Number')} <span>*</span>
                                        </label>
                                        {/* <input
                                            className={style.contactInput}
                                            type="text"
                                            name="contact_phone"
                                            value={formData.contact_phone}
                                            onChange={handleChange}
                                            placeholder={t('Enter your preferred contact number')}
                                        /> */}
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
                                        className="col-md-12 d-flex flex-column mb-3"
                                    >
                                        <label className="mb-2">
                                            {t('Country of residence')} <span>*</span>
                                        </label>
                                        <Autocomplete
                                            options={countriesData?.data || []}
                                            getOptionLabel={option => option.name}
                                            value={
                                                countriesData?.data.find(
                                                    country => country.id === formData.country_id
                                                ) || null
                                            }
                                            onChange={handleCountryChange}
                                            renderInput={params => (
                                                <TextField
                                                    {...params}
                                                    label={t('Select Country')}
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                        {errors.country_id && (
                                            <span className={style.errorText}>
                                                {errors.country_id}
                                            </span>
                                        )}
                                    </div>

                                    <div
                                        data-aos="fade-up"
                                        className="col-md-6 d-flex flex-column mb-3"
                                    >
                                        <label className={`${style.label}`}>
                                            {t('Packages Price')} <span>*</span>
                                        </label>
                                        <FormControl>
                                            <Select
                                                name="total_price"
                                                className={style.selectInput}
                                                value={formData.total_price || ''}
                                                onChange={e =>
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        total_price: Number(e.target.value) || '',
                                                    }))
                                                }
                                            >
                                                <MenuItem value="">
                                                    <em>{t('Select')}</em>
                                                </MenuItem>
                                                {trip?.prices?.map(price => (
                                                    <MenuItem key={price.id} value={price.id}>
                                                        <div className="d-flex justify-content-between align-items-center w-100 px-4">
                                                            <p className="m-0">{price.degree}</p>
                                                            <p className="m-0">
                                                                {price.standard_price}
                                                            </p>
                                                        </div>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {errors.total_price && (
                                            <span className={style.errorText}>
                                                {errors.total_price}
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
                                                className={style.selectInput}
                                                name="method_payment"
                                                value={formData.method_payment || ''}
                                                onChange={e =>
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        method_payment:
                                                            Number(e.target.value) || '',
                                                    }))
                                                }
                                            >
                                                <MenuItem value="">
                                                    <em>{t('Select')}</em>
                                                </MenuItem>
                                                {paymentData?.data?.map(pay => (
                                                    <MenuItem key={pay.id} value={pay.id}>
                                                        <div className="d-flex justify-content-between align-items-center w-100 px-4">
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

                                    <div data-aos="fade-up" className="col-md-12">
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
                                        <div>
                                            {errors.acceptTerms && (
                                                <span className={style.errorText}>
                                                    {errors.acceptTerms}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className={style.loginBtn}>
                                        <button onClick={handleSubmit} disabled={isLoading}>
                                            <span>{isLoading ? t('submitting') : t('Submit')}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-4 mb-2">
                                <h4 className={`${style.label}`}>{t('Trip Details')}</h4>
                                <div className="card p-4">
                                    <div className={style.guideImgBox}>
                                        <img
                                            data-aos="fade-up"
                                            src="/homepage/top-trip/1.jpeg"
                                            alt="tripImg"
                                        />
                                        <div data-aos="fade-up" className={style.guideBoxCaption}>
                                            <h6>{trip?.name || ''}</h6>
                                        </div>
                                    </div>

                                    <div data-aos="fade-up" className={style.cardBody}>
                                        <h6>{t('Price')}</h6>
                                        {trip?.prices?.map(price => (
                                            <p key={price.id}>{price.standard_price} $</p>
                                        ))}
                                    </div>

                                    {/* <div className="d-flex justify-content-between align-items-center">
                                        <div data-aos="fade-up" className={style.cardBody}>
                                            <h6>Minimum</h6>
                                            {trip?.prices?.map(price => (
                                                <p key={price.id}>{price.min} person</p>
                                            ))}
                                        </div>

                                        <div data-aos="fade-up" className={style.cardBody}>
                                            <h6>Maximum</h6>
                                            {trip?.prices?.map(price => (
                                                <p key={price.id}>{price.max} person</p>
                                            ))}
                                        </div>
                                    </div> */}

                                    <div data-aos="fade-up" className={style.cardBody}>
                                        <h6>{t('description')}</h6>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: trip?.description,
                                            }}
                                        ></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Newsletter /> */}
        </div>
    );
};

export default page;
