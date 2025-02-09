'use client';
import Link from 'next/link';
import React from 'react';
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
import RegisterAsAgencey from '../RegisterAsAgencey/RegisterAsAgencey';
import { useLocale, useTranslations } from 'next-intl';

const Footer = () => {
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

    const [openRegisterAgencey, setOpenRegisterAgencey] = React.useState(false);

    const handleClickOpenRegisterAgencey = () => {
        setOpenRegisterAgencey(true);
    };
    const handleCloseRegisterAgencey = () => {
        setOpenRegisterAgencey(false);
    };

    const locale = useLocale();
    const t = useTranslations('HomePage');


    return (
        <div className={style.footer}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <div className={`${style.footerLinks} d-flex flex-column`}>
                            <Link href={`/${locale}/hotels`} replace>
                                Hotels
                            </Link>
                            <Link href={`/${locale}/tourguide`} replace>
                                tour guides
                            </Link>
                            <Link href={`/${locale}/trips`} replace>
                                trips
                            </Link>
                            <Link href={`/${locale}/transportation`}>Transportation</Link>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className={`${style.footerLinks} d-flex flex-column`}>
                            <Link href={`/${locale}/aboutUs`} replace>
                                About Us
                            </Link>
                            <Link href={`/${locale}/contactUs`} replace>
                                Contact Us
                            </Link>
                            <Link href={`/${locale}/blogs`} replace>
                                Blogs
                            </Link>
                            <Link href={`/${locale}/mice`} replace>
                                Mice
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className={`${style.footerLinks} d-flex flex-column`}>
                            <Link href={`/${locale}/userTerms`} replace>
                                Terms of usage
                            </Link>
                            <Link href={`/${locale}/privacy`} replace>
                                Privacy Policy
                            </Link>
                            <Link href={`/${locale}/faq`} replace>
                                FAQs
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div
                            className={`${style.footerLinks} d-flex flex-column align-items-start`}
                        >
                            <RegisterAsGuide
                                openRegisterGuide={openRegisterGuide}
                                handleClickOpenRegisterGuide={handleClickOpenRegisterGuide}
                                handleCloseRegisterGuide={handleCloseRegisterGuide}
                            />
                            <Register
                                openRegister={openRegister}
                                handleClickOpenRegister={handleClickOpenRegister}
                                handleCloseRegister={handleCloseRegister}
                            />
                            <RegisterAsAgencey
                                openRegisterAgencey={openRegisterAgencey}
                                handleClickOpenRegisterAgencey={handleClickOpenRegisterAgencey}
                                handleCloseRegisterAgencey={handleCloseRegisterAgencey}
                            />
                            <Link className="pt-0" href={`/${locale}/parnershipTerms`} replace>
                                Partnership terms
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className={style.footerAddressBox}>
                            <div
                                className={`${style.footerAddress} d-flex justify-content-start align-items-center gap-2 mb-2`}
                            >
                                <LocationOnIcon />
                                <p className="m-0">Lorem ipsum dolor sit amet, consectetur</p>
                            </div>
                            <div
                                className={`${style.footerAddress} d-flex justify-content-start align-items-center gap-2 mb-2`}
                            >
                                <PhoneIcon />
                                <div>
                                    <Link className={style.links} href="tel:+20121010101010">
                                        <p className="m-0">+20 (12) 1010101010</p>
                                    </Link>
                                    <Link className={style.links} href="tel:+20121010101010">
                                        <p className="m-0">+20 (12) 1010101010</p>
                                    </Link>
                                </div>
                            </div>
                            <div
                                className={`${style.footerAddress} d-flex justify-content-start align-items-center gap-2 mb-2`}
                            >
                                <EmailIcon />
                                <Link className={style.links} href="mailto:+info@brandah.com">
                                    <p className="m-0">info@brandah.com</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="d-flex flex-lg-row flex-column  justify-content-between align-items-center ">
                    <div className="d-flex justify-content-center align-items-center gap-3">
                        <Link href="/">
                            <FacebookRoundedIcon
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    color: '#593100',
                                    fontSize: '45px',
                                }}
                            />
                        </Link>
                        <Link href="/">
                            <WhatsAppIcon
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    color: '#593100',
                                    fontSize: '45px',
                                }}
                            />
                        </Link>
                        <Link href="/">
                            <InstagramIcon
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    color: '#593100',
                                    fontSize: '45px',
                                }}
                            />
                        </Link>
                        <Link href="/">
                            <XIcon
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    color: '#593100',
                                    fontSize: '45px',
                                }}
                            />
                        </Link>
                    </div>
                    <div className={style.footerCopyRight}>
                    &copy; {new Date().getFullYear()} {t('All rights reserved for Brandah')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
