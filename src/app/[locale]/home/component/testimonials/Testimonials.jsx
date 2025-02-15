'use client';
import React from 'react';
import { motion } from 'framer-motion';
import style from './testimonials.module.css';
import { Vujahday_Script } from 'next/font/google';
import { useTranslations } from 'next-intl';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const Testimonials = () => {
    const t = useTranslations('HomePage');

    return (
        <motion.div
            className={style.testimonials}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
        >
            <div className="container">
                <div className="row">
                    <motion.div
                        className={`${style.testimonialsTitle} col-md-12 mb-4`}
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h6 className={vujahday.className}>{t('Testimonials')}</h6>
                        <h4>{t('Our Travelers Reviews')}</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        </p>
                    </motion.div>

                    {[1, 2, 3].map((_, index) => (
                        <motion.div
                            key={index}
                            className="col-md-4 mb-5"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className={`${style.testimonialsCrad} card p-3 ps-4`}>
                                <img
                                    className={style.testimonialsImg}
                                    src={`/homepage/testimonials/${index + 1}.jpeg`}
                                    alt="testimonials"
                                />
                                <div className={style.rate}>
                                    {[...Array(5)].map((_, i) => (
                                        <img key={i} src="/homepage/star.png" alt="rate" />
                                    ))}
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <h4>John Russel</h4>
                                <h5>Traveller</h5>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Testimonials;
