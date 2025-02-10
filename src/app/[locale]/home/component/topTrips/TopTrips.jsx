import React from 'react';
import style from './topTrips.module.css';

import Link from 'next/link';
import { Vujahday_Script } from 'next/font/google';
import { useLocale } from 'next-intl';

const topTripTitle = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const TopTrips = ({ data }) => {
    const locale = useLocale();
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
                    {data?.slice(0, 2).map(trip => (
                        <div className="col-md-6 mb-3" key={trip.id}>
                            <div className={style.topTripImgSec}>
                                <img
                                    className={`${style.topTripImgRow} img-fluid `}
                                    src={trip.banner || '/homepage/top-trip/3.png'}
                                    alt={trip.name || 'trip Name'}
                                />
                                <div className={style.TopTripsImgCaption}>
                                    <div className="d-flex justify-content-start align-items-center gap-1 flex-wrap">
                                        {trip.description ? (
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: trip.description,
                                                }}
                                            ></p>
                                        ) : (
                                            <p>No description available</p>
                                        )}
                                        <Link href={`/${locale}/trips/${trip.id}`}>Read More</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row mt-lg-4 mb-3">
                    {data?.slice(2, 5).map(trip => (
                        <div className="col-md-4 mb-3" key={trip.id}>
                            <div className={style.topTripImgSec}>
                                <img
                                    className={`${style.topTripImgRow} img-fluid `}
                                    src={trip.banner || '/homepage/top-trip/3.png'}
                                    alt={trip.name || 'trip Name'}
                                />
                                <div className={style.TopTripsImgCaption}>
                                    <div className="d-flex justify-content-start align-items-center gap-1 flex-wrap">
                                        {trip.description ? (
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: trip.description,
                                                }}
                                            ></p>
                                        ) : (
                                            <p>No description available</p>
                                        )}
                                        <Link href={`/${locale}/trips/${trip.id}`}>Read More</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopTrips;
