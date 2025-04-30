'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import style from './navbar.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Menu from '@mui/material/Menu';
import { useGetLanguageQuery } from '../../../../../store/languages/AlllanguagesSlice';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../../../../store/login/LoginApiSlice';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Loading from '../../../../../components/Loading/Loading';
import { useGetSiteQuery } from '../../../../../store/States/SitesCategorySlice';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Cookies from 'js-cookie';
import { useGetSearchQuery } from '../../../../../store/Search/SearchSlice';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from 'sweetalert2';

const NavBar = () => {
    const [isSubscribed, setIsSubscribed] = useState(null);
    const [token, setToken] = useState(null);
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);
    const toggleDrawer = open => () => {
        setIsDrawerOpen(open);
    };
    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    useEffect(() => {
        const userToken = Cookies.get('token') || null;
        const subscriptionStatus = Cookies.get('is_subscribed') === 'true';

        setToken(userToken);
        setIsSubscribed(subscriptionStatus);
    }, []);

    const handleNavigation = path => {
        toggleDrawer(false);

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
                html: `
                    <div class='d-flex justify-content-between align-items-center flex-lg-row flex-column gap-2'>
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
                    const swalContainer = document.querySelector('.swal2-container');
                    if (swalContainer) {
                        swalContainer.style.zIndex = '9999';
                    }
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
        toggleDrawer(false);
    };

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [userName, setUserName] = useState(null);
    const t = useTranslations('HomePage');

    const { data: lang } = useGetLanguageQuery();

    const locale = useLocale();
    const pathname = usePathname();
    const [selectedLang, setSelectedLang] = useState(locale);

    useEffect(() => {
        setSelectedLang(locale);
    }, [locale]);

    const handleChangeLang = event => {
        const newLocale = event.target.value;
        const isValidLocale = lang?.data?.some(language => language.abbr === newLocale);

        if (isValidLocale) {
            const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
            router.push(newPathname);
            setSelectedLang(newLocale);
        } else {
            console.warn('Invalid language selected:', newLocale);
        }
    };

    const isRTL = locale === 'ar';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        const token = localStorage.getItem('token');
        const firstName = localStorage.getItem('firstName');
        const name = localStorage.getItem('name');

        setUserName(token ? firstName || name : null);

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [open, setOpen] = React.useState(false);
    const [openSites, setOpenSites] = React.useState(false);

    const [openSearch, setOpenSearch] = useState(false);
    const [openResults, setOpenResults] = useState(false);
    const [city, setCity] = useState('');
    const [searchType, setSearchType] = useState('states');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const {
        data: dataSearch,
        error: searchError,
        isLoading: searchLoading,
    } = useGetSearchQuery({ query: city, type: searchType, lang: locale }, { skip: !isSearching });

    const handleOpenSearch = () => setOpenSearch(true);

    const handleCloseSearch = () => {
        setOpenSearch(false);
        setResults([]);
    };

    const handleSearch = () => {
        if (!city && !searchType) {
            toast.error(t('Please select at least one option'));
            return;
        }
        setIsSearching(true);
        setOpenResults(true);
        setOpenSearch(false);
    };

    const searchTypeMap = {
        agencies: 'agency',
        states: 'destinations',
        tour_guides: 'tourguide',
    };

    const path = searchTypeMap[searchType] || searchType;

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        localStorage.clear();
        Cookies.remove('token');
        Cookies.remove('is_subscribed');
        setUserName(null);
        setAnchorEl(null);

        window.location.reload();
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(prev => (prev ? null : event.currentTarget));
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const [login, { isLoading, error }] = useLoginMutation();

    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = React.useState({
        email: '',
        password: '',
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const savedEmail = localStorage.getItem('registeredEmail');
        if (savedEmail) {
            setFormData(prev => ({
                ...prev,
                email: savedEmail,
            }));
        }
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = t('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('Please enter a valid email address');
        }

        if (!formData.password) {
            newErrors.password = t('Password is required');
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

        for (const key in formData) {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        }

        try {
            const result = await login(data).unwrap();
            console.log('User signing in:', result);

            const translatedMessage =
                result?.message === 'Login successful!' ? t('loginSuccess') : result?.message;

            toast.success(translatedMessage, {
                position: locale === 'ar' ? 'top-left' : 'top-right',
                autoClose: 3000,
                theme: 'colored',
                rtl: locale === 'ar',
                style: { backgroundColor: '#B18D61', color: 'white' },
                progressStyle: {
                    direction: locale === 'ar' ? 'rtl' : 'ltr',
                },
            });

            localStorage.setItem('token', result.token);
            // localStorage.setItem('is_subscribed', result.user.is_subscribed);
            localStorage.setItem('firstName', result.user.first_name);
            localStorage.setItem('lastName', result.user.last_name);
            localStorage.setItem('email', result.user.email);
            localStorage.setItem('phone', result.user.phone);
            localStorage.setItem('userId', result.user.id);
            localStorage.setItem('role', result.user.type);
            localStorage.setItem('name', result.user.name);
            Cookies.set('token', result.token, { expires: 7 });
            Cookies.set('is_subscribed', result.user.is_subscribed, { expires: 7 });

            setUserName(result.user.first_name);
            setAnchorEl(null);
            handleClose();
            
            const token = result.token;
            const role = result.user.type;
            if (role !== 'user') {
                window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/login?token=${token}`;
            } else if (!result.user.is_subscribed) {
                toast.warning('You are not subscribed! Please subscribe to continue.', {
                    position: locale === 'ar' ? 'top-left' : 'top-right',
                    autoClose: 3000,
                    theme: 'colored',
                    rtl: locale === 'ar',
                    style: { backgroundColor: '#FF9800', color: 'white' },
                    progressStyle: {
                        direction: locale === 'ar' ? 'rtl' : 'ltr',
                    },
                });
                localStorage.removeItem('registeredEmail');

                setTimeout(() => {
                    router.push(`/${locale}/subscribe`);
                }, 3000);
            } else {
                setTimeout(() => {
                    window.location.href = `/${locale}`;
                }, 3000);
            }
        } catch (err) {
            console.error('Signing in Failed:', err);

            const translatedErrMessage =
                err?.data?.message === 'Invalid credentials.'
                    ? t('loginError')
                    : err?.data?.message;

            toast.error(translatedErrMessage || t('Sign in failed'), {
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

    const { data } = useGetSiteQuery(locale);

    const handleSelectCategory = () => {
        router.push(`/${locale}/destinations`);
        handleClose();
    };

    const isActive = path => {
        return pathname === `/${locale}${path}` || (path === '/' && pathname === `/${locale}`);
    };

    return (
        <div>
            <div
                className={`${style.navbar} ${
                    isScrolled ? style.scrolled : ''
                } container-fluid d-flex justify-content-between align-items-center`}
            >
                {/* Links and Toggle Button */}
                <div className="d-flex align-items-center justify-content-center">
                    <div className="d-block d-lg-none">
                        <IconButton onClick={toggleDrawer(true)}>
                            <MenuIcon sx={{ color: isScrolled ? '#000' : '#FFF' }} />
                        </IconButton>
                    </div>

                    {/* Links - Desktop */}
                    <div className="d-none d-lg-flex justify-content-between align-items-center gap-3">
                        <Link
                            className={`${style.navbarLink} ${
                                isActive('/') ? style.activeLink : ''
                            }`}
                            href={`/${locale}`}
                            replace
                        >
                            {t('Home')}
                        </Link>
                        <Link
                            className={style.navbarLink}
                            href={`/${locale}/destinations`}
                            onClick={e => {
                                e.preventDefault();
                                handleNavigation(`/${locale}/destinations`);
                            }}
                            replace
                        >
                            {t('States')}
                        </Link>
                        <Link
                            className={style.navbarLink}
                            href={`/${locale}/transportation`}
                            onClick={e => {
                                e.preventDefault();
                                handleNavigation(`/${locale}/transportation`);
                            }}
                            replace
                        >
                            {t('Transportation')}
                        </Link>
                        <Link
                            className={style.navbarLink}
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
                            className={style.navbarLink}
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
                            className={style.navbarLink}
                            href={`/${locale}/tourguide`}
                            replace
                            onClick={e => {
                                e.preventDefault();
                                handleNavigation(`/${locale}/tourguide`);
                            }}
                        >
                            {t('Tour Guides')}
                        </Link>
                        <Link
                            className={style.navbarLink}
                            href={`/${locale}/trips`}
                            replace
                            onClick={e => {
                                e.preventDefault();
                                handleNavigation(`/${locale}/trips`);
                            }}
                        >
                            {t('Trips')}
                        </Link>
                        {!isSubscribed && (
                            <Link
                                className={style.navbarLink}
                                href={`/${locale}/subscribe`}
                                replace
                            >
                                {t('Subscribe')}
                            </Link>
                        )}
                    </div>
                </div>

                {/* Login and Language Selector (Desktop) */}

                <div className="d-none d-lg-flex justify-content-center align-items-center gap-4">
                    <Button
                        variant="contained"
                        onClick={handleOpenSearch}
                        // onClick={() => {
                        //     if (!isSubscribed) {
                        //         toast.error(
                        //             t('You must be logged in and subscribed to access this feature')
                        //         );
                        //         return;
                        //     }
                        //     handleOpenSearch();
                        // }}
                        sx={{ bgcolor: '#9F733C', color: 'white', textTransform: 'capitalize' }}
                    >
                        {t('Search')}
                    </Button>

                    <div style={{ width: '123px' }}>
                        <FormControl fullWidth variant="outlined">
                            <Select
                                labelId="language-select-label"
                                id="language-select"
                                value={
                                    lang?.data?.some(language => language.abbr === selectedLang)
                                        ? selectedLang
                                        : ''
                                }
                                onChange={handleChangeLang}
                                // onChange={changeLanguage}
                                // onChange={event => setSelectedLang(event.target.value)}
                                className={style.MuiSelec}
                                sx={{
                                    width: '100%',
                                    // border: 'none',
                                    border: '1px solid #9F733C',
                                    '.MuiSelect-icon': {
                                        color: isScrolled ? '#9F733C' : '#FFFFFF',
                                        right: selectedLang === 'ar' ? 'auto' : '7px',
                                        left: selectedLang === 'ar' ? '7px' : 'auto',
                                    },
                                    '.MuiOutlinedInput-notchedOutline': {
                                        display: 'none',
                                    },
                                    '& .MuiSelect-select': {
                                        color: isScrolled ? '#9F733C' : '#FFFFFF',
                                        fontWeight: '500',
                                        fontSize: '15px',
                                        backgroundColor: isScrolled ? '#FFF' : 'transparent',
                                        transition: 'all 0.3s ease',
                                    },
                                }}
                            >
                                {lang?.data?.map(language => (
                                    <MenuItem key={language.id} value={language.abbr}>
                                        {language.name.charAt(0).toUpperCase() +
                                            language.name.slice(1).toLowerCase()}
                                    </MenuItem>
                                ))}
                                {/* <MenuItem value="en">English</MenuItem>
                                <MenuItem value="ar">اللغه العربية</MenuItem> */}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="d-flex justify-content-center align-items-center gap-1">
                        {userName ? (
                            <div className="d-flex justify-content-between align-items-center">
                                <IconButton onClick={handleClick}>
                                    <AccountCircleIcon className={style.profileIcon} />
                                </IconButton>
                                <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
                                    <MenuItem>
                                        <Link
                                            className="text-dark text-decoration-none"
                                            href={`/${locale}/MyAccount`}
                                        >
                                            {t('Profile')}
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>{t('Log Out')}</MenuItem>
                                </Menu>
                                <span
                                    onClick={handleClick}
                                    style={{ cursor: 'pointer' }}
                                    className={style.welcome}
                                >
                                    {t('Welcome')} {userName}
                                </span>
                            </div>
                        ) : (
                            <Button
                                onClick={handleClickOpen}
                                className={`${style.navbarLink} ${style.navbarLinkLogin}`}
                            >
                                {t('Sign In')}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Drawer for Mobile */}
            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    sx={{
                        width: 250,
                        height: '100%',
                        backgroundColor: '#9F733C',
                        color: '#FFF',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.25,
                        padding: 2,
                        textAlign: 'left',
                        overflow: 'auto',
                    }}
                >
                    {/* Close Button */}
                    <IconButton onClick={toggleDrawer(false)} sx={{ alignSelf: 'flex-end' }}>
                        <CloseIcon sx={{ color: '#FFFFFF' }} />
                    </IconButton>

                    {/* Links */}
                    <div className="d-flex flex-column gap-3">
                        <Link className={style.navbarLink} href={`/${locale}/`} replace>
                            {t('Home')}
                        </Link>
                        <Link
                            className={style.navbarLink}
                            href={`/${locale}/destinations`}
                            onClick={e => {
                                e.preventDefault();
                                handleNavigation(`/${locale}/destinations`);
                            }}
                            replace
                        >
                            {t('States')}
                        </Link>
                        <Link
                            className={style.navbarLink}
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
                            className={style.navbarLink}
                            href={`/${locale}/transportation`}
                            onClick={e => {
                                e.preventDefault();
                                handleNavigation(`/${locale}/transportation`);
                            }}
                            replace
                        >
                            {t('Transportation')}
                        </Link>
                        <Link
                            className={style.navbarLink}
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
                            className={style.navbarLink}
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
                            className={style.navbarLink}
                            href={`/${locale}/trips`}
                            onClick={e => {
                                e.preventDefault();
                                handleNavigation(`/${locale}/trips`);
                            }}
                            replace
                        >
                            {t('Trips')}
                        </Link>
                        {!isSubscribed && (
                            <Link
                                className={style.navbarLink}
                                href={`/${locale}/subscribe`}
                                replace
                            >
                                {t('Subscribe')}
                            </Link>
                        )}

                        <div>
                            <button
                                className="text-white bg-transparent border-0 d-flex align-items-center"
                                onClick={() => setOpenSites(!openSites)}
                            >
                                {t('Sites')}
                                {openSites ? (
                                    <ExpandLessIcon sx={{ color: '#FFF', marginLeft: 1 }} />
                                ) : (
                                    <ExpandMoreIcon sx={{ color: '#FFF', marginLeft: 1 }} />
                                )}
                            </button>

                            <Collapse in={openSites}>
                                <List component="nav">
                                    {data?.data.map(category => (
                                        <ListItemButton
                                            key={category.id}
                                            // onClick={e => {
                                            //     e.preventDefault();
                                            //     handleNavigation(`/${locale}/destinations`);
                                            // }}
                                        >
                                            <Link
                                                className={style.navbarLink}
                                                href={`/${locale}/destinations`}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    handleNavigation(`/${locale}/destinations`);
                                                }}
                                            >
                                                {category.name}
                                            </Link>
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        </div>
                    </div>

                    {/* Login and Language Selector */}

                    <div className={`${style.navbarlogin} d-flex flex-column gap-3`}>
                        <div
                            onClick={() => {
                                if (!isSubscribed) {
                                    toast.error(
                                        t(
                                            'You must be logged in and subscribed to access this feature'
                                        )
                                    );
                                    return;
                                }
                                handleOpenSearch();
                            }}
                            className={style.navbarLink}
                        >
                            {t('Search')}
                        </div>

                        <FormControl fullWidth variant="outlined">
                            <Select
                                value={
                                    lang?.data?.some(language => language.abbr === selectedLang)
                                        ? selectedLang
                                        : ''
                                }
                                onChange={handleChangeLang}
                                sx={{
                                    color: '#FFFFFF',
                                    fontWeight: '500',
                                    fontSize: '15px',
                                    textAlign: selectedLang === 'ar' ? 'right' : 'left',
                                    '.MuiSelect-icon': {
                                        color: '#FFFFFF',
                                        right: selectedLang === 'ar' ? 'auto' : '7px',
                                        left: selectedLang === 'ar' ? '7px' : 'auto',
                                    },
                                    '.MuiOutlinedInput-notchedOutline': { display: 'none' },
                                }}
                            >
                                {lang?.data?.map(language => (
                                    <MenuItem key={language.id} value={language.abbr}>
                                        {language.name.charAt(0).toUpperCase() +
                                            language.name.slice(1).toLowerCase()}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    {/* Search */}
                    {/* <div className="position-relative">
                        <SearchIcon
                            className="position-absolute"
                            sx={{ color: '#FFFFFF', left: '20px', top: '5px', width: '20px' }}
                        />
                        <input
                            className={style.searchinput}
                            type="search"
                            placeholder={t('search')}
                            style={{ textAlign: 'left' }}
                        />
                    </div> */}

                    <div className="d-flex justify-content-start align-items-center gap-1">
                        {userName ? (
                            <div className="d-flex justify-content-start align-items-center">
                                <IconButton onClick={handleClick}>
                                    <AccountCircleIcon className={style.profileIcon} />
                                </IconButton>
                                <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
                                    <MenuItem>
                                        <Link
                                            className="text-dark text-decoration-none"
                                            href={`/${locale}/MyAccount`}
                                        >
                                            {t('Profile')}
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>{t('Log Out')}</MenuItem>
                                </Menu>
                                <span
                                    onClick={handleClick}
                                    style={{ cursor: 'pointer' }}
                                    className={style.welcome}
                                >
                                    {t('Welcome')} {userName}
                                </span>
                            </div>
                        ) : (
                            <Button
                                onClick={handleClickOpen}
                                className={`${style.navbarLink} ${style.navbarLinkLogin}`}
                            >
                                {t('Sign In')}
                            </Button>
                        )}
                    </div>
                </Box>
            </Drawer>

            {/* login Dialog */}
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="sm"
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={theme => ({
                        position: 'absolute',
                        [isRTL ? 'left' : 'right']: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <div className="container">
                        <div className="row">
                            {isLoading && <Loading />}

                            <div className="d-flex justify-content-center">
                                <img className={style.logoImg} src="/brandah-logo.png" alt="logo" />
                            </div>
                            <form action="" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12 d-flex flex-column">
                                        <label className={`${style.label}`}>
                                            {t('Email')} <span style={{ color: '#C64E4E' }}>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="text"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && (
                                            <span className={style.errorText}>{errors.email}</span>
                                        )}
                                    </div>
                                    <div className="col-md-12 position-relative d-flex flex-column mt-3">
                                        <label className={`${style.label}`}>
                                            {t('Password')}{' '}
                                            <span style={{ color: '#C64E4E' }}>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="*******"
                                        />
                                        <IconButton
                                            onClick={togglePasswordVisibility}
                                            edge="end"
                                            sx={{
                                                position: 'absolute',
                                                right: '30px',
                                                top: '62%',
                                                transform: 'translateY(-50%)',
                                                color: '#666',
                                            }}
                                        >
                                            {showPassword ? (
                                                <VisibilityIcon />
                                            ) : (
                                                <VisibilityOffIcon />
                                            )}
                                        </IconButton>
                                        {errors.password && (
                                            <span className={style.errorText}>
                                                {errors.password}
                                            </span>
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                                        <div>
                                            <p className={`${style.notHaveAccount} mt-4`}>
                                                {t('Don’t have account?')}
                                                <Link href={`/${locale}/RegisterTourist`}>
                                                    {t('Sign Up')}
                                                </Link>
                                            </p>
                                        </div>
                                        <div>
                                            <Link
                                                href={`/${locale}/forgetPassword`}
                                                className={style.forgetPass}
                                            >
                                                {t('Forgot password?')}
                                            </Link>
                                        </div>
                                    </div>

                                    <div className={style.loginBtn}>
                                        <button type="submit" disabled={isLoading}>
                                            <span>{isLoading ? t('signingIn') : t('Sign In')}</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Search Dialog */}
            <Dialog open={openSearch} onClose={handleCloseSearch} fullWidth>
                <DialogTitle>{t('Search')}</DialogTitle>
                <DialogContent>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 d-flex flex-column">
                                <label className={`${style.label}`}>{t('Search Type')}</label>
                                <FormControl className="w-100">
                                    <Select
                                        className="w-100"
                                        name="searchType"
                                        value={searchType}
                                        sx={{
                                            '.MuiSelect-icon': {
                                                right: selectedLang === 'ar' ? 'auto' : '7px',
                                                left: selectedLang === 'ar' ? '7px' : 'auto',
                                            },
                                        }}
                                        onChange={e => setSearchType(e.target.value)}
                                    >
                                        <MenuItem value="">{t('Select')}</MenuItem>
                                        <MenuItem value="agencies">{t('Agencies')}</MenuItem>
                                        <MenuItem value="trips">{t('Trips')}</MenuItem>
                                        <MenuItem value="states">{t('States')}</MenuItem>
                                        <MenuItem value="transportation">
                                            {t('Transportation')}
                                        </MenuItem>
                                        <MenuItem value="tour_guides">{t('Tour Guides')}</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="col-md-12 d-flex flex-column my-3">
                                <label className={`${style.label}`}>{t('Name')}</label>
                                <input
                                    className={style.contactInput}
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseSearch} color="error">
                        {t('Close')}
                    </Button>
                    <Button
                        onClick={handleSearch}
                        variant="contained"
                        sx={{ bgcolor: '#9F733C', color: 'white' }}
                        disabled={searchLoading}
                    >
                        {searchLoading ? <Loading /> : t('Search')}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Search Result */}
            <Dialog
                open={openResults}
                onClose={() => setOpenResults(false)}
                fullWidth
                // maxWidth="sm"
            >
                <DialogTitle>{t('Search Result')}</DialogTitle>
                <DialogContent>
                    <div className="row">
                        <div className="container-fluid">
                            {searchLoading ? (
                                <Loading />
                            ) : searchError ? (
                                <p>{t('Error Loading Data')}</p>
                            ) : dataSearch?.data?.length > 0 ? (
                                dataSearch.data.map(result => (
                                    <div
                                        key={result.id}
                                        className={`${style.cardSection} col-md-12 mb-4 card`}
                                    >
                                        <Link
                                            className="text-decoration-none"
                                            href={`/${locale}/${path}/${result.id}`}
                                        >
                                            <img
                                                className={`${style.hotelImg} card-img-top`}
                                                src={
                                                    result.banner ||
                                                    result.image ||
                                                    '/homepage/hotels/1.png'
                                                }
                                                alt={result.name || ''}
                                            />
                                            <div className="card-body">
                                                <h5 className={`${style.cardTitle}`}>
                                                    {result.name || ''}
                                                </h5>
                                                {/* <p className={`${style.cardBody}`}>
                                                    {result.description}
                                                </p> */}
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>{t('No Data Found')}</p>
                            )}
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenResults(false)} color="primary">
                        {t('Close')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NavBar;
