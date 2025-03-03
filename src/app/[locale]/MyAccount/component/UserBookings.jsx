import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Loading from '@/components/Loading/Loading';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import style from '../MyAccount.module.css';
import { toast } from 'react-toastify';
import { useBookTripMutation } from '@/store/Booking/TripBookingSlice';
import { useRouter } from 'next/navigation';

const UserBookings = ({ data, isLoading, error }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const t = useTranslations('HomePage');
    const locale = useLocale();
    const router = useRouter();

    const [BookTrip] = useBookTripMutation();
    const handlePayment = async (bookData, price, productName) => {
        try {
            const response = await BookTrip(bookData).unwrap();
            console.log(response);
            const bookId = response?.data.id;
            console.log(bookId);

            const newPaymentData = new FormData();
            newPaymentData.append('amount', price.toString());
            newPaymentData.append('product_name', productName);
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
            const errorMessage =
                err?.data?.message || err?.message || t('Payment failed! Please try again');

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
                                            <Card sx={{ boxShadow: 3 }}>
                                                <CardContent>
                                                    {/* <Typography variant="h6">
                                                {booking.contact_name}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                📧 {booking.contact_email}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                📞 {booking.contact_phone}
                                            </Typography> */}
                                                    <Typography variant="body1">
                                                        <strong className="text-main">
                                                            💰 {t('Total Price')}:
                                                        </strong>{' '}
                                                        {booking.total_amount} $
                                                    </Typography>
                                                    <Typography color="text.secondary">
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
                                                            <Link
                                                                className={style.payBtn}
                                                                href={`/${locale}/trips/${booking.package_id}/confirmBooking/${booking.package_id}`}
                                                            >
                                                                {t('Pay Now')}
                                                            </Link>
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
                                            <Card className="shadow-md">
                                                <CardContent>
                                                    <Typography variant="text.secondary">
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
                                                    {/* {guide.status === 'PENDING' && (
                                                        <div>
                                                            <Link
                                                                className={style.payBtn}
                                                                href={`/${locale}/tourguide/${guide.package_id}/hireTourGuide`}
                                                            >
                                                                {t('Pay Now')}
                                                            </Link>
                                                        </div>
                                                    )} */}
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
