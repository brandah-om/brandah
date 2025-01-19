import React from 'react';
import { Vujahday_Script } from 'next/font/google';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});
import style from './hotesl.module.css';
import Link from 'next/link';

const Hotels = () => {
    return (
        <div className="px-lg-5 px-2">
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-12 text-center mb-4">
                        <h6 className={`${vujahday.className} ${style.hotelsTitle}`}>
                            wonderful place for you
                        </h6>
                        <h2 className={style.hotelsMailTitle}>Popular Hotels</h2>
                        <p className={style.hotelsCaption}>
                            Explore our popular hotels voted by more than +100,000 customers
                        </p>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className={`${style.cardSection} card`}>
                            <img
                                className="card-img-top"
                                src="/homepage/hotels/1.png"
                                alt="hotels"
                            />
                            <div className="card-body">
                                <h5 className={`${style.cardTitle}`}>Intercity Hotel Nizwa</h5>
                                <p className={`${style.cardBody}`}>
                                    Walking distance from the mall, taxi and bus station.
                                </p>
                                <div className={style.cardRate}>
                                    <div className="ml-2">
                                        <img src="/homepage/hotels/star.png" alt="star" />
                                    </div>
                                    <p className="m-0">4.3</p>
                                </div>
                                <div className={style.cardPrice}>
                                    <p>$ 150</p>
                                    <div>3 nights accomodation</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className={`${style.cardSection} card`}>
                            <img
                                className="card-img-top"
                                src="/homepage/hotels/2.png"
                                alt="hotels"
                            />
                            <div className="card-body">
                                <h5 className={`${style.cardTitle}`}>Golden Tulip Nizwa</h5>
                                <p className={`${style.cardBody}`}>
                                    The staff at the Golden Tulip work really hard to make your stay
                                    there a great experience.
                                </p>
                                <div className={style.cardRate}>
                                    <div className="ml-2">
                                        <img src="/homepage/hotels/star.png" alt="star" />
                                    </div>
                                    <p className="m-0">4.3</p>
                                </div>
                                <div className={style.cardPrice}>
                                    <p>$ 200</p>
                                    <div>3 nights accomodation</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className={`${style.cardSection} card`}>
                            <img
                                className="card-img-top"
                                src="/homepage/hotels/3.png"
                                alt="hotels"
                            />
                            <div className="card-body">
                                <h5 className={`${style.cardTitle}`}>Date Palm Inn</h5>
                                <p className={`${style.cardBody}`}>
                                    I have only extremely positive things to say about my stay.
                                </p>
                                <div className={style.cardRate}>
                                    <div className="ml-2">
                                        <img src="/homepage/hotels/star.png" alt="star" />
                                    </div>
                                    <p className="m-0">4.3</p>
                                </div>
                                <div className={style.cardPrice}>
                                    <p>$ 120</p>
                                    <div>3 nights accomodation</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className={`${style.cardSection} card`}>
                            <img
                                className="card-img-top"
                                src="/homepage/hotels/1.png"
                                alt="hotels"
                            />
                            <div className="card-body">
                                <h5 className={`${style.cardTitle}`}>Aldar Inn</h5>
                                <p className={`${style.cardBody}`}>
                                    Walking distance from the mall, taxi and bus station.
                                </p>
                                <div className={style.cardRate}>
                                    <div className="ml-2">
                                        <img src="/homepage/hotels/star.png" alt="star" />
                                    </div>
                                    <p className="m-0">4.3</p>
                                </div>
                                <div className={style.cardPrice}>
                                    <p>$ 135</p>
                                    <div>3 nights accomodation</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${style.cardBtn} col-md-12`}>
                        <Link href='/hotels'>
                            <span>
                            View More Hotels
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hotels;
