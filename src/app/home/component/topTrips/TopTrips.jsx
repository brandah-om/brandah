import React from 'react';
import style from './topTrips.module.css';

import { Vujahday_Script } from 'next/font/google';
import Link from 'next/link';

const topTripTitle = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const TopTrips = () => {
    return (
        <div className={style.topTrips}>
            <div className="container">
                <div className="row">
                    <div className={`${style.TopTripsCaption} col-md-12 mb-3`}>
                        <h6 className={topTripTitle.className}>Make Your Tour More Pleasure</h6>
                        <h4>Top Trips</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        </p>
                    </div>

                    <div className="col-md-6 mb-3">
                        <div className={style.topTripImgSec}>
                            <img
                                className="img-fluid"
                                src="/homepage/top-trip/1.jpeg"
                                alt="top-trip"
                            />
                            <div className={style.TopTripsImgCaption}>
                                <h6>Lorem ipsum dolor sit amet</h6>
                                <div className="d-flex justify-content-start align-items-center gap-1 flex-wrap">
                                    <p>Consectetur adipiscing elit, sed do eiusmod</p>
                                    <Link href="/">Read More</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <div className={style.topTripImgSec}>
                            <img
                                className="img-fluid"
                                src="/homepage/top-trip/2.jpeg"
                                alt="top-trip"
                            />
                            <div className={style.TopTripsImgCaption}>
                                <h6>Lorem ipsum dolor sit amet</h6>
                                <div className="d-flex justify-content-start align-items-center gap-1 flex-wrap">
                                    <p>Consectetur adipiscing elit, sed do eiusmod</p>
                                    <Link href="/">Read More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-lg-4 mb-3">
                    <div className="col-md-4 mb-3">
                        <div className={style.topTripImgSec}>
                            <img
                                className={`${style.topTripImgRow} img-fluid `}
                                src="/homepage/top-trip/3.png"
                                alt="top-trip"
                            />
                            <div className={style.TopTripsImgCaption}>
                                <h6>Lorem ipsum dolor sit amet</h6>
                                <div className="d-flex justify-content-start align-items-center gap-1 flex-wrap">
                                    <p>Consectetur adipiscing elit, sed do eiusmod</p>
                                    <Link href="/">Read More</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className={style.topTripImgSec}>
                            <img
                                className={`${style.topTripImgRow} img-fluid `}
                                src="/homepage/top-trip/4.jpeg"
                                alt="top-trip"
                            />
                            <div className={style.TopTripsImgCaption}>
                                <h6>Lorem ipsum dolor sit amet</h6>
                                <div className="d-flex justify-content-start align-items-center gap-1 flex-wrap">
                                    <p>Consectetur adipiscing elit, sed do eiusmod</p>
                                    <Link href="/">Read More</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className={style.topTripImgSec}>
                            <img
                                className={`${style.topTripImgRow} img-fluid `}
                                src="/homepage/top-trip/5.png"
                                alt="top-trip"
                            />
                            <div className={style.TopTripsImgCaption}>
                                <h6>Lorem ipsum dolor sit amet</h6>
                                <div className="d-flex justify-content-start align-items-center gap-1 flex-wrap">
                                    <p>Consectetur adipiscing elit, sed do eiusmod</p>
                                    <Link href="/">Read More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopTrips;
