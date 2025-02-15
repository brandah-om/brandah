import { useGetStatesBtIdQuery } from '@/store/States/StateDetailsSlice';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import style from './tabs.module.css';
import Link from 'next/link';
import Loading from '@/components/Loading/Loading';
import Aos from 'aos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';

const Musuems = ({ id }) => {
    const locale = useLocale();
    const t = useTranslations('HomePage');

    const { data, isLoading, error } = useGetStatesBtIdQuery({ id, lang: locale });

    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        Aos.init({ duration: 800, easing: 'ease-in-out', once: true });
    }, []);

    return (
        <div>
            <div className="px-2">
                <div className="container-fluid mt-5">
                    <div className="row">
                        {isLoading ? (
                            <Loading />
                        ) : error ? (
                            <p>{t('Error loading Data')}</p>
                        ) : (
                            <>
                                {data?.Sites_categories_in_state?.map((category, catIndex) =>
                                    category?.sights?.map((state, index) => (
                                        <motion.div
                                            key={`${catIndex}-${index}`}
                                            className="col-md-4 mb-3"
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: index * 0.2 }} // ⏳ تأخير زمني تدريجي لكل كارد
                                        >
                                            <div className={`${style.cardSectionAlsoLink} card`}>
                                                <div className={style.imageWrapper}>
                                                    <img
                                                        className={style.cardSectionImg}
                                                        src={
                                                            state.banner ||
                                                            '/homepage/top-trip/2.jpeg'
                                                        }
                                                        alt="trips"
                                                        data-aos="fade-up"
                                                    />
                                                </div>
                                                <div className="card-body">
                                                    <h5
                                                        data-aos="fade-up"
                                                        className={style.cardTitleAlsoLink}
                                                    >
                                                        {state.name}
                                                    </h5>
                                                    <p
                                                        data-aos="fade-up"
                                                        className={style.catDesc}
                                                        dangerouslySetInnerHTML={{
                                                            __html: state.description,
                                                        }}
                                                    ></p>
                                                    <motion.div
                                                        className="d-flex justify-content-center align-items-center gap-2"
                                                        animate={
                                                            isShaking
                                                                ? { x: [-2, 2, -2, 2, 0] }
                                                                : {}
                                                        }
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <Link
                                                            className="text-main d-flex justify-content-center align-items-center gap-2"
                                                            href={`/${locale}/destinations/${id}/Musuems/${state.id}`}
                                                        >
                                                            {t('Read More')}
                                                            <ArrowForwardIcon
                                                                fontSize="small"
                                                                className="pt-1"
                                                                sx={{ fontSize: '27px' }}
                                                            />
                                                        </Link>
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Musuems;
