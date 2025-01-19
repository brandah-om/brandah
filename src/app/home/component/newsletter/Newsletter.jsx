import React from 'react';
import style from './newsletter.module.css';
import { Vujahday_Script } from 'next/font/google';

const newsTitle = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const Newsletter = () => {
    return (
        <div className={style.newsletter}>
            <div className="container">
                <div className="row">
                    <div className={`${style.newsletterTitle} col-md-12 mb-2`}>
                        <h6 className={newsTitle.className}>Newsletter</h6>
                        <h4>Subscribe to our newsletter</h4>
                    </div>
                    <div className="col-md-6 m-auto">
                        <form className='d-flex justify-content-center'>
                            <input
                                type="text"
                                className={style.subscribeInput}
                                placeholder="Type your mail here"
                            />
                            <button className={style.subscribeBtn}>Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
