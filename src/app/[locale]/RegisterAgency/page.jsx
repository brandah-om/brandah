'use client';
import * as React from 'react';
import style from './RegisterAsAgencey.module.css';
import Link from 'next/link';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useLocale, useTranslations } from 'next-intl';
import NavBar from '@/components/navBar/NavBar';
import { useRouter } from 'next/navigation';
import { useRegisterAgencyMutation } from '@/store/register/RegisterAgencyApiSlice';
import { useGetCountriesQuery } from '@/store/Countries/CountriesSlice';
import { useGetCitiesQuery } from '@/store/Cities/CitiesSlice';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { useRegisterTransportationMutation } from '@/store/register/RegisterTransportationApiSlice';
import Loading from '@/components/Loading/Loading';
const RegisterAsAgency = () => {
    const t = useTranslations('HomePage');
    const router = useRouter();

    const locale = useLocale();
    const [registerAgency, { isLoading }] = useRegisterAgencyMutation();
    const [registerTransportation, { isLoading: isLoadingTrans }] =
        useRegisterTransportationMutation();
    const { data: countriesData } = useGetCountriesQuery(locale);
    const { data: citiesData } = useGetCitiesQuery(locale);

    const [formData, setFormData] = React.useState({
        name: '',
        contact_person: '',
        email: '',
        phone: '',
        license: '',
        password: '',
        password_confirmation: '',
        city_id: '',
        country_id: '',
        acceptTerms: false,
        registerAs: '',
    });

    const [errors, setErrors] = React.useState({
        name: '',
        contact_person: '',
        email: '',
        phone: '',
        license: '',
        password: '',
        password_confirmation: '',
        city_id: '',
        country_id: '',
    });

    const handleChange = e => {
        const { name, value, type, files, checked } = e.target;

        setFormData(prev => {
            let updatedData = {
                ...prev,
                [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
            };

            if (name === 'registerAs') {
                updatedData = {
                    ...updatedData,
                    license: '',
                };
            }

            return updatedData;
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'name is required';
        }
        if (!formData.contact_person) {
            newErrors.contact_person = 'contact person Name is required';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        }
        if (!formData.registerAs) {
            newErrors.registerAs = 'Register Type is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match';
        }
        if (!formData.license) {
            newErrors.license = 'license is required';
        }
        if (!formData.city_id) {
            newErrors.city_id = 'City is required';
        }
        if (!formData.country_id) {
            newErrors.country_id = 'Country is required';
        }
        if (!formData.acceptTerms) {
            newErrors.acceptTerms = 'You must accept the policy and terms';
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
        Object.keys(formData).forEach(key => {
            if (formData[key] !== '' && formData[key] !== null) {
                data.append(key, formData[key]);
            }
        });

        try {
            let result;
            if (formData.registerAs === 'Transportation') {
                result = await registerTransportation(data).unwrap();
            } else {
                result = await registerAgency(data).unwrap();
            }

            console.log('User Registered:', result);

            toast.success(result?.message || 'Registration Successful!', {
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

            setTimeout(() => {
                router.push(`/${locale}/otp`);
            }, 3000);
        } catch (err) {
            console.error('Registration Failed:', err);

            toast.error(err?.data?.message || 'Registration failed. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
            });
        }
    };

    return (
        <>
            <NavBar />
            <div className={style.agencyPage}>
                {(isLoading || isLoadingTrans) && <Loading />}
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className={style.registerAs}>
                                    Register as <span>Agency</span>
                                </p>
                                <p className={style.stayHere}>Tour the World, Start Here!</p>
                            </div>
                            <img className={style.logoImg} src="/navbar-logo.png" alt="logo" />
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 d-flex flex-column mb-3">
                                    <label className={`${style.label}`}>
                                        Agency Name <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="text"
                                        name="name"
                                        placeholder="Enter the name as in your national ID"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && (
                                        <span className={style.errorText}>{errors.name}</span>
                                    )}
                                </div>

                                <div className="col-md-6 d-flex flex-column mb-3">
                                    <label className={`${style.label}`}>
                                        Contact Person Name <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="text"
                                        name="contact_person"
                                        value={formData.contact_person}
                                        onChange={handleChange}
                                        placeholder="Enter the name as in your national ID"
                                    />
                                    {errors.contact_person && (
                                        <span className={style.errorText}>
                                            {errors.contact_person}
                                        </span>
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
                                        license <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="file"
                                        name="license"
                                        // value={formData.license}
                                        onChange={handleChange}
                                    />
                                    {errors.license && (
                                        <span className={style.errorText}>{errors.license}</span>
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

                                <div className="col-md-6 d-flex flex-column mb-3">
                                    <label className={`${style.label}`}>
                                        Register As <span>*</span>
                                    </label>
                                    <FormControl>
                                        <Select
                                            name="registerAs"
                                            value={formData.registerAs}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Agency">Agency</MenuItem>
                                            <MenuItem value="Transportation">
                                                Transportation
                                            </MenuItem>
                                        </Select>
                                    </FormControl>

                                    {errors.registerAs && (
                                        <span className={style.errorText}>{errors.registerAs}</span>
                                    )}
                                </div>

                                <div className="col-md-12 d-flex flex-column mb-3">
                                    <label className={`${style.label}`}>
                                        City of Residence <span>*</span>
                                    </label>
                                    <FormControl>
                                        <Select
                                            name="city_id"
                                            value={formData.city_id || ''}
                                            onChange={e =>
                                                setFormData(prev => ({
                                                    ...prev,
                                                    city_id: Number(e.target.value) || '',
                                                }))
                                            }
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {citiesData?.data?.map(city => (
                                                <MenuItem key={city.id} value={city.id}>
                                                    {city.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {errors.country_id && (
                                        <span className={style.errorText}>{errors.country_id}</span>
                                    )}
                                </div>

                                <div className="col-md-12 d-flex flex-column mb-3">
                                    <label className={`${style.label}`}>
                                        Country of Residence <span>*</span>
                                    </label>
                                    <FormControl>
                                        <Select
                                            name="country_id"
                                            value={formData.country_id || ''}
                                            onChange={e =>
                                                setFormData(prev => ({
                                                    ...prev,
                                                    country_id: Number(e.target.value) || '',
                                                }))
                                            }
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {countriesData?.data?.map(country => (
                                                <MenuItem key={country.id} value={country.id}>
                                                    {country.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {errors.country_id && (
                                        <span className={style.errorText}>{errors.country_id}</span>
                                    )}
                                </div>

                                <div className="col-md-6">
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

                                <div className="col-md-6 mt-1">
                                    <div className="d-flex justify-content-end align-items-center flex-wrap">
                                        <div>
                                            <div
                                                className={`${style.haveAccount} d-flex justify-content-center align-items-center `}
                                            >
                                                <p className="m-0 ms-2">I already have account?</p>
                                                <Link
                                                    className="text-main"
                                                    href={`/${locale}/login`}
                                                >
                                                    Sign In
                                                </Link>
                                            </div>
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
            </div>
        </>
    );
};

export default RegisterAsAgency;
