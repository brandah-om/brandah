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

        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = t('Name is required');
        }
        if (!formData.contact_person) {
            newErrors.contact_person = t('contact person Name is required');
        }
        if (!formData.email) {
            newErrors.email = t('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('Email is Not Valid');
        }
        if (!formData.phone) {
            newErrors.phone = t('Phone Number is required');
        }
        if (!formData.registerAs) {
            newErrors.registerAs = t('Register Type is required');
        }
        if (!formData.password) {
            newErrors.password = t('Password is required');
        }
        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = t('Passwords do not match');
        }
        if (!formData.license) {
            newErrors.license = t('license is required');
        }
        if (!formData.city_id) {
            newErrors.city_id = t('City is required');
        }
        if (!formData.country_id) {
            newErrors.country_id = t('Country is required');
        }
        if (!formData.acceptTerms) {
            newErrors.acceptTerms = t('You must accept the policy and terms');
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
                {isLoading && <Loading />}
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className={style.registerAs}>
                                    {t('Register as')} <span>{t('Agency')}</span>
                                </p>
                                <p className={style.stayHere}>{t('Tour the World, Start Here!')}</p>
                            </div>
                            <img className={style.logoImg} src="/navbar-logo.png" alt="logo" />
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 d-flex flex-column mb-3">
                                    <label className={style.label}>
                                        {t('Agency Name')} <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="text"
                                        name="name"
                                        placeholder={t('Enter the name as in your national ID')}
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && (
                                        <span className={style.errorText}>{errors.name}</span>
                                    )}
                                </div>

                                <div className="col-md-6 d-flex flex-column mb-3">
                                    <label className={style.label}>
                                        {t('Contact Person Name')} <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="text"
                                        name="contact_person"
                                        placeholder={t('Enter the name as in your national ID')}
                                        value={formData.contact_person}
                                        onChange={handleChange}
                                    />
                                    {errors.contact_person && (
                                        <span className={style.errorText}>
                                            {errors.contact_person}
                                        </span>
                                    )}
                                </div>

                                <div className="col-md-6 d-flex flex-column mb-3">
                                    <label className={style.label}>
                                        {t('Email')} <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="email"
                                        name="email"
                                        placeholder={t('Enter your preferred contact email')}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && (
                                        <span className={style.errorText}>{errors.email}</span>
                                    )}
                                </div>

                                <div className="col-md-6 d-flex flex-column mb-3">
                                    <label className={style.label}>
                                        {t('Phone Number')} <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="text"
                                        name="phone"
                                        placeholder={t('Enter your preferred contact number')}
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                    {errors.phone && (
                                        <span className={style.errorText}>{errors.phone}</span>
                                    )}
                                </div>

                                <div className="col-md-6 d-flex flex-column mb-3">
                                    <label className={style.label}>
                                        {t('License')} <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="file"
                                        name="license"
                                        onChange={handleChange}
                                    />
                                    {errors.license && (
                                        <span className={style.errorText}>{errors.license}</span>
                                    )}
                                </div>

                                <div className="col-md-6 d-flex flex-column mb-3">
                                    <label className={style.label}>
                                        {t('Password')} <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="password"
                                        name="password"
                                        placeholder="*******"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    {errors.password && (
                                        <span className={style.errorText}>{errors.password}</span>
                                    )}
                                </div>

                                <div className="col-md-6 d-flex flex-column mb-3">
                                    <label className={style.label}>
                                        {t('Confirm password')} <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="password"
                                        name="password_confirmation"
                                        placeholder="*******"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
                                    />
                                    {errors.password_confirmation && (
                                        <span className={style.errorText}>
                                            {errors.password_confirmation}
                                        </span>
                                    )}
                                </div>

                                <div className="col-md-6 d-flex flex-column mb-3">
                                    <label className={style.label}>
                                        {t('Register As')} <span>*</span>
                                    </label>
                                    <FormControl>
                                        <Select
                                            name="registerAs"
                                            value={formData.registerAs}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>{t('None')}</em>
                                            </MenuItem>
                                            <MenuItem value="Agency">{t('Agency')}</MenuItem>
                                            <MenuItem value="Transportation">
                                                {t('Transportation')}
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    {errors.registerAs && (
                                        <span className={style.errorText}>{errors.registerAs}</span>
                                    )}
                                </div>

                                <div className="col-md-12 d-flex flex-column mb-3">
                                    <label className={style.label}>
                                        {t('Country of Residence')} <span>*</span>
                                    </label>
                                    <FormControl>
                                        <Select
                                            name="country_id"
                                            value={formData.country_id || ''}
                                            onChange={e => handleChange(e)}
                                        >
                                            <MenuItem value="">
                                                <em>{t('None')}</em>
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
                                            />
                                        }
                                        label={
                                            <Typography component="span">
                                                {t('Accept')}{' '}
                                                <Link
                                                    className="text-main"
                                                    href={`/${locale}/privacy`}
                                                >
                                                    {t('Privacy Policy')}
                                                </Link>{' '}
                                                {t('and')}{' '}
                                                <Link
                                                    className="text-main"
                                                    href={`/${locale}/userTerms`}
                                                >
                                                    {t('Terms of usage')}
                                                </Link>
                                            </Typography>
                                        }
                                    />
                                </div>
                                <div>
                                    {errors.acceptTerms && (
                                        <span className={style.errorText}>
                                            {errors.acceptTerms}
                                        </span>
                                    )}
                                </div>

                                <div className={style.loginBtn}>
                                    <button type="submit" disabled={isLoading}>
                                        <span>{isLoading ? t('Submitting...') : t('Submit')}</span>
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
