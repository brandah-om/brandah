'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import style from './footer.module.css';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import Register from '../register/Register';
import RegisterAsGuide from '../registerAsGuide/RegisterAsGuide';
import { useLocale, useTranslations } from 'next-intl';
import RegisterAsAgency from '../RegisterAsAgencey/RegisterAsAgencey';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useGetFooterDataQuery } from '@/store/Footer/FooterDataSlice';

const Footer = () => {
    const [isSubscribed, setIsSubscribed] = useState(null);
    const [token, setToken] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const userToken = Cookies.get('token') || null;
        const subscriptionStatus = Cookies.get('is_subscribed') === 'true';

        setToken(userToken);
        setIsSubscribed(subscriptionStatus);
    }, []);

    const handleNavigation = path => {
        if (!token) {
            Swal.fire({
                title: t('You must be logged in or register to access this page'),
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: false,
                showCloseButton: true,
                customClass: {
                    title: 'swal-title-small',
                },
                // <p>${t('Please choose an option')}</p>
                html: `
                    <div class='d-flex justify-content-between align-items-center flex-lg-row flex-column gap-2' >
                        <a 
                            href="/${locale}/RegisterTourist" 
                            style="
                                padding: 5px 10px;
                                background-color: #9F733C;
                                color: white;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 14px;
                                transition: background-color 0.3s ease;
                            "
                        >
                            ${t('Register Tourist')}
                        </a>
                        <a 
                            href="/${locale}/RegisterAgency" 
                            style="
                                padding: 5px 10px;
                                background-color: #9F733C;
                                color: white;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 14px;
                                transition: background-color 0.3s ease;
                            "
                        >
                            ${t('Register Agency')}
                        </a>
                        <a 
                            href="/${locale}/RegisterTourGuide" 
                            style="
                                padding: 5px 10px;
                                background-color: #9F733C;
                                color: white;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 14px;
                                transition: background-color 0.3s ease;
                            "
                        >
                            ${t('Register Tour Guide')}
                        </a>
                        <a
                            href="/${locale}/login" 
                            style="
                                padding: 5px 10px;
                                background-color: #9F733C;
                                color: white;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 14px;
                                transition: background-color 0.3s ease;
                            "
                        >
                            ${t('Sign In')}
                        </a>
                    </div>
                `,
                didOpen: () => {
                    const links = document.querySelectorAll('a');
                    links.forEach(link => {
                        link.addEventListener('click', () => {
                            Swal.close();
                        });
                    });
                },
            });
            return;
        }

        if (!isSubscribed) {
            Swal.fire({
                title: t('You must be subscribed to access this page'),
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: t('Subscribe'),
                timer: 3000,
                timerProgressBar: true,
            }).then(result => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                    router.push(`/${locale}/subscribe`);
                }
            });
            return;
        }

        router.push(path);
    };

    const [openRegister, setOpenRegister] = React.useState(false);

    const handleClickOpenRegister = () => {
        setOpenRegister(true);
    };
    const handleCloseRegister = () => {
        setOpenRegister(false);
    };

    const [openRegisterGuide, setOpenRegisterGuide] = React.useState(false);

    const handleClickOpenRegisterGuide = () => {
        setOpenRegisterGuide(true);
    };
    const handleCloseRegisterGuide = () => {
        setOpenRegisterGuide(false);
    };

    const [openRegisterAgency, setOpenRegisterAgency] = React.useState(false);

    const handleClickOpenRegisterAgency = () => {
        setOpenRegisterAgency(true);
    };
    const handleCloseRegisterAgency = () => {
        setOpenRegisterAgency(false);
    };

    const locale = useLocale();
    const t = useTranslations('HomePage');

    const { data, error, isLoading } = useGetFooterDataQuery(locale);
    const footerData = data?.setting;

    return (
        <div className={style.footer}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <div className={`${style.footerLinks} d-flex flex-column`}>
                            <Link
                                href={`/${locale}/hotels`}
                                onClick={e => {
                                    e.preventDefault();
                                    handleNavigation(`/${locale}/hotels`);
                                }}
                                replace
                            >
                                {t('Hotels')}
                            </Link>
                            <Link
                                href={`/${locale}/tourguide`}
                                onClick={e => {
                                    e.preventDefault();
                                    handleNavigation(`/${locale}/tourguide`);
                                }}
                                replace
                            >
                                {t('Tour Guides')}
                            </Link>
                            <Link
                                href={`/${locale}/trips`}
                                onClick={e => {
                                    e.preventDefault();
                                    handleNavigation(`/${locale}/trips`);
                                }}
                                replace
                            >
                                {t('Trips')}
                            </Link>
                            <Link
                                href={`/${locale}/transportation`}
                                onClick={e => {
                                    e.preventDefault();
                                    handleNavigation(`/${locale}/transportation`);
                                }}
                            >
                                {t('Transportation')}
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className={`${style.footerLinks} d-flex flex-column`}>
                            <Link
                                href={`/${locale}/agency`}
                                onClick={e => {
                                    e.preventDefault();
                                    handleNavigation(`/${locale}/agency`);
                                }}
                                replace
                            >
                                {t('Agency')}
                            </Link>
                            <Link
                                href={`/${locale}/aboutUs`}
                                onClick={e => {
                                    e.preventDefault();
                                    handleNavigation(`/${locale}/aboutUs`);
                                }}
                                replace
                            >
                                {t('About us')}
                            </Link>
                            <Link
                                href={`/${locale}/contactUs`}
                                onClick={e => {
                                    e.preventDefault();
                                    handleNavigation(`/${locale}/contactUs`);
                                }}
                                replace
                            >
                                {t('Contact Us')}
                            </Link>
                            <Link
                                href={`/${locale}/blogs`}
                                onClick={e => {
                                    e.preventDefault();
                                    handleNavigation(`/${locale}/blogs`);
                                }}
                                replace
                            >
                                {t('Blogs')}
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className={`${style.footerLinks} d-flex flex-column`}>
                            <Link
                                href={`/${locale}/userTerms`}
                                onClick={e => {
                                    e.preventDefault();
                                    handleNavigation(`/${locale}/userTerms`);
                                }}
                                replace
                            >
                                {t('Terms of usage')}
                            </Link>
                            <Link
                                href={`/${locale}/privacy`}
                                onClick={e => {
                                    e.preventDefault();
                                    handleNavigation(`/${locale}/privacy`);
                                }}
                                replace
                            >
                                {t('Privacy Policy')}
                            </Link>
                            <Link
                                href={`/${locale}/faq`}
                                onClick={e => {
                                    e.preventDefault();
                                    handleNavigation(`/${locale}/faq`);
                                }}
                                replace
                            >
                                {t('FAQs')}
                            </Link>
                            <Link
                                href={`/${locale}/mice`}
                                onClick={e => {
                                    e.preventDefault();
                                    handleNavigation(`/${locale}/mice`);
                                }}
                                replace
                            >
                                {t('Mice')}
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div
                            className={`${style.footerLinks} d-flex flex-column align-items-lg-start align-items-center justify-content-center`}
                        >
                            <Register
                                openRegister={openRegister}
                                handleClickOpenRegister={handleClickOpenRegister}
                                handleCloseRegister={handleCloseRegister}
                            />
                            <RegisterAsGuide
                                openRegisterGuide={openRegisterGuide}
                                handleClickOpenRegisterGuide={handleClickOpenRegisterGuide}
                                handleCloseRegisterGuide={handleCloseRegisterGuide}
                            />
                            <RegisterAsAgency
                                openRegisterAgency={openRegisterAgency}
                                handleClickOpenRegisterAgency={handleClickOpenRegisterAgency}
                                handleCloseRegisterAgency={handleCloseRegisterAgency}
                            />
                            <Link
                                className="pt-0"
                                href={`/${locale}/parnershipTerms`}
                                onClick={e => {
                                    e.preventDefault();
                                    handleNavigation(`/${locale}/parnershipTerms`);
                                }}
                                replace
                            >
                                {t('Partnership terms')}
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className={style.footerAddressBox}>
                            <div
                                className={`${style.footerAddress} d-flex justify-content-start align-items-center gap-2 mb-2`}
                            >
                                <LocationOnIcon />
                                <p className="m-0">{footerData?.address || t('No Data Found')}</p>
                            </div>
                            <div
                                className={`${style.footerAddress} d-flex justify-content-start align-items-center gap-2 mb-2`}
                            >
                                <PhoneIcon />
                                <div>
                                    <Link className={style.links} href={`tel:${footerData?.phone}`}>
                                        <p className="m-0">
                                            {footerData?.phone || t('No Data Found')}
                                        </p>
                                    </Link>
                                    {/* <Link className={style.links} href="tel:+20121010101010">
                                        <p className="m-0">+20 (12) 1010101010</p>
                                    </Link> */}
                                </div>
                            </div>
                            <div
                                className={`${style.footerAddress} d-flex justify-content-start align-items-center gap-2 mb-2`}
                            >
                                <EmailIcon />
                                <Link className={style.links} href={`mailto:${footerData?.email}`}>
                                    <p className="m-0">{footerData?.email}</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="d-flex flex-lg-row flex-column  justify-content-between align-items-center gap-3">
                    <div className="d-flex justify-content-center align-items-center gap-3">
                        <Link href={footerData?.fb || ''}>
                            <FacebookRoundedIcon
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    color: '#593100',
                                    fontSize: '45px',
                                    transition: '0.3s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: '#593100',
                                        color: 'white',
                                        transform: 'scale(1.1)',
                                        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                                    },
                                }}
                            />
                        </Link>
                        <Link href={footerData?.whats || ''}>
                            <WhatsAppIcon
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    color: '#593100',
                                    fontSize: '45px',
                                    transition: '0.3s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: '#593100',
                                        color: 'white',
                                        transform: 'scale(1.1)',
                                        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                                    },
                                }}
                            />
                        </Link>
                        <Link href={footerData?.insta || ''}>
                            <InstagramIcon
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    color: '#593100',
                                    fontSize: '45px',
                                    transition: '0.3s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: '#593100',
                                        color: 'white',
                                        transform: 'scale(1.1)',
                                        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                                    },
                                }}
                            />
                        </Link>
                        <Link href={footerData?.tw || ''}>
                            <XIcon
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    color: '#593100',
                                    fontSize: '45px',
                                    transition: '0.3s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: '#593100',
                                        color: 'white',
                                        transform: 'scale(1.1)',
                                        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                                    },
                                }}
                            />
                        </Link>
                    </div>

                    <div className={style.footerCopyRight}>
                        &copy; {new Date().getFullYear()} {t('All rights reserved for')}{' '}
                        {footerData?.footer_content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
