import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Loading from '../../../../components/Loading/Loading';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import style from '../MyAccount.module.css';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useCreatePaymentSessionMutation } from '../../../../store/Booking/PaymentSlice';
import { useGetPaymentMethodQuery } from '../../../../store/PaymentMethods/PaymentMethodsSlice';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
const UserBookings = ({ data, isLoading, error }) => {
    console.log('data is', data);
    const userData = data?.user;
    const tripData = data?.trip_bookings;
    const guideData = data?.tour_guide_bookings;
    console.log('guideData is', guideData);

    const [tabIndex, setTabIndex] = useState(0);
    const t = useTranslations('HomePage');
    const locale = useLocale();
    const router = useRouter();

    const [formData, setFormData] = React.useState({
        method_payment: '',
    });

    const [errors, setErrors] = useState({});

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

    const [createPaymentSession, { isloading: paymentLoading }] = useCreatePaymentSessionMutation();

    const handlePayTrip = async bookingId => {
        try {
            const selectedBooking = tripData.find(booking => booking.id === bookingId);

            if (!selectedBooking) {
                toast.error(t('Booking not found'), {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                });
                return;
            }

            const newPaymentData = new FormData();
            newPaymentData.append('amount', selectedBooking.total_amount);
            newPaymentData.append('product_name', selectedBooking.trip_name);
            // newPaymentData.append('success_url', 'http://localhost:3000/en/success');
            // newPaymentData.append('failed_url', 'http://localhost:3000/en/fail');
            newPaymentData.append('success_url', 'https://brandah.vercel.app/en/success');
            newPaymentData.append('failed_url', 'https://brandah.vercel.app/en/fail');
            newPaymentData.append('book_type', 'trip');
            newPaymentData.append('book_id', selectedBooking.id);
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

    const handlePayGuide = async bookingId => {
        try {
            const selectedBooking = guideData.find(guide => guide.id === bookingId);

            if (!selectedBooking) {
                toast.error(t('Booking not found'), {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                });
                return;
            }

            const newPaymentData = new FormData();
            newPaymentData.append('amount', selectedBooking.total_amount);
            newPaymentData.append('product_name', selectedBooking.tour_guide_name);
            // newPaymentData.append('success_url', 'http://localhost:3000/en/success');
            // newPaymentData.append('failed_url', 'http://localhost:3000/en/fail');
            // newPaymentData.append('success_url', 'https://brandah.vercel.app/en/success');
            // newPaymentData.append('failed_url', 'https://brandah.vercel.app/en/fail');
            newPaymentData.append('success_url', 'https://brandah-om.com/en/success');
            newPaymentData.append('failed_url', 'https://brandah-om.com/en/fail');
            newPaymentData.append('book_type', 'tour_guide');
            newPaymentData.append('book_id', selectedBooking.id);
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
        <>
            <div className="row">
                {paymentLoading && <Loading />}
                <Tabs
                    value={tabIndex}
                    onChange={(_, newValue) => setTabIndex(newValue)}
                    variant="fullWidth"
                    className="mb-3"
                    sx={{
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#B18D61',
                        },
                        '& .MuiTab-root': {
                            color: '#B18D61',
                            fontWeight: 'bold',
                        },
                        '& .Mui-selected': {
                            color: '#B18D61 !important',
                        },
                    }}
                >
                    <Tab label={t('Trip Bookings')} />
                    <Tab label={t('Tour Guide Bookings')} />
                </Tabs>
            </div>

            {isLoading ? (
                <Loading />
            ) : error ? (
                <p>{t('Error loading Data')}</p>
            ) : (
                <>
                    <div className="card p-3 shadow">
                        {tabIndex === 0 && (
                            <div className="row">
                                {data?.trip_bookings?.length ? (
                                    data.trip_bookings.map(booking => (
                                        <div className="col-md-6 mb-3" key={booking.id}>
                                            <Card sx={{ boxShadow: 3 }} className="h-100">
                                                <CardContent>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        <strong className="text-main">
                                                            ⭐ {t('Trip Name')}:
                                                        </strong>{' '}
                                                        {booking.trip_name || 'trip name'}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        <strong className="text-main">
                                                            💰 {t('Total Price')}:
                                                        </strong>{' '}
                                                        {booking.total_amount} $
                                                    </Typography>

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        <strong className="text-main">
                                                            ⏳ {t('Status')}:
                                                        </strong>{' '}
                                                        {booking.status}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        <strong className="text-main">
                                                            🕒 {t('Date')}:
                                                        </strong>{' '}
                                                        {new Date(
                                                            booking.created_at
                                                        ).toLocaleDateString()}
                                                    </Typography>
                                                    {booking.status === 'PENDING' && (
                                                        <div>
                                                            <button
                                                                className={style.payBtn}
                                                                onClick={() =>
                                                                    handlePayTrip(booking.id)
                                                                }
                                                            >
                                                                {t('Pay Now')}
                                                            </button>
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <p className="text-muted">{t('No Bookings Found')}</p>
                                        <div className={style.bookLink}>
                                            <Link href={`/${locale}/trips`}>
                                                {t('Book a Trip Now')}
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {tabIndex === 1 && (
                            <div className="row">
                                {data?.tour_guide_bookings?.length ? (
                                    data.tour_guide_bookings.map(guide => (
                                        <div className="col-md-6 mb-3" key={guide.id}>
                                            <Card className="shadow-md h-100">
                                                <CardContent>
                                                    <Typography variant="body2">
                                                        <strong className="text-main">
                                                            {t('Tour Guide Name')}:
                                                        </strong>{' '}
                                                        {guide.tour_guide_name}
                                                    </Typography>
                                                    <Typography color="text.secondary">
                                                        <strong className="text-main">
                                                            {t('From')}:
                                                        </strong>{' '}
                                                        {guide.from_date}
                                                    </Typography>
                                                    <Typography color="text.secondary">
                                                        <strong className="text-main">
                                                            {t('To')}:
                                                        </strong>{' '}
                                                        {guide.to_date}
                                                    </Typography>
                                                    <Typography color="text.secondary">
                                                        <strong className="text-main">
                                                            {t('Total Days')}:
                                                        </strong>{' '}
                                                        {guide.total_days}
                                                    </Typography>
                                                    <Typography color="text.secondary">
                                                        <strong className="text-main">
                                                            {t('Price')}:
                                                        </strong>{' '}
                                                        ${guide.price}
                                                    </Typography>
                                                    <Typography color="text.secondary">
                                                        <strong className="text-main">
                                                            {t('Total Amount')}:
                                                        </strong>{' '}
                                                        ${guide.total_amount}
                                                    </Typography>
                                                    <Typography
                                                        color={
                                                            guide.status === 'confirmed'
                                                                ? 'success.main'
                                                                : 'error.main'
                                                        }
                                                    >
                                                        {t('Status')}: {guide.status}
                                                    </Typography>
                                                    {guide.status === 'confirmed' && (
                                                        <div>
                                                            <div
                                                                data-aos="fade-up"
                                                                className="col-md-12 d-flex flex-column my-3"
                                                            >
                                                                <label className={`${style.label}`}>
                                                                    {t('Payment Method')}{' '}
                                                                    <span>*</span>
                                                                </label>
                                                                <FormControl>
                                                                    <Select
                                                                        name="method_payment"
                                                                        className={
                                                                            style.contactInput
                                                                        }
                                                                        value={
                                                                            formData.method_payment ||
                                                                            ''
                                                                        }
                                                                        onChange={e =>
                                                                            setFormData(prev => ({
                                                                                ...prev,
                                                                                method_payment:
                                                                                    Number(
                                                                                        e.target
                                                                                            .value
                                                                                    ) || '',
                                                                            }))
                                                                        }
                                                                    >
                                                                        <MenuItem value="">
                                                                            <em>{t('Select')}</em>
                                                                        </MenuItem>
                                                                        {paymentData?.data?.map(
                                                                            pay => (
                                                                                <MenuItem
                                                                                    key={pay.id}
                                                                                    value={pay.id}
                                                                                >
                                                                                    <div className="d-flex justify-content-between align-items-center w-100 px-4">
                                                                                        <p className="m-0">
                                                                                            {
                                                                                                pay.name
                                                                                            }
                                                                                        </p>
                                                                                        <img
                                                                                            className={
                                                                                                style.paypalImg
                                                                                            }
                                                                                            src={
                                                                                                pay.image
                                                                                            }
                                                                                            alt="Payment Method"
                                                                                        />
                                                                                    </div>
                                                                                </MenuItem>
                                                                            )
                                                                        )}
                                                                    </Select>
                                                                </FormControl>
                                                                {errors.method_payment && (
                                                                    <span
                                                                        className={style.errorText}
                                                                    >
                                                                        {errors.method_payment}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <button
                                                                className={style.payBtn}
                                                                onClick={() =>
                                                                    handlePayGuide(guide.id)
                                                                }
                                                            >
                                                                {t('Pay Now')}
                                                            </button>
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <p className="text-muted">{t('No Bookings Found')}</p>
                                        <div className={style.bookLink}>
                                            <Link href={`/${locale}/tourguide`}>
                                                {t('Book a Tour Guide Now')}
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default UserBookings;
