'use client';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './otp.module.css';
import NavBar from '@/components/navBar/NavBar';
import { Vujahday_Script } from 'next/font/google';
import { useVerifyOtpMutation } from '@/store/register/VerifyOtpApiSlice';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const Page = () => {
    const [verifyOtp, { isLoading, error }] = useVerifyOtpMutation();
    const [errors, setErrors] = useState('');
    const router = useRouter();
    const locale = useLocale();


    const [formData, setFormData] = useState({
        email: '',
        otp: '',
    });

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
            email: formData.email ? '' : 'Email is required',
            otp: formData.otp
                ? formData.otp.length > 6
                    ? 'OTP must be 6 digits'
                    : ''
                : 'OTP is required',
        };

        setErrors(newErrors);

        if (newErrors.email || newErrors.otp) {
            return;
        }

        const data = new FormData();
        for (const key in formData) {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        }

        try {
            const result = await verifyOtp(data).unwrap();
            console.log('Email verified:', result);

            toast.success(result?.message || 'Verify Successful!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
                style: {
                    backgroundColor: '#B18D61',
                    color: 'white',
                },
            });
            setErrors('');

            setTimeout(() => {
                router.push(`/${locale}/login`);
            }, 3000);
        } catch (err) {
            console.error('Verify Failed:', err);

            toast.error(err?.data?.message || 'Verify failed', {
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
        <div>
            <NavBar />
            <ToastContainer />
            <div className={style.otpPage}>
                <div className={style.otpBg}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 text-center text-white mt-3">
                                <h4 className={vujahday.className}>
                                    Dream, Explore, Discover Your Travel Begins Here
                                </h4>
                                <h4 className={`${vujahday.className} mt-2`}>Verify Your Email</h4>
                            </div>
                            <div className={`${style.rightBox} col-md-6 m-auto mt-3`}>
                                <form onSubmit={handleSubmit}>
                                    <div className={`${style.box} row`}>
                                        <div className="col-md-12 d-flex flex-column mb-3">
                                            <label className={`${style.label}`}>
                                                Email <span>*</span>
                                            </label>
                                            <input
                                                className={style.contactInput}
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                // required
                                                placeholder="Enter your email"
                                            />
                                            {errors.email && (
                                                <span className={style.errorText}>
                                                    {errors.email}
                                                </span>
                                            )}
                                        </div>

                                        <div className="col-md-12 d-flex flex-column mb-3">
                                            <label className={`${style.label}`}>
                                                Otp Number <span>*</span>
                                            </label>
                                            <input
                                                className={style.contactInput}
                                                type="text"
                                                name="otp"
                                                value={formData.otp}
                                                onChange={handleChange}
                                                // required
                                                placeholder="Enter Otp Number From Your Email"
                                            />
                                            {errors.otp && (
                                                <span className={style.errorText}>
                                                    {errors.otp}
                                                </span>
                                            )}
                                        </div>

                                        <div className={style.loginBtn}>
                                            <button type="submit" disabled={isLoading}>
                                                <span>{isLoading ? 'Verifying...' : 'Verify'}</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
