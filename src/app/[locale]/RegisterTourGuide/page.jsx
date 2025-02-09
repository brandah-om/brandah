'use client';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import style from './registerTourGuide.module.css';
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
import NavBar from '@/components/navBar/NavBar';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useRegisterTourGuideMutation } from '@/store/register/RegisterTourGuideApiSlice';

const RegisterAsGuide = () => {
    const router = useRouter();

    const [registerTourGuide, { isLoading }] = useRegisterTourGuideMutation();

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

        // تحقق من الحقول
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
        if (!formData.city_id) {
            newErrors.city_id = 'City is required';
        }
        if (!formData.country_id) {
            newErrors.country_id = 'Country is required';
        }
        if (!formData.languages.length) {
            newErrors.languages = 'At least one language is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // if no errors, return true
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const data = new FormData();

        const languages = formData.languages.map(language => language.id);

        for (const key in formData) {
            if (key === 'languages') {
                data.append(key, languages.join(','));
            } else if (formData[key]) {
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
                router.push('/otp');
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

    const names = [
        { id: 1, name: 'English' },
        { id: 2, name: 'العربية' },
        { id: 3, name: 'Francais' },
    ];

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const [termsAccepted, setTermsAccepted] = React.useState(false);

    const handleCheckboxChange = event => {
        setTermsAccepted(event.target.checked);
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
                                        National ID <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="text"
                                        name="license"
                                        value={formData.license}
                                        onChange={handleChange}
                                        placeholder="Enter your national number"
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
                                        options={names}
                                        disableCloseOnSelect
                                        getOptionLabel={option => option.name}
                                        isOptionEqualToValue={(option, value) =>
                                            option.id === value.id
                                        }
                                        onChange={(event, newValue) => {
                                            setFormData({ ...formData, languages: newValue });
                                        }}
                                        renderOption={(props, option, { selected }) => {
                                            const { key, ...restProps } = props;
                                            return (
                                                <li key={option.id} {...restProps}>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                    {option.name}
                                                </li>
                                            );
                                        }}
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
                                        City Of Residence <span>*</span>
                                    </label>
                                    <FormControl>
                                        <Select
                                            name="city_id"
                                            value={formData.city_id}
                                            onChange={handleChange}
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="MUSCAT">MUSCAT</MenuItem>
                                            <MenuItem value="MUSCAT2">MUSCAT 2</MenuItem>
                                            <MenuItem value="MUSCAT3">MUSCAT 3</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {errors.city_id && (
                                        <span className={style.errorText}>{errors.city_id}</span>
                                    )}
                                </div>

                                <div className="col-md-12 d-flex flex-column mb-3">
                                    <label className={`${style.label}`}>
                                        Country of Resisdence <span>*</span>
                                    </label>
                                    <FormControl>
                                        <Select
                                            name="country_id"
                                            value={formData.country_id}
                                            onChange={handleChange}
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Oman">Oman</MenuItem>
                                            <MenuItem value="Oman2">Oman 2</MenuItem>
                                            <MenuItem value="Oman3">Oman 3</MenuItem>
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
                                                checked={termsAccepted}
                                                onChange={handleCheckboxChange}
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

                                <div className="col-md-6 mt-1">
                                    <div className="d-flex justify-content-end align-items-center flex-wrap">
                                        <div>
                                            <div
                                                className={`${style.haveAccount} d-flex justify-content-center align-items-center `}
                                            >
                                                <p className="m-0 ms-2">I already have account?</p>
                                                <Link href="/login">Sign In</Link>
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
