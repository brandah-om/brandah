'use client';
import React from 'react';
import NavBar from '../navBar/NavBar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import Footer from '../footer/Footer';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

const Hotels = () => {
    return (
        <div>
            <NavBar />
            <div role="presentation" onClick={handleClick}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        MUI
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        Core
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography>
                </Breadcrumbs>
            </div>
            <Footer />
        </div>
    );
};

export default Hotels;
