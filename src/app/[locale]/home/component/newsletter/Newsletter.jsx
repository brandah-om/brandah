'use client';
import React from 'react';
import { motion } from 'framer-motion';
import style from './newsletter.module.css';
import { Vujahday_Script } from 'next/font/google';
import { useTranslations } from 'next-intl';

const newsTitle = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const Newsletter = () => {
    const t = useTranslations('HomePage');

    return (
        <motion.div
            className={style.newsletter}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
        >
            <div className="container">
                <div className="row">
                    <motion.div
                        className={`${style.newsletterTitle} col-md-12 mb-2`}
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h6 className={newsTitle.className}>{t('Newsletter')}</h6>
                        <h4>{t('Subscribe to our newsletter')}</h4>
                    </motion.div>

                    <motion.div
                        className="col-md-6 m-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <form className="d-flex justify-content-center">
                            <motion.input
                                type="text"
                                className={style.subscribeInput}
                                placeholder={t('Type your mail here')}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.button
                                className={style.subscribeBtn}
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ textDecoration: 'underLine' }}
                                transition={{ duration: 0.3 }}
                            >
                                {t('Subscribe')}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Newsletter;
