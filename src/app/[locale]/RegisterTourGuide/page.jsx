'use client';
import * as React from 'react';
import style from './registerTourGuide.module.css';
import Link from 'next/link';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import NavBar from '@/components/navBar/NavBar';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useRegisterTourGuideMutation } from '@/store/register/RegisterTourGuideApiSlice';
import { useLocale, useTranslations } from 'next-intl';
import { useGetCountriesQuery } from '@/store/Countries/CountriesSlice';
import { useGetGuideLanguageQuery } from '@/store/languages/GuideLanguageSlice';
import { useGetCitiesQuery } from '@/store/Cities/CitiesSlice';
import Typography from '@mui/material/Typography';
import Loading from '@/components/Loading/Loading';

const RegisterAsGuide = () => {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('HomePage');

    const [registerTourGuide, { isLoading }] = useRegisterTourGuideMutation();
    const { data: countriesData } = useGetCountriesQuery(locale);
    const { data: citiesData } = useGetCitiesQuery(locale);
    const { data: languageData } = useGetGuideLanguageQuery();

    const [formData, setFormData] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        license: '',
        password: '',
        password_confirmation: '',
        city_id: '',
        country_id: '',
        image: '',
        languages: [],
    });

    const [errors, setErrors] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        license: '',
        password: '',
        password_confirmation: '',
        image: '',
        city_id: '',
        country_id: '',
        languages: '',
    });

    const handleChange = e => {
        const { name, value, type, files } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.first_name) {
            newErrors.first_name = 'First name is required';
        }
        if (!formData.last_name) {
            newErrors.last_name = 'Last name is required';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
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
        if (!formData.image) {
            newErrors.image = 'image is required';
        }
        if (!formData.city_id) {
            newErrors.city_id = 'City is required';
        }
        if (!formData.country_id) {
            newErrors.country_id = 'Country is required';
        }
        if (!formData.languages.length) {
            newErrors.languages = 'At least one language is required';
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

        if (Array.isArray(formData.languages) && formData.languages.length > 0) {
            formData.languages.forEach(lang => {
                if (lang.id) {
                    data.append('languages[]', lang.id);
                }
            });
        } else {
            console.warn('Languages array is empty or undefined!');
        }

        for (const key in formData) {
            if (key === 'image' || key === 'license') {
                if (formData[key] instanceof File) {
                    data.append(key, formData[key]);
                }
            } else if (key !== 'languages' && formData[key]) {
                data.append(key, formData[key]);
            }
        }

        try {
            const result = await registerTourGuide(data).unwrap();
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

    const uniqueLanguages = languageData?.data
        ? [...new Map(languageData.data.map(item => [item.id, item])).values()]
        : [];

    return (
        <>
            <NavBar />
            {/* <ToastContainer /> */}
            <div className={style.registerPage}>
                {isLoading && <Loading />}
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className={style.registerAs}>
                                    Register as <span>Tour Guide</span>
                                </p>
                                <p className={style.stayHere}>Tour the World, Start Here!</p>
                            </div>
                            <img className={style.logoImg} src="/navbar-logo.png" alt="logo" />
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
                                        Photo <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="file"
                                        name="image"
                                        onChange={handleChange}
                                    />
                                    {/* {previewImage && (
                                        <img src={previewImage} alt="Preview" width="100" />
                                    )} */}
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

                                <div className="col-md-12 d-flex flex-column mb-3">
                                    <label className={`${style.label}`}>
                                        Languages <span>*</span>
                                    </label>
                                    <Autocomplete
                                        multiple
                                        id="checkboxes-tags-demo"
                                        options={uniqueLanguages}
                                        disableCloseOnSelect
                                        getOptionLabel={option => option.name}
                                        isOptionEqualToValue={(option, value) =>
                                            option.id === value.id
                                        }
                                        onChange={(event, newValue) => {
                                            setFormData(prev => ({
                                                ...prev,
                                                languages: newValue.map(lang => lang.id),
                                            }));
                                        }}
                                        renderOption={(props, option, { selected }, index) => (
                                            <li {...props} key={`lang-${option.id}-${index}`}>
                                                <Checkbox checked={selected} />
                                                {option.name}
                                            </li>
                                        )}
                                        renderInput={params => (
                                            <TextField {...params} placeholder="Select languages" />
                                        )}
                                    />

                                    {errors.languages && (
                                        <span className={style.errorText}>{errors.languages}</span>
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

export default RegisterAsGuide;
