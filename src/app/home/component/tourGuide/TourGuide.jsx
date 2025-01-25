import React from 'react';
import { Vujahday_Script } from 'next/font/google';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});
import style from './tourGuide.module.css';
import Link from 'next/link';

const tourGuide = () => {
    return (
        <div className={style.tourguide}>
            <div className="px-lg-5 px-2">
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-md-12 text-center mb-4">
                            <h6 className={`${vujahday.className} ${style.tourGuideTitle}`}>
                                We’re here for you
                            </h6>
                            <h2 className={style.tourGuideMailTitle}>Tour Guides</h2>
                            <p className={style.tourGuideCaption}>
                                Hire expert tour guides trusted by +100,000 customers
                            </p>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className={`${style.cardSection} card`}>
                                <img
                                    className="card-img-top"
                                    src="/homepage/tour-guide/1.jpeg"
                                    alt="tourGuide"
                                />
                                <div className="card-body">
                                    <h5 className={`${style.cardTitle}`}>Ahmed Al-Harthi</h5>
                                    <div className={style.cardRate}>
                                        <div className="ml-2">
                                            <img src="/homepage/tour-guide/star.png" alt="star" />
                                        </div>
                                        <p className="m-0">4.3</p>
                                    </div>

                                    <div className={style.location}>
                                        <div>
                                            <img
                                                src="/homepage/tour-guide/location.png"
                                                alt="location"
                                            />
                                        </div>
                                        <p className="m-0">Muscat , Oman</p>
                                    </div>

                                    <div className={style.location}>
                                        <div>
                                            <img
                                                src="/homepage/tour-guide/lang.png"
                                                alt="location"
                                            />
                                        </div>
                                        <p className="m-0">English, Arabic</p>
                                    </div>

                                    <div className={style.cardPrice}>
                                        <p>$ 150</p>
                                        <div>for 3 days including accomodation</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className={`${style.cardSection} card`}>
                                <img
                                    className="card-img-top"
                                    src="/homepage/tour-guide/2.png"
                                    alt="tourGuide"
                                />
                                <div className="card-body">
                                    <h5 className={`${style.cardTitle}`}>Ahmed Al-Harthi</h5>
                                    <div className={style.cardRate}>
                                        <div className="ml-2">
                                            <img src="/homepage/tour-guide/star.png" alt="star" />
                                        </div>
                                        <p className="m-0">4.3</p>
                                    </div>

                                    <div className={style.location}>
                                        <div>
                                            <img
                                                src="/homepage/tour-guide/location.png"
                                                alt="location"
                                            />
                                        </div>
                                        <p className="m-0">Muscat , Oman</p>
                                    </div>

                                    <div className={style.location}>
                                        <div>
                                            <img
                                                src="/homepage/tour-guide/lang.png"
                                                alt="location"
                                            />
                                        </div>
                                        <p className="m-0">English, Arabic</p>
                                    </div>

                                    <div className={style.cardPrice}>
                                        <p>$ 150</p>
                                        <div>for 3 days including accomodation</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className={`${style.cardSection} card`}>
                                <img
                                    className="card-img-top"
                                    src="/homepage/tour-guide/3.jpeg"
                                    alt="tourGuide"
                                />
                                <div className="card-body">
                                    <h5 className={`${style.cardTitle}`}>Ahmed Al-Harthi</h5>
                                    <div className={style.cardRate}>
                                        <div className="ml-2">
                                            <img src="/homepage/tour-guide/star.png" alt="star" />
                                        </div>
                                        <p className="m-0">4.3</p>
                                    </div>

                                    <div className={style.location}>
                                        <div>
                                            <img
                                                src="/homepage/tour-guide/location.png"
                                                alt="location"
                                            />
                                        </div>
                                        <p className="m-0">Muscat , Oman</p>
                                    </div>

                                    <div className={style.location}>
                                        <div>
                                            <img
                                                src="/homepage/tour-guide/lang.png"
                                                alt="location"
                                            />
                                        </div>
                                        <p className="m-0">English, Arabic</p>
                                    </div>

                                    <div className={style.cardPrice}>
                                        <p>$ 150</p>
                                        <div>for 3 days including accomodation</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className={`${style.cardSection} card`}>
                                <img
                                    className="card-img-top"
                                    src="/homepage/tour-guide/4.jpeg"
                                    alt="tourGuide"
                                />
                                <div className="card-body">
                                    <h5 className={`${style.cardTitle}`}>Ahmed Al-Harthi</h5>
                                    <div className={style.cardRate}>
                                        <div className="ml-2">
                                            <img src="/homepage/tour-guide/star.png" alt="star" />
                                        </div>
                                        <p className="m-0">4.3</p>
                                    </div>

                                    <div className={style.location}>
                                        <div>
                                            <img
                                                src="/homepage/tour-guide/location.png"
                                                alt="location"
                                            />
                                        </div>
                                        <p className="m-0">Muscat , Oman</p>
                                    </div>

                                    <div className={style.location}>
                                        <div>
                                            <img
                                                src="/homepage/tour-guide/lang.png"
                                                alt="location"
                                            />
                                        </div>
                                        <p className="m-0">English, Arabic</p>
                                    </div>

                                    <div className={style.cardPrice}>
                                        <p>$ 150</p>
                                        <div>for 3 days including accomodation</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${style.cardBtn} col-md-12`}>
                            <Link href="/tourguide">
                                <span>View More Guides</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default tourGuide;
