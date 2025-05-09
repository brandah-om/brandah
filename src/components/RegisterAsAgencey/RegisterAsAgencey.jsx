import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import style from './RegisterAsAgencey.module.css';
import Link from 'next/link';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import { useGetCitiesQuery } from '../../store/Cities/CitiesSlice';
import { useGetCountriesQuery } from '../../store/Countries/CountriesSlice';
import { useRegisterTransportationMutation } from '../../store/register/RegisterTransportationApiSlice';
import { useRegisterAgencyMutation } from '../../store/register/RegisterAgencyApiSlice';
import Loading from '../Loading/Loading';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
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

const RegisterAsAgency = ({
    openRegisterAgency,
    handleClickOpenRegisterAgency,
    handleCloseRegisterAgency,
}) => {
    const [open, setOpen] = React.useState(false);
    const t = useTranslations('HomePage');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prevState => !prevState);
    };

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
        country_id: '',
    });

    const handleChange = e => {
        const { name, value, type, files, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
        }));
    };

    const handleCountryChange = (event, newValue) => {
        setFormData(prev => ({
            ...prev,
            country_id: newValue ? newValue.id : '',
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
        } else if (formData.password.length < 6) {
            newErrors.password = t('Password must be at least 6 characters');
        }
        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = t('Passwords do not match');
        }
        if (!formData.license) {
            newErrors.license = t('license is required');
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
            localStorage.setItem('registeredEmail', formData.email);

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
            handleCloseRegisterAgency();
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

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    return (
        <React.Fragment>
            <Button onClick={handleClickOpenRegisterAgency} className={style.navbarLink}>
                {t('Register As Agency')}
            </Button>
            <BootstrapDialog
                onClose={handleCloseRegisterAgency}
                aria-labelledby="customized-dialog-title"
                open={openRegisterAgency}
                fullWidth
                maxWidth="md"
            >
                <IconButton
                    aria-label="close"
                    onClick={handleCloseRegisterAgency}
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
                    {(isLoading || isLoadingTrans) && <Loading />}
                    <div className="container">
                        <div className="row">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className={style.registerAs}>
                                        {t('Register as')} <span>{t('Agency')}</span>
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
                                        <label className={style.label}>
                                            {t('Agency Name')} <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="text"
                                            name="name"
                                            placeholder={t('Enter Agency Name')}
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
                                            <span className={style.errorText}>
                                                {errors.license}
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
                                                dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                                sx={{
                                                    '& .MuiSelect-select': {
                                                        textAlign:
                                                            locale === 'ar' ? 'right' : 'left',
                                                        direction: locale === 'ar' ? 'rtl' : 'ltr',
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        transform:
                                                            locale === 'ar' ? 'scaleX(-1)' : 'none',
                                                        [locale === 'ar' ? 'left' : 'right']: 10,
                                                        [locale === 'ar' ? 'right' : 'left']:
                                                            'auto',
                                                    },
                                                    '& .MuiMenuItem-root': {
                                                        direction: locale === 'ar' ? 'rtl' : 'ltr',
                                                        justifyContent:
                                                            locale === 'ar'
                                                                ? 'flex-end'
                                                                : 'flex-start',
                                                    },
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em
                                                        style={{
                                                            textAlign:
                                                                locale === 'ar' ? 'right' : 'left',
                                                            width: '100%',
                                                        }}
                                                    >
                                                        {t('Select')}
                                                    </em>
                                                </MenuItem>
                                                <MenuItem value="Agency">{t('Agency')}</MenuItem>
                                                <MenuItem value="Transportation">
                                                    {t('Transportation')}
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                        {errors.registerAs && (
                                            <span className={style.errorText}>
                                                {errors.registerAs}
                                            </span>
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
                                                direction: locale === 'ar' ? 'rtl' : 'ltr',
                                            }}
                                        >
                                            <input
                                                className={style.contactInput}
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="*******"
                                                style={{
                                                    flex: 1,
                                                    textAlign: locale === 'ar' ? 'right' : 'left',
                                                    direction: locale === 'ar' ? 'rtl' : 'ltr',
                                                }}
                                            />
                                            <IconButton
                                                onClick={togglePasswordVisibility}
                                                edge="end"
                                                sx={{
                                                    position: 'absolute',
                                                    [locale === 'ar' ? 'left' : 'right']: '10px',
                                                    [locale === 'ar' ? 'right' : 'left']: 'auto',
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
                                                direction: locale === 'ar' ? 'rtl' : 'ltr',
                                            }}
                                        >
                                            <input
                                                className={style.contactInput}
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="password_confirmation"
                                                value={formData.password_confirmation}
                                                onChange={handleChange}
                                                placeholder="*******"
                                                style={{
                                                    flex: 1,
                                                    textAlign: locale === 'ar' ? 'right' : 'left',
                                                    direction: locale === 'ar' ? 'rtl' : 'ltr',
                                                }}
                                            />
                                            <IconButton
                                                onClick={toggleConfirmPasswordVisibility}
                                                edge="end"
                                                sx={{
                                                    position: 'absolute',
                                                    [locale === 'ar' ? 'left' : 'right']: '10px',
                                                    [locale === 'ar' ? 'right' : 'left']: 'auto',
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
                                        <label className={style.label}>
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
                                                    placeholder={t('Select Country')}
                                                    variant="outlined"
                                                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <div
                                                                style={{
                                                                    transform:
                                                                        locale === 'ar'
                                                                            ? 'scaleX(-1)'
                                                                            : 'none',
                                                                    position: 'absolute',
                                                                    [locale === 'ar'
                                                                        ? 'left'
                                                                        : 'right']: 0,
                                                                }}
                                                            >
                                                                {params.InputProps.endAdornment}
                                                            </div>
                                                        ),
                                                    }}
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        style: {
                                                            textAlign:
                                                                locale === 'ar' ? 'right' : 'left',
                                                            direction:
                                                                locale === 'ar' ? 'rtl' : 'ltr',
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiAutocomplete-popupIndicator': {
                                                            transform:
                                                                locale === 'ar'
                                                                    ? 'scaleX(-1)'
                                                                    : 'none',
                                                        },
                                                        '& .MuiInputBase-input::placeholder': {
                                                            textAlign:
                                                                locale === 'ar' ? 'right' : 'left',
                                                            direction:
                                                                locale === 'ar' ? 'rtl' : 'ltr',
                                                        },
                                                        position: 'relative',
                                                    }}
                                                />
                                            )}
                                        />
                                        {errors.country_id && (
                                            <span className={style.errorText}>
                                                {errors.country_id}
                                            </span>
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

export default RegisterAsAgency;
