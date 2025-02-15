'use client';
import React from 'react';
import { motion } from 'framer-motion'; // ✅ استيراد Framer Motion
import style from './brochure.module.css';
import { useTranslations } from 'next-intl';

const Brochure = () => {
    const t = useTranslations('HomePage');

    return (
        <motion.div
            className={style.brochure}
            initial={{ opacity: 0, y: 50 }} // يبدأ غير مرئي ويتحرك من الأسفل
            whileInView={{ opacity: 1, y: 0 }} // يظهر عند التمرير
            transition={{ duration: 0.6, ease: 'easeOut' }} // تأثير ناعم
            viewport={{ once: true, amount: 0.3 }} // يتم تشغيله مرة واحدة عند ظهور 30% من العنصر
        >
            <div className="container">
                <div className="row">
                    <motion.div
                        className={`${style.brochureCaption} brochure`}
                        initial={{ opacity: 0, y: -50 }} // يبدأ مختفيًا ويتحرك من اليسار
                        whileInView={{ opacity: 1, y: 0 }} // يظهر عند التمرير
                        transition={{ duration: 0.5, delay: 0.2 }} // تأخير بسيط للتناسق
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <h4>{t('Download Brochure')}</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </p>
                        <div className="d-flex justify-content-center">
                            <motion.button
                                whileHover={{ scale: 1.1 }} // عند تحريك الماوس يكبر الزر
                                whileTap={{ scale: 0.9 }} // عند الضغط يصغر الزر قليلاً
                            >
                                {t('Download')}
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="col-md-6"
                        initial={{ opacity: 0, y: 50 }} // يبدأ مختفيًا ويتحرك من اليمين
                        whileInView={{ opacity: 1, y: 0 }} // يظهر عند التمرير
                        transition={{ duration: 0.5, delay: 0.3 }} // تأخير بسيط للتناسق
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <img className="img-fluid" src="/homepage/brochure/1.png" alt="" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Brochure;
