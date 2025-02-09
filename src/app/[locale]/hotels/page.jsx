'use client';
import React from 'react';
import NavBar from '@/components/navBar/NavBar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import style from './hotels.module.css';
import Newsletter from '../home/component/newsletter/Newsletter';
import Filter from '@/components/filter/Filter';
import { useGetHotelsQuery } from '@/store/hotels/hotelsApiSlice';
import Loading from '@/components/Loading/Loading';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';

const Hotels = () => {
    // const hotelsData = [
    //     {
    //         id: 1,
    //         title: 'Intercity Hotel Nizwa',
    //         description: 'Walking distance from the mall, taxi and bus station.',
    //         rating: '4.3',
    //         price: '$150',
    //         nights: '3 nights accomodation',
    //         image: '/homepage/hotels/1.png',
    //     },
    //     {
    //         id: 2,
    //         title: 'Golden Tulip Nizwa',
    //         description:
    //             'The staff at the Golden Tulip work really hard to make your stay there a great experience.',
    //         rating: '4.3',
    //         price: '$200',
    //         nights: '3 nights accomodation',
    //         image: '/homepage/hotels/2.png',
    //     },
    //     {
    //         id: 3,
    //         title: 'Date Palm Inn',
    //         description: 'I have only extremely positive things to say about my stay.',
    //         rating: '4.3',
    //         price: '$120',
    //         nights: '3 nights accomodation',
    //         image: '/homepage/hotels/3.png',
    //     },
    //     {
    //         id: 4,
    //         title: 'Aldar Inn',
    //         description: 'Walking distance from the mall, taxi and bus station.',
    //         rating: '4.3',
    //         price: '$135',
    //         nights: '3 nights accomodation',
    //         image: '/homepage/hotels/1.png',
    //     },
    // ];
    // const repeatedData = Array(3).fill(hotelsData).flat();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { data, error, isLoading } = useGetHotelsQuery();

    return (
        <div>
            <NavBar />
            <ToastContainer />
            <div className={style.hotelsPage}>
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link className={style.links} underline="hover" href="/">
                            Home
                        </Link>
                        <Typography className={style.subLink} sx={{ color: 'text.primary' }}>
                            Hotels
                        </Typography>
                    </Breadcrumbs>
                </div>

                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <p>Error loading page content.</p>
                ) : (
                    <>
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
                                {data.data.map(hotel => (
                                    <Link
                                        href={`/hotels/${hotel.id}`}
                                        style={{ textDecoration: 'none' }}
                                        className="col-md-3 mb-3"
                                        key={hotel.id}
                                    >
                                        <div
                                            className={`${style.cardSection} card`}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <img
                                                className={style.cardSectionImg}
                                                src={hotel.images}
                                                alt={hotel.name}
                                            />
                                            {/* <Image
                                        src={hotel.images.replace(/\\/g, '')} 
                                        alt={hotel.name}
                                        fill
                                        style={{
                                            objectFit: 'cover',
                                        }}
                                    /> */}

                                            <div className="card-body">
                                                <h5 className={`${style.cardTitle}`}>
                                                    {hotel.name || 'No Name'}
                                                </h5>
                                                <p className={`${style.cardBody}`}>
                                                    {hotel.description || 'No Desc'}
                                                </p>
                                                <div className={style.cardRate}>
                                                    <div className="ml-2">
                                                        <img
                                                            src="/homepage/hotels/star.png"
                                                            alt="star"
                                                        />
                                                    </div>
                                                    <p className="m-0">
                                                        {hotel.rating || 'no rate'}
                                                    </p>
                                                </div>
                                                <div className={style.cardPrice}>
                                                    <p>
                                                        {hotel.price || 'No price'}
                                                        {hotel.currency}
                                                    </p>
                                                    <div>{hotel.days} nights accomodation</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}

                                <Newsletter />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Hotels;
