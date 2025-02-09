import React from 'react';
import style from './aboutUs.module.css';
import { Vujahday_Script } from 'next/font/google';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const AboutUs = () => {
    return (
        <div className={style.aboutUs}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 position-relative">
                        <img
                            className={style.aboutImg}
                            src="/homepage/about/about.png"
                            alt="about"
                        />
                        <div className={style.aboutLeftBox}></div>
                        <div className={style.aboutRightBox}></div>
                    </div>
                    <div className={`${style.aboutCaption} col-md-6`}>
                        <h6 className={vujahday.className}>About Us</h6>
                        <h4>Our Stories Have Adventures</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <div className="d-flex align-items-center gap-4">
                            <div className={style.boxNumbers}>
                                <h6>15K+</h6>
                                <span>Successful Journey</span>
                            </div>
                            <div className={style.boxNumbers}>
                                <h6>15K+</h6>
                                <span>Successful Journey</span>
                            </div>
                            <div className={style.boxNumbers}>
                                <h6>15K+</h6>
                                <span>Successful Journey</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
