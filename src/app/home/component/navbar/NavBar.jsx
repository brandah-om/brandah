'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import style from './navbar.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const NavBar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleDrawer = open => () => {
        setIsDrawerOpen(open);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

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
                    <div className="d-none d-lg-flex justify-content-between align-items-center gap-4">
                        <Link className={style.navbarLink} href="/hotels">
                            Hotels
                        </Link>
                        <Link className={style.navbarLink} href="/tourguide">
                            Tour Guides
                        </Link>
                        <Link className={style.navbarLink} href="/transportation">
                            Transportation
                        </Link>
                        <Link className={style.navbarLink} href="/trips">
                            Trips
                        </Link>
                        <Link className={style.navbarLink} href="/aboutUs">
                            About us
                        </Link>
                    </div>
                </div>

                {/* Login and Language Selector (Desktop) */}
                <div className="d-none d-lg-flex justify-content-center align-items-center gap-4">
                    <div className="d-flex justify-content-center align-items-center gap-1">
                        <AccountCircleIcon sx={{ color: isScrolled ? '#9F733C' : '#FFFFFF' }} />
                        {/* <h2 className={style.navbarLink}> */}

                        <Button
                            onClick={handleClickOpen}
                            className={`${style.navbarLink} ${style.navbarLinkLogin}`}
                        >
                            login
                        </Button>

                        {/* </h2> */}
                    </div>
                    <div style={{ width: '123px' }}>
                        <FormControl fullWidth variant="outlined">
                            <Select
                                labelId="language-select-label"
                                id="language-select"
                                defaultValue={'ar'}
                                className={style.MuiSelec}
                                sx={{
                                    width: '100%',
                                    border: 'none',
                                    '.MuiSelect-icon': {
                                        color: isScrolled ? '#9F733C' : '#FFFFFF',
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
                                <MenuItem value={'ar'}>اللغة العربية</MenuItem>
                                <MenuItem value={'en'}>English</MenuItem>
                                <MenuItem value={'it'}>Italiano</MenuItem>
                                <MenuItem value={'de'}>Deutsche</MenuItem>
                                <MenuItem value={'fr'}>Français</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="position-relative">
                        <SearchIcon
                            className="position-absolute"
                            sx={{
                                color: isScrolled ? '#9F733C' : '#FFFFFF',
                                left: '20px',
                                top: '5px',
                                width: '20px',
                            }}
                        />
                        <input className={style.searchinput} type="search" placeholder="search" />
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
                    }}
                >
                    {/* Close Button */}
                    <IconButton onClick={toggleDrawer(false)} sx={{ alignSelf: 'flex-end' }}>
                        <CloseIcon sx={{ color: '#FFFFFF' }} />
                    </IconButton>

                    {/* Links */}
                    <div className="d-flex flex-column gap-3">
                        <Link className={style.navbarLink} href="/hotels">
                            Hotels
                        </Link>
                        <Link className={style.navbarLink} href="/tourguide">
                            Tour Guides
                        </Link>
                        <Link className={style.navbarLink} href="/transportation">
                            Transportation
                        </Link>
                        <Link className={style.navbarLink} href="/trips">
                            Trips
                        </Link>
                        <Link className={style.navbarLink} href="/aboutUs">
                            About us
                        </Link>
                    </div>

                    {/* Login and Language Selector */}
                    <div className={`${style.navbarlogin} d-flex flex-column gap-3`}>
                        <div className="d-flex justify-content-start align-items-center gap-2">
                            <AccountCircleIcon />
                            <Link className={style.navbarLink} href="/login">
                                login
                            </Link>
                        </div>
                        <FormControl fullWidth variant="outlined">
                            <Select
                                defaultValue={'ar'}
                                sx={{
                                    color: '#FFFFFF',
                                    fontWeight: '500',
                                    fontSize: '15px',
                                    '.MuiSelect-icon': { color: '#FFFFFF' },
                                    '.MuiOutlinedInput-notchedOutline': { display: 'none' },
                                }}
                            >
                                <MenuItem value={'ar'}>اللغة العربية</MenuItem>
                                <MenuItem value={'en'}>English</MenuItem>
                                <MenuItem value={'it'}>Italiano</MenuItem>
                                <MenuItem value={'de'}>Deutsche</MenuItem>
                                <MenuItem value={'fr'}>Français</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    {/* Search */}
                    <div className="position-relative">
                        <SearchIcon
                            className="position-absolute"
                            sx={{ color: '#FFFFFF', left: '20px', top: '5px', width: '20px' }}
                        />
                        <input
                            className={style.searchinput}
                            type="search"
                            placeholder="search"
                            style={{ textAlign: 'left' }}
                        />
                    </div>
                </Box>
            </Drawer>

            <React.Fragment>
                <BootstrapDialog
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
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent>
                        <div className="container">
                            <div className="row">
                                <div className="d-flex justify-content-center">
                                    <img className={style.logoImg} src="/navbar-logo.png" alt="" />
                                </div>
                                <div className="col-md-12 d-flex flex-column">
                                    <label className={`${style.label}`}>
                                        Email <span style={{ color: '#C64E4E;' }}>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter Your Email"
                                    />
                                </div>
                                <div className="col-md-12 d-flex flex-column mt-3">
                                    <label className={`${style.label}`}>
                                        Password <span style={{ color: '#C64E4E;' }}>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="Password"
                                        name=""
                                        id=""
                                        placeholder="*******"
                                    />
                                </div>
                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    <div>
                                        <p className={`${style.notHaveAccount} mt-4`}>
                                            Don’t have account?
                                            <Link href="/">sign up</Link>
                                        </p>
                                    </div>
                                    <div>
                                        <Link href="/" className={style.forgetPass}>
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>

                                <div className={style.loginBtn}>
                                    <button>
                                        <span>LOGIN</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </BootstrapDialog>
            </React.Fragment>
        </div>
    );
};

export default NavBar;
