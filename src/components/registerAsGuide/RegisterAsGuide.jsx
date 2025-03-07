import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import style from './registerAsGuide.module.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { useRegisterTourGuideMutation } from '@/store/register/RegisterTourGuideApiSlice';
import { useLocale, useTranslations } from 'next-intl';
import { useGetCountriesQuery } from '@/store/Countries/CountriesSlice';
import { useGetGuideLanguageQuery } from '@/store/languages/GuideLanguageSlice';
import { useGetCitiesQuery } from '@/store/Cities/CitiesSlice';
import Loading from '@/components/Loading/Loading';
import { toast } from 'react-toastify';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

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
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prevState => !prevState);
    };

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

    const handleCountryChange = (event, newValue) => {
        setFormData(prev => ({
            ...prev,
            country_id: newValue ? newValue.id : '',
        }));
    };

    const handleCityChange = (event, newValue) => {
        setFormData(prev => ({
            ...prev,
            city_id: newValue ? newValue.id : '',
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
        } else if (formData.password.length < 6) {
            newErrors.password = t('Password must be at least 6 characters');
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
            localStorage.setItem('registeredEmail', formData.email);

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
                                        <div className="d-flex align-items-center">
                                            <PhoneInput
                                                international
                                                defaultCountry="OM"
                                                value={formData.phone}
                                                onChange={value =>
                                                    setFormData(prev => ({ ...prev, phone: value }))
                                                }
                                                className={`${style.contactInput} w-100`}
                                                placeholder={t(
                                                    'Enter your preferred contact number'
                                                )}
                                            />
                                        </div>
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
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                position: 'relative',
                                            }}
                                        >
                                            <input
                                                className={style.contactInput}
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="*******"
                                                style={{ flex: 1 }}
                                            />
                                            <IconButton
                                                onClick={togglePasswordVisibility}
                                                edge="end"
                                                sx={{
                                                    position: 'absolute',
                                                    right: '10px',
                                                    color: '#666',
                                                }}
                                            >
                                                {showPassword ? (
                                                    <VisibilityIcon />
                                                ) : (
                                                    <VisibilityOffIcon />
                                                )}
                                            </IconButton>
                                        </div>
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
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                position: 'relative',
                                            }}
                                        >
                                            <input
                                                className={style.contactInput}
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="password_confirmation"
                                                value={formData.password_confirmation}
                                                onChange={handleChange}
                                                placeholder="*******"
                                                style={{ flex: 1 }}
                                            />
                                            <IconButton
                                                onClick={toggleConfirmPasswordVisibility}
                                                edge="end"
                                                sx={{
                                                    position: 'absolute',
                                                    right: '10px',
                                                    color: '#666',
                                                }}
                                            >
                                                {showConfirmPassword ? (
                                                    <VisibilityIcon />
                                                ) : (
                                                    <VisibilityOffIcon />
                                                )}
                                            </IconButton>
                                        </div>
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
                                                    languages: newValue,
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
                                        <label className="mb-2">
                                            {t('City of Residence')} <span>*</span>
                                        </label>
                                        <Autocomplete
                                            options={citiesData?.data || []}
                                            getOptionLabel={option => option.name}
                                            value={
                                                citiesData?.data.find(
                                                    city => city.id === formData.city_id
                                                ) || null
                                            }
                                            onChange={handleCityChange}
                                            renderInput={params => (
                                                <TextField
                                                    {...params}
                                                    label={t('Select City')}
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                        {errors.city_id && (
                                            <span className="text-danger">{errors.city_id}</span>
                                        )}
                                    </div>

                                    <div className="col-md-12 d-flex flex-column mb-3">
                                        <label className="mb-2">
                                            {t('Country of Residence')} <span>*</span>
                                        </label>
                                        <Autocomplete
                                            options={countriesData?.data || []}
                                            getOptionLabel={option => option.name}
                                            value={
                                                countriesData?.data.find(
                                                    country => country.id === formData.country_id
                                                ) || null
                                            }
                                            onChange={handleCountryChange}
                                            renderInput={params => (
                                                <TextField
                                                    {...params}
                                                    label={t('Select Country')}
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                        {errors.country_id && (
                                            <span className="text-danger">{errors.country_id}</span>
                                        )}
                                    </div>

                                    <div className={style.loginBtn}>
                                        <button type="submit" disabled={isLoading}>
                                            <span>{isLoading ? t('Submitting') : t('Submit')}</span>
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
