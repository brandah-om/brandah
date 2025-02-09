'use client';
import * as React from 'react';
import style from './login.module.css';
import Link from 'next/link';
import NavBar from '@/components/navBar/NavBar';
import { toast, ToastContainer } from 'react-toastify';
import { useLoginMutation } from '@/store/login/LoginApiSlice';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();

    const [login, { isLoading, error }] = useLoginMutation();

    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = React.useState({
        email: '',
        password: '',
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // تحقق من صحة كلمة المرور
        if (!formData.password) {
            newErrors.password = 'Password is required';
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
            const result = await login(data).unwrap();
            console.log('User signing in:', result);

            toast.success(result?.message || 'Sign in Successful!', {
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

            localStorage.setItem('token', result.token);
            localStorage.setItem('firstName', result.user.first_name);

            setTimeout(() => {
                router.push('/');
            }, 3000);
        } catch (err) {
            console.error('Signing in Failed:', err);

            toast.error(err?.data?.message || 'Sign in failed', {
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
            <ToastContainer />
            <div className={style.loginPage}>
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-center">
                            <img className={style.logoImg} src="/white-logo.png" alt="" />
                        </div>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-8 m-auto d-flex flex-column">
                                    <label className={`${style.label}`}>
                                        Email <span style={{ color: '#f00;' }}>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter Your Email"
                                    />
                                    {errors.email && (
                                        <span className={style.errorText}>{errors.email}</span>
                                    )}
                                </div>
                                <div className="col-md-8 m-auto d-flex flex-column mt-3">
                                    <label className={`${style.label}`}>
                                        Password <span style={{ color: '#f00;' }}>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="*******"
                                    />
                                    {errors.password && (
                                        <span className={style.errorText}>{errors.password}</span>
                                    )}
                                </div>
                                <div className="col-md-8 m-auto">
                                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                                        <div>
                                            <p className={`${style.notHaveAccount} mt-4`}>
                                                Don’t have account?
                                                <Link href="/">sign up</Link>
                                            </p>
                                        </div>
                                        <div>
                                            <Link href="/" className={style.forgetPass}>
                                                Forgot password?
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8 m-auto">
                                    <div className={style.loginBtn}>
                                        <button type="submit" disabled={isLoading}>
                                            <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
