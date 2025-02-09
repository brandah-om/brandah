import React from 'react';
import style from './testimonials.module.css';
import { Vujahday_Script } from 'next/font/google';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const Testimonials = () => {
    return (
        <div className={style.testimonials}>
            <div className="container">
                <div className="row">
                    <div className={`${style.testimonialsTitle} col-md-12 mb-4`}>
                        <h6 className={vujahday.className}>Testimonials</h6>
                        <h4>Our Travelers Reviews</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        </p>
                    </div>

                    <div className="col-md-4 mb-5">
                        <div className={`${style.testimonialsCrad} card p-3 ps-4`}>
                            <img
                                className={style.testimonialsImg}
                                src="/homepage/testimonials/1.jpeg"
                                alt="testimonials"
                            />
                            <div className={style.rate}>
                                <img src="/homepage/star.png" alt="rate" />
                                <img src="/homepage/star.png" alt="rate" />
                                <img src="/homepage/star.png" alt="rate" />
                                <img src="/homepage/star.png" alt="rate" />
                                <img src="/homepage/star.png" alt="rate" />
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <h4>John Russel</h4>
                            <h5>Traveller</h5>
                        </div>
                    </div>

                    <div className="col-md-4 mb-5">
                        <div className={`${style.testimonialsCrad} card p-3 ps-4`}>
                            <img
                                className={style.testimonialsImg}
                                src="/homepage/testimonials/2.jpeg"
                                alt="testimonials"
                            />
                            <div className={style.rate}>
                                <img src="/homepage/star.png" alt="rate" />
                                <img src="/homepage/star.png" alt="rate" />
                                <img src="/homepage/star.png" alt="rate" />
                                <img src="/homepage/star.png" alt="rate" />
                                <img src="/homepage/star.png" alt="rate" />
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <h4>John Russel</h4>
                            <h5>Traveller</h5>
                        </div>
                    </div>
                    
                    <div className="col-md-4 mb-5">
                        <div className={`${style.testimonialsCrad} card p-3 ps-4`}>
                            <img
                                className={style.testimonialsImg}
                                src="/homepage/testimonials/3.jpeg"
                                alt="testimonials"
                            />
                            <div className={style.rate}>
                                <img src="/homepage/star.png" alt="rate" />
                                <img src="/homepage/star.png" alt="rate" />
                                <img src="/homepage/star.png" alt="rate" />
                                <img src="/homepage/star.png" alt="rate" />
                                <img src="/homepage/star.png" alt="rate" />
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <h4>John Russel</h4>
                            <h5>Traveller</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
