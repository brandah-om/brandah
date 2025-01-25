'use client';
import React from 'react';
import style from './transportation.module.css';
import Link from 'next/link';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Transportation = () => {
    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 2,
    //     slidesToScroll: 2,
    //     responsive: [
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1,
    //             },
    //         },
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 2,
    //             },
    //         },
    //     ],
    //     prevArrow: (
    //         <ArrowBackIosIcon className={style.arrow} sx={{ color: '#f00', fontSize: '30px' }} />
    //     ),
    //     nextArrow: (
    //         <ArrowForwardIosIcon
    //             className={style.arrow}
    //             sx={{ color: '#f00', fontSize: '30px' }}
    //         />
    //     ),
    // };

    return (
        <div className={style.transportationSection}>
            <div
                className={`${style.transportationSec} d-flex justify-content-between align-items-center flex-wrap`}
            >
                <div className="">
                    <div
                        className={`${style.transportationLogoSec} d-flex justify-content-between align-items-center flex-wrap`}
                    >
                        <img src="/homepage/transportation/logo.png" alt="logo" />
                        <h4>Brandah Transportation</h4>
                    </div>
                </div>

                <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
                    <div className={style.verticalLineContainer}>
                        <div className={`${style.circle} ${style.topCircle}`}></div>
                        <div className={style.line}></div>
                        <div className={`${style.circle} ${style.bottomCircle}`}></div>
                    </div>
                    <div className={style.transportationLocation}>
                        <p>Your Location</p>
                        <span>2 hours</span>
                        <h6>
                            <strong>Muscat </strong>
                            or you can choose another destination
                        </h6>
                    </div>
                </div>

                <div>
                    
                    <div className="d-flex flex-column flex-wrap gap-3">
                        <div className="d-flex justify-content-start flex-wrap gap-4">
                            <div className={style.transportationNumbers}>
                                <span>23</span>
                            </div>
                            <div className={style.transportationNumbers}>
                                <span>56</span>
                            </div>
                            <div className={style.transportationNumbers}>
                                <span>48</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-start flex-wrap align-items-center">
                            <Link href="/" className={style.transportationBook}>
                                Book Now US24$
                            </Link>
                            <ArrowForwardIosIcon sx={{ color: '#9F733C', width: '35px' }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className={style.sliderContainer}>
                            <Slider {...settings}>
                                <div className={style.sliderItem}>
                                    <div className={style.sliderElement}>
                                        <img
                                            src="/homepage/transportation/1.png"
                                            alt="transportation"
                                        />
                                    </div>
                                </div>
                                <div className={style.sliderItem}>
                                    <div className={style.sliderElement}>
                                        <img
                                            src="/homepage/transportation/2.jpeg"
                                            alt="transportation"
                                        />
                                    </div>
                                </div>

                                <div className={style.sliderItem}>
                                    <div className={style.sliderElement}>
                                        <img
                                            src="/homepage/transportation/1.png"
                                            alt="transportation"
                                        />
                                    </div>
                                </div>
                                <div className={style.sliderItem}>
                                    <div className={style.sliderElement}>
                                        <img
                                            src="/homepage/transportation/2.jpeg"
                                            alt="transportation"
                                        />
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Transportation;
