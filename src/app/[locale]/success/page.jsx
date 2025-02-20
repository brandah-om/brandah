'use client';
import React, { useEffect, useRef } from 'react';
import style from './success.module.css';
import NavBar from '@/components/navBar/NavBar';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useCheckPaymentStatusMutation } from '@/store/Booking/checkPaymentStatus';
import { useGetuserDataMutation } from '@/store/User/UserDataSlice';
import Cookies from 'js-cookie';
import { useLocale } from 'next-intl';

const SuccessPage = () => {
    const router = useRouter();
    const locale = useLocale();
    const [checkPaymentStatus] = useCheckPaymentStatusMutation();
    const [getUserData] = useGetuserDataMutation();
    const hasCheckedPayment = useRef(false);

    useEffect(() => {
        if (hasCheckedPayment.current) return;
        hasCheckedPayment.current = true;

        const sessionId = localStorage.getItem('session_id');

        if (!sessionId) {
            toast.error('Session ID not found!');
            router.push('/');
            return;
        }

        checkPaymentStatus(sessionId)
            .unwrap()
            .then(async res => {
                if (res.status === 'success' && res.payment_status === 'success') {
                    toast.success('Payment successful! Updating your account...', {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: 'colored',
                        style: { backgroundColor: '#B18D61', color: 'white' },
                    });

                    try {
                        const userData = await getUserData({}).unwrap();

                        Cookies.set('is_subscribed', 'true', { path: '/' });

                        router.push(`/${locale}/MyAccount`);
                    } catch (error) {
                        console.error('Failed to update user data:', error);
                        toast.error('Error updating your profile.');
                        router.push('/');
                    }
                } else {
                    toast.error('Payment failed! Redirecting to home...', {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: 'colored',
                        style: { backgroundColor: '#B18D61', color: 'white' },
                    });

                    setTimeout(() => {
                        router.push('/');
                    }, 3000);
                }
            })
            .catch(err => {
                console.error('Payment check failed:', err);
                toast.error('Error checking payment status.');
                router.push('/');
            });

        localStorage.removeItem('session_id');
    }, [router, checkPaymentStatus, getUserData]);

    return (
        <div>
            <NavBar />
            <div className={style.successPage}>
                <div className="container-fluid mb-5">
                    <div className="row">
                        <div className="col-md-12 text-center mb-3">
                            {/* <Box
                                sx={{
                                    backgroundColor: '#4CAF50',
                                    borderRadius: '50%',
                                    width: 120,
                                    height: 120,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CheckCircleOutlineIcon sx={{ color: 'white', fontSize: 60 }} />
                            </Box> */}
                            <img src="/navbar-logo.png" alt="logo" />
                            <h2 className="mt-3 text-main">Checking Payment Status...</h2>
                            <p className="mt-2">Please wait while we verify your payment.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
