'use client';
import NavBar from '../../../components/navBar/NavBar';
import React, { useEffect, useState } from 'react';
import style from './contactUs.module.css';
import Link from 'next/link';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Merriweather } from 'next/font/google';

const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['400'],
});
import { Inter } from 'next/font/google';
import { useLocale, useTranslations } from 'next-intl';
import Aos from 'aos';
import { useGetCountriesQuery } from '../../../store/Countries/CountriesSlice';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useContactSliceMutation } from '../../../store/Contact/ContactSlice';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading/Loading';
import { useGetContactDataQuery } from '../../../store/Contact/GetContactDataSlice';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
const inter = Inter({
    subsets: ['latin'],
    weight: ['400'],
});

const ContactUs = () => {
    const locale = useLocale();
    const { data: countriesData } = useGetCountriesQuery(locale);
    const [sendContactForm, { isLoading, isError, isSuccess }] = useContactSliceMutation();

    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        msg: '',
        enquiry_type: '',
        receive_news: '',
        receive_sms: '',
        name: '',
        country_id: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const firstName = localStorage.getItem('firstName');
            const lastName = localStorage.getItem('lastName');
            const email = localStorage.getItem('email');
            const phone = localStorage.getItem('phone');

            if (firstName && lastName && email && phone) {
                setFormData(prevState => ({
                    ...prevState,
                    email: email || '',
                    name: `${firstName} ${lastName}` || '',
                    phone: phone || '',
                }));
            } else {
                console.warn('Missing user data in localStorage');
            }
        }
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = t('Name is required');
        }

        if (!formData.email.trim()) {
            newErrors.email = t('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('Email is Not Valid');
        }

        if (!formData.phone.trim()) {
            newErrors.phone = t('Phone Number is required');
        }

        if (!formData.country_id) {
            newErrors.country_id = t('Please Choose Country');
        }

        if (!formData.enquiry_type) {
            newErrors.enquiry_type = t('Please Choose Type Of Enquiry');
        }

        if (!formData.msg) {
            newErrors.msg = t('Please Write Your Meassge');
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await sendContactForm(formData).unwrap();
            console.log('Success:', response);
            toast.success(t('Your message has been sent successfully'), {
                position: locale === 'ar' ? 'top-left' : 'top-right',
                autoClose: 3000,
                theme: 'colored',
                rtl: locale === 'ar',
                style: { backgroundColor: '#B18D61', color: 'white' },
                progressStyle: {
                    direction: locale === 'ar' ? 'rtl' : 'ltr',
                },
            });

            setFormData({
                name: '',
                email: '',
                phone: '',
                country_id: '',
                enquiry_type: '',
                msg: '',
            });

            setErrors({});
        } catch (error) {
            console.error('Error:', error);

            toast.error(t('Something went wrong! Please try again'), {
                position: locale === 'ar' ? 'top-left' : 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                rtl: locale === 'ar',
                style: {
                    backgroundColor: '#C64E4E',
                    color: 'white',
                },
                progressStyle: {
                    direction: locale === 'ar' ? 'rtl' : 'ltr',
                },
            });
        }
    };

    const handleChange = e => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
        }));
    };

    const handleCountryChange = (event, newValue) => {
        setFormData(prev => ({
            ...prev,
            country_id: newValue ? newValue.id : '',
        }));
    };

    const t = useTranslations('HomePage');

    const { data: commonData } = useGetContactDataQuery(locale);

    // const accordionItems = [
    //     {
    //         question: 'Thinking about booking a trip?',
    //         answer: 'Thinking about booking a trip?',
    //     },
    //     {
    //         question: 'How do I make changes to my booking?',
    //         answer: 'How do I make changes to my booking?',
    //     },
    //     {
    //         question: 'How do I cancel or transfer my booking?',
    //         answer: 'How do I cancel or transfer my booking?',
    //     },
    //     {
    //         question: 'How do I pay my balance?',
    //         answer: 'How do I pay my balance?',
    //     },
    //     {
    //         question: "About my 'land only' booking",
    //         answer: "About my 'land only' booking",
    //     },
    //     {
    //         question: 'How to book flights to join our tours',
    //         answer: 'How to book flights to join our tours',
    //     },
    // ];

    useEffect(() => {
        Aos.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);

    return (
        <div>
            <NavBar />
            <div className={style.contactUs}>
                {isLoading && <Loading />}
                <div className="container mb-5">
                    <div className="row">
                        <div data-aos="fade-up" className="col-md-6 col-lg-10 m-auto">
                            <div className={style.helpYou}>
                                <p data-aos="fade-up">
                                    {' '}
                                    {t(
                                        'We want to make sure that we can help you to find the perfect adventure holiday If you have any questions about anything, please get in touch with one of our experts using our Contact Form or by simply calling us You can also find the answer to our most commonly asked questions'
                                    )}
                                    <Link className="mx-1" href={`/${locale}/`}>
                                        {t('here')}
                                    </Link>
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className={`${style.contactForm} p-lg-5 p-3 mt-4 mb-3`}
                            >
                                <div className="row">
                                    <div
                                        data-aos="fade-up"
                                        className="col-md-12 mt-3 d-flex flex-column"
                                    >
                                        <label
                                            className={`${style.label} ${merriweather.className}`}
                                        >
                                            {t('Name')} <span style={{ color: '#C64E4E;' }}>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && <p className="error-text">{errors.name}</p>}
                                    </div>

                                    <div
                                        data-aos="fade-up"
                                        className="col-md-6 mt-3 d-flex flex-column"
                                    >
                                        <label
                                            className={`${style.label} ${merriweather.className}`}
                                        >
                                            {t('Email')}{' '}
                                            <span style={{ color: '#C64E4E;' }}>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && (
                                            <p className="error-text">{errors.email}</p>
                                        )}
                                    </div>
                                    <div
                                        data-aos="fade-up"
                                        className="col-md-6 mt-3 d-flex flex-column"
                                    >
                                        <label
                                            className={`${style.label} ${merriweather.className}`}
                                        >
                                            {t('Phone Number')}
                                            <span style={{ color: '#C64E4E;' }}>*</span>
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
                                                placeholder={t('Enter your phone number')}
                                            />
                                        </div>
                                        {errors.phone && (
                                            <p className="error-text">{errors.phone}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="row">
                                    <div
                                        data-aos="fade-up"
                                        className="col-md-12 mt-3 d-flex flex-column"
                                    >
                                        <label
                                            className={`${style.label} ${merriweather.className}`}
                                        >
                                            {t(
                                                'Country of residence (so we can assign the correct team)'
                                            )}
                                            <span style={{ color: '#C64E4E' }}>*</span>
                                        </label>
                                        <Autocomplete
                                            className="bg-white"
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
                                            <p className="error-text">{errors.country_id}</p>
                                        )}
                                    </div>
                                </div>

                                <div
                                    data-aos="fade-up"
                                    className="col-md-12 mt-3 d-flex flex-column"
                                >
                                    <label className={`${style.label} ${merriweather.className}`}>
                                        {t('Message')}
                                        <span style={{ color: '#C64E4E;' }}>*</span>
                                    </label>
                                    <textarea
                                        className="form-control"
                                        name="msg"
                                        value={formData.msg}
                                        onChange={handleChange}
                                        placeholder={t('Enter your Message')}
                                        rows={4}
                                    ></textarea>
                                    {errors.msg && <p className="error-text">{errors.msg}</p>}
                                </div>

                                <div className="row">
                                    <div
                                        data-aos="fade-up"
                                        className="col-md-12 mt-3 d-flex flex-column"
                                    >
                                        <label
                                            className={`${style.label} ${merriweather.className}`}
                                        >
                                            {t('Type of Enquiry')}
                                            <span style={{ color: '#C64E4E;' }}>*</span>
                                        </label>
                                        <select
                                            className="form-select"
                                            name="enquiry_type"
                                            value={formData.enquiry_type}
                                            onChange={handleChange}
                                        >
                                            <option value="">{t('Select')}</option>
                                            <option value="Complaints">{t('Complaints')}</option>
                                            <option value="inquiry">{t('inquiry')}</option>
                                        </select>
                                    </div>
                                    {errors.enquiry_type && (
                                        <p className="error-text">{errors.enquiry_type}</p>
                                    )}
                                </div>

                                <div className="row">
                                    <div
                                        data-aos="fade-up"
                                        className="col-md-12 mt-3 d-flex flex-column"
                                    >
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="receive_news"
                                                checked={formData.receive_news === 1}
                                                onChange={handleChange}
                                            />
                                            <label
                                                className={`${style.label} ${merriweather.className}`}
                                                for="flexCheckDefault"
                                            >
                                                {t(
                                                    'Keep me up to date with news and offers from Brandah through Digital Marketing'
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div
                                        data-aos="fade-up"
                                        className="col-md-12 mt-3 d-flex flex-column"
                                    >
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="receive_sms"
                                                checked={formData.receive_sms === 1}
                                                onChange={handleChange}
                                            />
                                            <label
                                                className={`${style.label} ${merriweather.className}`}
                                                for="flexCheckDefault"
                                            >
                                                {t(
                                                    'I would like to receive information from Brandah by SMS'
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div
                                        data-aos="fade-up"
                                        className="col-md-12 mt-3 d-flex flex-column"
                                    >
                                        <p
                                            className={`${style.fullDetails} ${merriweather.className}`}
                                        >
                                            {' '}
                                            {t(
                                                'For full details regarding your data including digital marketing please read our'
                                            )}{' '}
                                            <Link href={`/${locale}/privacy`}>
                                                {t('Privacy Policy')} {t('here')}
                                            </Link>{' '}
                                            {t(
                                                'You can withdraw your consent anytime by either clicking unsubscribe or by contacting us'
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    data-aos="fade-up"
                                    className={`${style.formBtn} ${merriweather.className} mt-lg-5 mt-1`}
                                    type="submit"
                                >
                                    {t('SUBMIT')}
                                </button>
                            </form>
                        </div>
                        {/* <div className="col-lg-1"></div> */}
                        {/* <div className="col-md-6 col-lg-3">
                            <div className="border p-4">
                                <h4 data-aos="fade-up">{t('Bookings')}</h4>
                                <p data-aos="fade-up" className="my-1">
                                    {t('Call us on')}:
                                </p>
                                <p data-aos="fade-up" className="my-1">
                                    +1 (XXX) XXX-XXXX
                                </p>
                                <p data-aos="fade-up" className="my-1">
                                    {t('Email us at')}:
                                </p>
                                <p data-aos="fade-up" className="my-1" style={{ color: '#B18D61' }}>
                                    Info@brandahtravel.example
                                </p>
                                <p data-aos="fade-up">Tue: 9:00am – 8:00pm EST</p>
                                <p data-aos="fade-up">Wed: 9:00am – 8:00pm EST</p>
                                <p data-aos="fade-up">Thu: 9:00am – 8:00pm EST00pm EST</p>
                                <p data-aos="fade-up">Fri: 9:00am – 8:00pm EST</p>
                                <p data-aos="fade-up">Sat: 10:00am – 7:00pm EST</p>
                                <p data-aos="fade-up">Sun: Closed</p>
                            </div>
                        </div> */}

                        <div className="pt-3">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className={`${style.questionsTitle} col-md-10 m-auto`}>
                                        <h4 data-aos="fade-up" className={inter.className}>
                                            {t('Common booking questions')}
                                        </h4>
                                        <h6
                                            data-aos="fade-up"
                                            className={`${merriweather.className} mb-4 mt-3`}
                                        >
                                            {' '}
                                            {t(
                                                'If you’re looking at our website from outside the UK and would like to book through an agent in your country, please take a look at our list of'
                                            )}{' '}
                                            <Link href="/">{t('approved agents by country')}</Link>
                                        </h6>

                                        {/* <hr /> */}
                                        {commonData?.data.map((item, index) => (
                                            <Accordion key={index}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls={`panel${index}-content`}
                                                    id={`panel${index}-header`}
                                                    sx={{
                                                        height: '60px',
                                                        minHeight: '60px !important',
                                                        padding: '0 16px',
                                                    }}
                                                >
                                                    <Typography
                                                        data-aos="fade-up"
                                                        className={`${style.accordionQusetion} ${merriweather.className}`}
                                                    >
                                                        {item.question}
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>{item.answer}</Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
