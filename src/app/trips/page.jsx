'use client';
import React from 'react';
import NavBar from '@/components/navBar/NavBar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import style from './trips.module.css';
import Newsletter from '../home/component/newsletter/Newsletter';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Oxygen } from 'next/font/google';
import Filter from '@/components/filter/Filter';

const oxygenFont = Oxygen({
    subsets: ['latin'],
    weight: ['400'],
});

const Trips = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <NavBar />
            <div className={style.tripsPage}>
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link className={style.links} underline="hover" href="/">
                            Home
                        </Link>
                        <Typography className={style.subLink} sx={{ color: 'text.primary' }}>
                            Trips
                        </Typography>
                    </Breadcrumbs>
                </div>

                <div className="mt-4 d-flex   justify-content-between align-items-center">
                    <form className="d-flex justify-content-start">
                        <input
                            type="text"
                            className={style.subscribeInput}
                            placeholder="Type here"
                        />
                        <button className={style.subscribeBtn}>Subscribe</button>
                    </form>
                    <Filter
                        open={open}
                        handleClickOpen={handleClickOpen}
                        handleClose={handleClose}
                    />
                </div>
                <div className="container-fluid mt-5">
                    <div className="row">
                        {[...Array(12)].map((_, index) => (
                            <div key={index} className="col-md-3 mb-3">
                                <div className={`${style.cardSection} card`}>
                                    <img
                                        className="card-img-top"
                                        src="/homepage/top-trip/2.jpeg"
                                        alt="trips"
                                    />
                                    <div className="card-body">
                                        <h5 className={style.cardTitle}>
                                            4 Days Nizwa & Tomisaa Tour Package – Travel Deal
                                        </h5>
                                        <div className={style.cardBody}>
                                            <TimerOutlinedIcon sx={{ color: '#DB944B' }} />
                                            <p className={oxygenFont.className}>4 Days/3 Nights</p>
                                        </div>
                                        <div className={style.cardBody}>
                                            <CalendarTodayOutlinedIcon sx={{ color: '#DB944B' }} />
                                            <p className={oxygenFont.className}>
                                                Availability : Everyday
                                            </p>
                                        </div>

                                        <div className={style.cardPrice}>
                                            <p>$ 135 /pac</p>
                                            <div>by Brandah Agency</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Newsletter />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trips;
