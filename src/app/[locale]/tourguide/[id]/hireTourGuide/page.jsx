'use client';
import React, { useEffect, useState } from 'react';
import style from './hireTourGuide.module.css';
import NavBar from '@/components/navBar/NavBar';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import Aos from 'aos';
import Newsletter from '@/app/[locale]/home/component/newsletter/Newsletter';
import { useParams, useRouter } from 'next/navigation';
import { useGetGuidesBtIdQuery } from '@/store/tourGuide/TourGuideDetailsSlice';
import Loading from '@/components/Loading/Loading';
import { useBookTourGuideMutation } from '@/store/Booking/GuideBookSlice';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useGetCitiesQuery } from '@/store/Cities/CitiesSlice';
const hireTourGuide = () => {
    const { id } = useParams();

    const t = useTranslations('HomePage');
    const locale = useLocale();
    const router = useRouter();

    const { data, error, isLoading } = useGetGuidesBtIdQuery({ id, lang: locale });
    const guide = data?.data;

    const breadcrumbs = [
        { label: t('Home'), href: `/${locale}/` },
        { label: t('Tour Guides'), href: `/${locale}/tourguide` },
        { label: guide?.name },
        { label: t('Confirm booking') },
    ];

    useEffect(() => {
        Aos.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);

    const [bookTourGuide, { isLoading: isBooking }] = useBookTourGuideMutation(id);
    const { data: citiesData } = useGetCitiesQuery(locale);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        from_date: '',
        to_date: '',
        termsAccepted: false,
    });

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const [errors, setErrors] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (!token) {
            Swal.fire({
                text: t('You need to log in to book a tour guide'),
                showCancelButton: true,
                confirmButtonText: 'Login',
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#B18D61',
            }).then(result => {
                if (result.isConfirmed) {
                    router.push(`/${locale}/login`);
                }
            });
            return;
        }

        if (!id) {
            toast.error('Error: Guide ID is missing!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
            });
            return;
        }

        const newErrors = {};
        if (!formData.first_name) newErrors.first_name = t('First name is required');
        if (!formData.last_name) newErrors.last_name = t('Last name is required');
        if (!formData.email) newErrors.email = t('Email is required');
        if (!formData.phone) newErrors.phone = t('Phone number is required');
        if (!formData.from_date) {
            newErrors.from_date = t('From date is required');
        }

        if (!formData.to_date) {
            newErrors.to_date = t('To date is required');
        } else if (new Date(formData.to_date) < new Date(formData.from_date)) {
            newErrors.to_date = t('The end date should be on or after the start date');
        }

        if (!formData.termsAccepted)
            newErrors.termsAccepted = t('You must accept the policy and terms');

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, typeof value === 'boolean' ? value.toString() : value);
            });

            const response = await bookTourGuide({
                id,
                userData: formDataToSend,
            }).unwrap();

            toast.success(
                response?.message || 'Booking successful! And pending to tour Guide To Accept',
                {
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
                }
            );
            setTimeout(() => {
                router.push(`/${locale}/`);
            }, 3000);
        } catch (err) {
            const errorMessage = err?.data?.error || 'Booking failed! Please try again.';

            toast.error(errorMessage, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
            });

            console.error('Booking Error:', err);
        }
    };

    return (
        <div>
            <NavBar />
            {/* <ToastContainer /> */}
            <div className={style.hireGuide}>
                {isBooking && <Loading />}
                <div className="container">
                    <div className="row">
                        <div
                            className={`${style.boxIcon} col-md-3 mb-2 d-flex gap-3 justify-content-center align-items-center`}
                        >
                            <img
                                className={style.hireIcon}
                                src="/hire-guide/1.png"
                                alt="hire-guide"
                            />
                            <span>{t('Expert local guides')}</span>
                            <img className={style.hireIcon} src="/hire-guide/info.png" alt="info" />
                        </div>

                        <div
                            className={`${style.boxIcon} col-md-3 mb-2 d-flex gap-3 justify-content-center align-items-center`}
                        >
                            <img
                                className={style.hireIcon}
                                src="/hire-guide/2.png"
                                alt="hire-guide"
                            />
                            <span>{t('Make your tour more pleasure')}</span>
                            <img className={style.hireIcon} src="/hire-guide/info.png" alt="info" />
                        </div>

                        <div
                            className={`${style.boxIcon} col-md-3 mb-2 d-flex gap-3 justify-content-center align-items-center`}
                        >
                            <img
                                className={style.hireIcon}
                                src="/hire-guide/3.png"
                                alt="hire-guide"
                            />
                            <span>{t('Make your tour more pleasure')}</span>
                            <img className={style.hireIcon} src="/hire-guide/info.png" alt="info" />
                        </div>

                        <div
                            className={`${style.boxIcon2} col-md-3 mb-2 d-flex gap-2 justify-content-center align-items-center`}
                        >
                            <img
                                className={style.hireIcon}
                                src="/hire-guide/4.png"
                                alt="hire-guide"
                            />
                            <span>{t('Active holiday specialists')}</span>
                            <img className={style.hireIcon} src="/hire-guide/info.png" alt="info" />
                        </div>
                    </div>
                </div>
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <p>{t('Error loading Data')}</p>
                ) : (
                    <>
                        <div className={style.hireHero}>
                            <h4 data-aos="fade-up">{guide.state}</h4>
                            <h6 data-aos="fade-up">
                                Muscat The capital region and economic hub of Oman
                            </h6>
                        </div>

                        <div className={style.hireBody}>
                            <DynamicBreadcrumbs items={breadcrumbs} />
                            <div className="container-fluid mt-4">
                                <div className="row">
                                    <div className="col-md-7 mb-2">
                                        <form onSubmit={handleSubmit} className="row">
                                            {/* First Name */}
                                            <div className="col-md-6 d-flex flex-column mb-3">
                                                <label className={style.label}>
                                                    {t('First Name')} <span>*</span>
                                                </label>
                                                <input
                                                    className={style.contactInput}
                                                    type="text"
                                                    name="first_name"
                                                    value={formData.first_name}
                                                    onChange={handleChange}
                                                />
                                                {errors.first_name && (
                                                    <span className={style.errorText}>
                                                        {errors.first_name}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Last Name */}
                                            <div className="col-md-6 d-flex flex-column mb-3">
                                                <label className={style.label}>
                                                    {t('Last Name')} <span>*</span>
                                                </label>
                                                <input
                                                    className={style.contactInput}
                                                    type="text"
                                                    name="last_name"
                                                    value={formData.last_name}
                                                    onChange={handleChange}
                                                />
                                                {errors.last_name && (
                                                    <span className={style.errorText}>
                                                        {errors.last_name}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Email */}
                                            <div className="col-md-6 d-flex flex-column mb-3">
                                                <label className={style.label}>
                                                    {t('Email')} <span>*</span>
                                                </label>
                                                <input
                                                    className={style.contactInput}
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                                {errors.email && (
                                                    <span className={style.errorText}>
                                                        {errors.email}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Phone Number */}
                                            <div className="col-md-6 d-flex flex-column mb-3">
                                                <label className={style.label}>
                                                    {t('Phone Number')} <span>*</span>
                                                </label>
                                                <input
                                                    className={style.contactInput}
                                                    type="text"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />
                                                {errors.phone && (
                                                    <span className={style.errorText}>
                                                        {errors.phone}
                                                    </span>
                                                )}
                                            </div>

                                            {/* From Date */}
                                            <div className="col-md-6 d-flex flex-column mb-3">
                                                <label className={style.label}>
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

                                            {/* To Date */}
                                            <div className="col-md-6 d-flex flex-column mb-3">
                                                <label className={style.label}>
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

                                            <div className="col-md-6 d-flex flex-column mb-3">
                                                <label className={`${style.label}`}>
                                                    {t('Country of residence')} <span>*</span>
                                                </label>
                                                <FormControl>
                                                    <Select
                                                        name="city_id"
                                                        value={formData.city_id || ''}
                                                        onChange={e =>
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                city_id:
                                                                    Number(e.target.value) || '',
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
                                            </div>
                                            {/* Accept Terms */}
                                            <div className="col-md-12">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={formData.termsAccepted}
                                                            onChange={handleChange}
                                                            name="termsAccepted"
                                                        />
                                                    }
                                                    label={
                                                        <>
                                                            {t('Accept')}{' '}
                                                            <Link
                                                                className={style.acceptLabels}
                                                                href={`/${locale}/privacy`}
                                                            >
                                                                {t('Privacy Policy')}
                                                            </Link>{' '}
                                                            {t('and')}{' '}
                                                            <Link
                                                                className={style.acceptLabels}
                                                                href={`/${locale}/userTerms`}
                                                            >
                                                                {t('Terms of usage')}
                                                            </Link>
                                                        </>
                                                    }
                                                />
                                            </div>
                                            {errors.termsAccepted && (
                                                <span className={style.errorText}>
                                                    {errors.termsAccepted}
                                                </span>
                                            )}

                                            {/* Submit Button */}
                                            <div className={style.loginBtn}>
                                                <button type="submit" disabled={isBooking}>
                                                    <span>
                                                        {isBooking ? t('submitting') : t('submit')}
                                                    </span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-1"></div>
                                    <div className="col-md-4 mb-2">
                                        <div className="card p-4">
                                            <div className={style.guideImgBox}>
                                                <img
                                                    data-aos="fade-up"
                                                    src={
                                                        guide.image || '/homepage/tour-guide/1.jpeg'
                                                    }
                                                    alt={guide.name}
                                                />
                                                <div className={style.guideBoxCaption}>
                                                    <h6 data-aos="fade-up">
                                                        {t('About')} {guide.name}
                                                    </h6>
                                                    <span> {t('Expert Leader')} :</span>
                                                    <span
                                                        data-aos="fade-up"
                                                        dangerouslySetInnerHTML={{
                                                            __html: guide.experience,
                                                        }}
                                                    ></span>
                                                </div>
                                            </div>
                                            <div className={style.cardBody}>
                                                <h6 data-aos="fade-up">{t('Destinations')}</h6>
                                                <p data-aos="fade-up">{guide.state}</p>
                                            </div>
                                            <div className={style.cardBody}>
                                                <h6 data-aos="fade-up">{t('Activities')}</h6>
                                                <p>{guide.activities}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {/* <Newsletter /> */}
        </div>
    );
};

export default hireTourGuide;
