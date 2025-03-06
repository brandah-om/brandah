'use client';
import React, { useEffect, useState } from 'react';
import style from './confirm.module.css';
import NavBar from '@/components/navBar/NavBar';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import Newsletter from '../home/component/newsletter/Newsletter';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Aos from 'aos';
import { useGetCitiesQuery } from '@/store/Cities/CitiesSlice';
import Typography from '@mui/material/Typography';
const page = () => {
    const locale = useLocale();
    const t = useTranslations('HomePage');

    const breadcrumbs = [
        { label: t('Home'), href: `/${locale}/` },
        { label: 'Trips', href: `/${locale}/trips` },
        { label: ' Confirm booking' },
    ];

    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const price = searchParams.get('price');
    const description = searchParams.get('description');
    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');
    const email = searchParams.get('email');

    const [firstNameState, setFirstNameState] = useState('');
    const [lastNameState, setLastNameState] = useState('');
    const [emailState, setEmailState] = useState('');

    useEffect(() => {
        setFirstNameState(firstName || '');
        setLastNameState(lastName || '');
        setEmailState(email || '');
    }, [firstName, lastName, email]);

    useEffect(() => {
        Aos.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);

    const { data: citiesData } = useGetCitiesQuery(locale);
    const [formData, setFormData] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        from_date: '',
        to_date: '',
        city_id: '',
        acceptTerms: false,
    });

    const [errors, setErrors] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        from_date: '',
        to_date: '',
        city_id: '',
    });

    const handleChange = e => {
        const { name, value, type, files, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
        }));
    };

    const handleCityChange = (event, newValue) => {
        setFormData(prev => ({
            ...prev,
            city_id: newValue ? newValue.id : '',
        }));
    };

    return (
        <div>
            <NavBar />
            <div className={style.hireGuide}>
                <div className={style.hireBody}>
                    <DynamicBreadcrumbs items={breadcrumbs} />
                    <div className="container-fluid mt-4">
                        <div className="row">
                            <div className="col-md-7 mb-2">
                                <div className="row">
                                    <div
                                        data-aos="fade-up"
                                        className="col-md-6 d-flex flex-column mb-3"
                                    >
                                        <label className={`${style.label}`}>
                                            {t('First Name')} <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="text"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            placeholder={t('Enter the name as in your national ID')}
                                        />
                                        {errors.first_name && (
                                            <span className={style.errorText}>
                                                {errors.first_name}
                                            </span>
                                        )}
                                    </div>
                                    <div
                                        data-aos="fade-up"
                                        className="col-md-6 d-flex flex-column mb-3"
                                    >
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
                                    <div
                                        data-aos="fade-up"
                                        className="col-md-6 d-flex flex-column mb-3"
                                    >
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
                                    <div
                                        data-aos="fade-up"
                                        className="col-md-6 d-flex flex-column mb-3"
                                    >
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
                                    <div
                                        data-aos="fade-up"
                                        className="col-md-6 d-flex flex-column mb-3"
                                    >
                                        <label className={`${style.label}`}>
                                            {t('From Date')} <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="date"
                                            name="from_date"
                                            value={formData.from_date}
                                            onChange={handleChange}
                                        />
                                        {errors.from_date && (
                                            <span className={style.errorText}>
                                                {errors.from_date}
                                            </span>
                                        )}
                                    </div>
                                    <div
                                        data-aos="fade-up"
                                        className="col-md-6 d-flex flex-column mb-3"
                                    >
                                        <label className={`${style.label}`}>
                                            {t('To Date')} <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="date"
                                            name="to_date"
                                            value={formData.to_date}
                                            onChange={handleChange}
                                        />
                                        {errors.to_date && (
                                            <span className={style.errorText}>
                                                {errors.to_date}
                                            </span>
                                        )}
                                    </div>

                                    <div
                                        data-aos="fade-up"
                                        className="col-md-12 d-flex flex-column mb-3"
                                    >
                                        <label className="mb-2">
                                            {t('City of residence')} <span>*</span>
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
                                    </div>

                                    <div
                                        data-aos="fade-up"
                                        className="col-md-6 d-flex flex-column mb-3"
                                    >
                                        <label className={`${style.label}`}>
                                            {t('Payment Method')} <span>*</span>
                                        </label>
                                        <FormControl>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                            >
                                                <MenuItem value="">
                                                    <em>{t('Select')}</em>
                                                </MenuItem>
                                                <MenuItem value="MUSCAT">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="m-0">PayPal</p>
                                                        <img
                                                            className={style.paypalImg}
                                                            src="/hire-guide/paypal.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                </MenuItem>
                                                <MenuItem value="MUSCAT2">MUSCAT 2</MenuItem>
                                                <MenuItem value="MUSCAT3">MUSCAT 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div data-aos="fade-up" className="col-md-12">
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

                                    <div className={style.loginBtn}>
                                        <button>
                                            <span>{t('submit')}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-4 mb-2">
                                <div className="card p-4">
                                    <div className={style.guideImgBox}>
                                        <img
                                            data-aos="fade-up"
                                            src="/homepage/top-trip/1.jpeg"
                                            alt="tripImg"
                                        />
                                        <div data-aos="fade-up" className={style.guideBoxCaption}>
                                            <h6>{name || 'null'}</h6>
                                            {/* <p>Expert Leader: Oman</p> */}
                                        </div>
                                    </div>
                                    <div data-aos="fade-up" className={style.cardBody}>
                                        <h6>{t('Price')}</h6>
                                        <p>{price}</p>
                                    </div>
                                    <div data-aos="fade-up" className={style.cardBody}>
                                        <h6>{t('description')}</h6>
                                        <p>{description || 'null'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Newsletter /> */}
        </div>
    );
};

export default page;
