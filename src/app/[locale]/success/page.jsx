'use client';
import React, { useEffect, useRef } from 'react';
import style from './success.module.css';
import NavBar from '../../../components/navBar/NavBar';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useGetuserDataMutation } from '../../../store/User/UserDataSlice';
import Cookies from 'js-cookie';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useLocale, useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
const SuccessPage = () => {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('HomePage');

    const [getUserData] = useGetuserDataMutation();

    useEffect(() => {
        toast.success(t('PaymentSuccess2'), {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
            style: { backgroundColor: '#B18D61', color: 'white' },
        });

        const fetchData = async () => {
            const previousPage = localStorage.getItem('previousPage');

            try {
                const response = await getUserData({}).unwrap();

                if (response.user?.is_subscribed === true) {
                    Cookies.set('is_subscribed', 'true', { path: '/' });
                } else {
                    router.push(`/${locale}/`);
                    return;
                }

                if (previousPage === 'RegisterTourist') {
                    router.push(`/${locale}/otp`);
                } else {
                    router.push(`/${locale}/MyAccount`);
                }

                localStorage.removeItem('previousPage');
            } catch (error) {
                console.error('Failed to update user data:', error);
                toast.error(t('ProfileUpdateError'));
                router.push(`/${locale}/`);
            }
        };

        fetchData();

        const timer = setTimeout(() => {
            // Redirect will be handled in fetchData
        }, 3000);

        return () => clearTimeout(timer);
    }, [router, locale, getUserData, t]);

    return (
        <div>
            <NavBar />
            <div className={style.successPage}>
                <div className="container-fluid mb-5">
                    <div className="row">
                        <div className="col-md-12 text-center mb-3">
                            <img src="/navbar-logo.png" alt="logo" />
                            <Box
                                sx={{
                                    borderRadius: '50%',
                                    width: '100%',
                                    height: 120,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CheckCircleOutlineIcon sx={{ color: '#9F733C', fontSize: 120 }} />
                            </Box>
                            {/* <h2 className="mt-3 text-main">{t('Checking Payment Status')}</h2> */}
                            {/* <p className="mt-2">{t('Please wait while we verify your payment')}</p> */}
                            <h2 className="mt-3 text-main">{t('PaymentSuccess2')}</h2>
                            <p className="text-muted">{t('willRedirect')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
