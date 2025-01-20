'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import style from './navBar.module.css';
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

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggler = open => () => {
        setIsOpen(open);
    };

    return (
        <div>
            <div
                className={`${style.navBar} container-fluid d-flex justify-content-between align-items-center`}
            >
                {/* Links and Toggle Button */}
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="d-flex align-items-center justify-content-between w-100">
                        {/* Links and Toggle Button */}
                        <div className="d-flex d-lg-none align-items-center justify-content-between w-100">
                            <Link href="/">
                                <img
                                    src="/navbar-logo.png"
                                    alt="Logo"
                                    style={{ width: '70px', height: 'auto' }}
                                />
                            </Link>

                            <IconButton onClick={toggler(true)}>
                                <MenuIcon sx={{ color: '#9F733C' }} />
                            </IconButton>
                        </div>

                        {/* Links - Desktop */}
                        <div className="d-none d-lg-flex justify-content-between align-items-center gap-4">
                            <Link className={` ${style.navBarLogo}`} href="/">
                                <img src="/navbar-logo.png" alt="" />
                            </Link>
                            <Link className={style.navBarLink} href="/hotels">
                                Hotels
                            </Link>
                            {/* <Link className={style.navBarLink} href="/tourguide">
                            Tour Guides
                        </Link> */}
                            <Link className={style.navBarLink} href="/transportation">
                                Transportation
                            </Link>
                            <Link className={style.navBarLink} href="/trips">
                                Trips
                            </Link>
                            <Link className={style.navBarLink} href="/aboutUs">
                                About us
                            </Link>
                        </div>
                    </div>

                    {/* Login and Language Selector (Desktop) */}
                    <div className="d-none d-lg-flex justify-content-center align-items-center gap-4">
                        <div className="d-flex justify-content-center align-items-center gap-1">
                            <AccountCircleIcon sx={{ color: '#9F733C' }} />
                            <Link className={style.navBarLink} href="/login">
                                login
                            </Link>
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
                                            color: '#9F733C',
                                        },
                                        '.MuiOutlinedInput-notchedOutline': {
                                            display: 'none',
                                        },
                                        '& .MuiSelect-select': {
                                            color: '#9F733C',
                                            fontWeight: '500',
                                            fontSize: '15px',
                                            backgroundColor: '#FFF',
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
                                    color: '#9F733C',
                                    left: '20px',
                                    top: '5px',
                                    width: '20px',
                                }}
                            />
                            <input
                                className={style.searchinput}
                                type="search"
                                placeholder="search"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Drawer for Mobile */}
            <Drawer anchor="right" open={isOpen} onClose={toggler(false)}>
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
                    <IconButton onClick={toggler(false)} sx={{ alignSelf: 'flex-end' }}>
                        <CloseIcon sx={{ color: '#FFFFFF' }} />
                    </IconButton>

                    {/* Links */}
                    <div className="d-flex flex-column gap-3">
                        <Link className={style.navBarLinkDrawer} href="/hotels">
                            Hotels
                        </Link>
                        <Link className={style.navBarLinkDrawer} href="/tourguide">
                            Tour Guides
                        </Link>
                        <Link className={style.navBarLinkDrawer} href="/transportation">
                            Transportation
                        </Link>
                        <Link className={style.navBarLinkDrawer} href="/trips">
                            Trips
                        </Link>
                        <Link className={style.navBarLinkDrawer} href="/aboutUs">
                            About us
                        </Link>
                    </div>

                    {/* Login and Language Selector */}
                    <div className={`${style.navBarlogin} d-flex flex-column gap-3`}>
                        <div className="d-flex justify-content-start align-items-center gap-2">
                            <AccountCircleIcon />
                            <Link className={style.navBarLinkDrawer} href="/login">
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
                            className={style.searchinputDrawer}
                            type="search"
                            placeholder="search"
                            style={{ textAlign: 'left' }}
                        />
                    </div>
                </Box>
            </Drawer>
        </div>
    );
};

export default NavBar;
