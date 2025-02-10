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
import { useLocale } from 'next-intl';

const RegisterPage = () => {
    const router = useRouter();
    const locale = useLocale();
    const [previewImage, setPreviewImage] = React.useState(null);

    const [registerTourist, { isLoading, error }] = useRegisterTouristMutation();

    const [formData, setFormData] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        national_id: '',
        password: '',
        password_confirmation: '',
        image: null,
    });

    const [errors, setErrors] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        national_id: '',
        password: '',
        password_confirmation: '',
        image: '',
    });

    const handleChange = e => {
        const { name, value, type, files } = e.target;
        if (type === 'file' && files.length > 0) {
            setPreviewImage(URL.createObjectURL(files[0]));
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        for (const key in formData) {
            if (!formData[key] && key !== 'image') {
                newErrors[key] = `${key.replace('_', ' ')} is required`;
            }
        }

        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match';
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
            <ToastContainer />
            <div className={style.registerPage}>
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className={style.registerAs}>
                                    Register as <span>Tourist</span>
                                </p>
                                <p className={style.stayHere}>Tour the World, Start Here!</p>
                            </div>
                            <img className={style.logoImg} src="/navbar-logo.png" alt="logo" />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 d-flex flex-column mb-3">
                                <label className={`${style.label}`}>
                                    First Name <span>*</span>
                                </label>
                                <input
                                    className={style.contactInput}
                                    type="text"
                                    name="first_name"
                                    placeholder="Enter the name as in your national ID"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                                {errors.first_name && (
                                    <span className={style.errorText}>{errors.first_name}</span>
                                )}
                            </div>

                            <div className="col-md-6 d-flex flex-column mb-3">
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

                            <div className="col-md-6 d-flex flex-column mb-3">
                                <label className={`${style.label}`}>
                                    Email <span>*</span>
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

                            <div className="col-md-6 d-flex flex-column mb-3">
                                <label className={`${style.label}`}>
                                    Phone Number <span>*</span>
                                </label>
                                <input
                                    className={style.contactInput}
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your preferred contact number"
                                />
                                {errors.phone && (
                                    <span className={style.errorText}>{errors.phone}</span>
                                )}
                            </div>

                            <div className="col-md-6 d-flex flex-column mb-3">
                                <label className={`${style.label}`}>
                                    National ID <span>*</span>
                                </label>
                                <input
                                    className={style.contactInput}
                                    type="text"
                                    name="national_id"
                                    value={formData.national_id}
                                    onChange={handleChange}
                                    placeholder="Enter your national number"
                                />
                                {errors.national_id && (
                                    <span className={style.errorText}>{errors.national_id}</span>
                                )}
                            </div>

                            <div className="col-md-6 d-flex flex-column mb-3">
                                <label className={`${style.label}`}>
                                    Photo <span>*</span>
                                </label>
                                <input
                                    className={style.contactInput}
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                />
                                {previewImage && (
                                    <img src={previewImage} alt="Preview" width="100" />
                                )}
                                {errors.image && (
                                    <span className={style.errorText}>{errors.image}</span>
                                )}
                            </div>

                            <div className="col-md-6 d-flex flex-column mb-3">
                                <label className={`${style.label}`}>
                                    Password <span>*</span>
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

                            <div className="col-md-6 d-flex flex-column mb-3">
                                <label className={`${style.label}`}>
                                    Confirm password <span>*</span>
                                </label>
                                <input
                                    className={style.contactInput}
                                    type="Password"
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
                                            defaultChecked
                                            sx={{
                                                color: '#9F733C',
                                                '&.Mui-checked': {
                                                    color: '#65558F',
                                                },
                                            }}
                                        />
                                    }
                                    label="Accept Policy and usage terms"
                                />
                            </div>

                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <div>
                                    <p className={style.OrRegister}>
                                        Or You can register as
                                        <Link className="text-main mx-1" href="/RegisterTourGuide">
                                            Tour Guide
                                        </Link>
                                        or
                                        <Link className="text-main mx-1" href="/">
                                            Agency
                                        </Link>
                                    </p>
                                </div>
                                <div>
                                    <div
                                        className={`${style.haveAccount} d-flex justify-content-center align-items-center `}
                                    >
                                        <p>I already have an account?</p>
                                        <Link href="/login">Sign In</Link>
                                    </div>
                                </div>
                            </div>

                            <div className={style.loginBtn}>
                                <button type="submit" disabled={isLoading}>
                                    <span>{isLoading ? 'Submitting...' : 'Submit'}</span>
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
