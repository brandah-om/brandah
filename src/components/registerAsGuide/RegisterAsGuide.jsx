import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import style from './registerAsGuide.module.css';
import { Merriweather } from 'next/font/google';
import Link from 'next/link';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { useRouter } from 'next/navigation';
import { useRegisterTourGuideMutation } from '@/store/register/RegisterTourGuideApiSlice';
import { useLocale, useTranslations } from 'next-intl';
import { useGetCountriesQuery } from '@/store/Countries/CountriesSlice';
import { useGetGuideLanguageQuery } from '@/store/languages/GuideLanguageSlice';
import { useGetCitiesQuery } from '@/store/Cities/CitiesSlice';
import Typography from '@mui/material/Typography';
import Loading from '@/components/Loading/Loading';
import { toast } from 'react-toastify';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const RegisterAsGuide = ({
    openRegisterGuide,
    handleClickOpenRegisterGuide,
    handleCloseRegisterGuide,
}) => {
    const t = useTranslations('HomePage');
    const router = useRouter();
    const locale = useLocale();

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
            newErrors.first_name = t('First name is required');
        }
        if (!formData.last_name) {
            newErrors.last_name = t('Last name is required');
        }
        if (!formData.email) {
            newErrors.email = t('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('Email is invalid');
        }
        if (!formData.phone) {
            newErrors.phone = t('Phone number is required');
        }
        if (!formData.password) {
            newErrors.password = t('Password is required');
        }
        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = t('Passwords do not match');
        }
        if (!formData.license) {
            newErrors.license = t('License is required');
        }
        if (!formData.image) {
            newErrors.image = t('Image is required');
        }
        if (!formData.city_id) {
            newErrors.city_id = t('City is required');
        }
        if (!formData.country_id) {
            newErrors.country_id = t('Country is required');
        }
        if (!formData.languages.length) {
            newErrors.languages = t('At least one language is required');
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
            console.log(t('User Registered'), result);

            toast.success(result?.message || t('Registration Successful!'), {
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
            handleCloseRegisterGuide();
            setTimeout(() => {
                router.push(`/${locale}/otp`);
            }, 3000);
        } catch (err) {
            console.error(t('Registration failed'), err);

            toast.error(err?.data?.message || t('Registration failed'), {
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
        <React.Fragment>
            <Button onClick={handleClickOpenRegisterGuide} className={style.navbarLink}>
                {t('Register As Tour Guide')}
            </Button>
            <BootstrapDialog
                onClose={handleCloseRegisterGuide}
                aria-labelledby="customized-dialog-title"
                open={openRegisterGuide}
                fullWidth
                maxWidth="md"
            >
                <IconButton
                    aria-label="close"
                    onClick={handleCloseRegisterGuide}
                    sx={theme => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    {isLoading && <Loading />}
                    <div className="container">
                        <div className="row">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className={style.registerAs}>
                                        {t('Register as')} <span>{t('Tour Guide')}</span>
                                    </p>
                                    <p className={style.stayHere}>
                                        {t('Tour the World, Start Here!')}
                                    </p>
                                </div>
                                <img className={style.logoImg} src="/navbar-logo.png" alt="logo" />
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            {t('First Name')} <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="text"
                                            name="first_name"
                                            placeholder={t('Enter the name as in your national ID')}
                                            value={formData.first_name}
                                            onChange={handleChange}
                                        />
                                        {errors.first_name && (
                                            <span className={style.errorText}>
                                                {errors.first_name}
                                            </span>
                                        )}
                                    </div>

                                    <div className="col-md-6 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            {t('Last Name')} <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="text"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            placeholder={t('Enter the name as in your national ID')}
                                        />
                                        {errors.last_name && (
                                            <span className={style.errorText}>
                                                {errors.last_name}
                                            </span>
                                        )}
                                    </div>

                                    <div className="col-md-6 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            {t('Email')} <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder={t('Enter your preferred contact email')}
                                        />
                                        {errors.email && (
                                            <span className={style.errorText}>{errors.email}</span>
                                        )}
                                    </div>

                                    <div className="col-md-6 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            {t('Phone Number')} <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder={t('Enter your preferred contact number')}
                                        />
                                        {errors.phone && (
                                            <span className={style.errorText}>{errors.phone}</span>
                                        )}
                                    </div>

                                    <div className="col-md-6 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            {t('License')} <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="file"
                                            name="license"
                                            onChange={handleChange}
                                        />
                                        {errors.license && (
                                            <span className={style.errorText}>
                                                {errors.license}
                                            </span>
                                        )}
                                    </div>

                                    <div className="col-md-6 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            {t('Photo')} <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="file"
                                            name="image"
                                            onChange={handleChange}
                                        />
                                        {errors.image && (
                                            <span className={style.errorText}>{errors.image}</span>
                                        )}
                                    </div>

                                    <div className="col-md-6 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            {t('Password')} <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="*******"
                                        />
                                        {errors.password && (
                                            <span className={style.errorText}>
                                                {errors.password}
                                            </span>
                                        )}
                                    </div>

                                    <div className="col-md-6 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            {t('Confirm password')} <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="password"
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
                                            {t('Languages')} <span>*</span>
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
                                            renderInput={params => (
                                                <TextField
                                                    {...params}
                                                    placeholder={t('Select languages')}
                                                />
                                            )}
                                        />
                                        {errors.languages && (
                                            <span className={style.errorText}>
                                                {errors.languages}
                                            </span>
                                        )}
                                    </div>

                                    <div className="col-md-12 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            {t('City of Residence')} <span>*</span>
                                        </label>
                                        <FormControl>
                                            <Select
                                                name="city_id"
                                                value={formData.city_id || ''}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="">
                                                    <em>{t('None')}</em>
                                                </MenuItem>
                                                {citiesData?.data?.map(city => (
                                                    <MenuItem key={city.id} value={city.id}>
                                                        {city.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {errors.city_id && (
                                            <span className={style.errorText}>
                                                {errors.city_id}
                                            </span>
                                        )}
                                    </div>

                                    <div className="col-md-12 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            {t('Country of Residence')} <span>*</span>
                                        </label>
                                        <FormControl>
                                            <Select
                                                name="country_id"
                                                value={formData.country_id || ''}
                                                onChange={handleChange}
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
                                            <span className={style.errorText}>
                                                {errors.country_id}
                                            </span>
                                        )}
                                    </div>

                                    <div className={style.loginBtn}>
                                        <button type="submit" disabled={isLoading}>
                                            <span>
                                                {isLoading ? t('Submitting...') : t('Submit')}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
};

export default RegisterAsGuide;
