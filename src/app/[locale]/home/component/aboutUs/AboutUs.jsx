import React from 'react';
import style from './aboutUs.module.css';
import { Vujahday_Script } from 'next/font/google';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion'; // استيراد framer-motion

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});

const AboutUs = () => {
    const t = useTranslations('HomePage');

    const fadeInUp = {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    return (
        <div className={style.aboutUs}>
            <div className="container">
                <div className="row">
                    <motion.div {...fadeInUp} className="col-md-6 position-relative">
                        <img
                            className={style.aboutImg}
                            src="/homepage/about/about.png"
                            alt="about"
                        />
                        <div className={style.aboutLeftBox}></div>
                        <motion.div
                            className={style.aboutRightBox}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        ></motion.div>
                    </motion.div>
                    <motion.div className={`${style.aboutCaption} col-md-6`} {...fadeInUp}>
                        <h6 className={vujahday.className}>{t('About Us')}</h6>
                        <h4>{t('Our Stories Have Adventures')}</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <div className="d-flex align-items-center gap-4">
                            <motion.div
                                className={style.boxNumbers}
                                initial={{ opacity: 0, y: 20 }} // الحالة الأولية
                                whileInView={{ opacity: 1, y: 0 }} // الحالة النهائية
                                transition={{ duration: 0.6, delay: 0.2 }} // تأخير
                            >
                                <h6>15K+</h6>
                                <span>{t('Successful Journey')}</span>
                            </motion.div>
                            <motion.div
                                className={style.boxNumbers}
                                initial={{ opacity: 0, y: 20 }} // الحالة الأولية
                                whileInView={{ opacity: 1, y: 0 }} // الحالة النهائية
                                transition={{ duration: 0.6, delay: 0.4 }} // تأخير
                            >
                                <h6>15K+</h6>
                                <span>{t('Successful Journey')}</span>
                            </motion.div>
                            <motion.div
                                className={style.boxNumbers}
                                initial={{ opacity: 0, y: 20 }} // الحالة الأولية
                                whileInView={{ opacity: 1, y: 0 }} // الحالة النهائية
                                transition={{ duration: 0.6, delay: 0.6 }} // تأخير
                            >
                                <h6>15K+</h6>
                                <span>{t('Successful Journey')}</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
