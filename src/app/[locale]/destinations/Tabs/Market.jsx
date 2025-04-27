import { useGetStatesBtIdQuery } from '../../../../store/States/StateDetailsSlice';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import style from './tabs.module.css';
import Link from 'next/link';
import Loading from '../../../../components/Loading/Loading';
import Aos from 'aos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';

const Market = ({ id }) => {
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
    const fleaMarkets = data?.Sites_categories_in_state?.find(
        category =>
            category.name === 'Flea Markets' || category.name === 'أسواق الشوارع والسلع المستعملة'
    );

    return (
        <div>
            <div className="px-2">
                <div className="container-fluid mt-5">
                    <div className="row">
                        {isLoading ? (
                            <Loading />
                        ) : error ? (
                            <p>{t('Error loading Data')}</p>
                        ) : fleaMarkets && fleaMarkets.sights.length > 0 ? (
                            fleaMarkets.sights.map((place, index) => (
                                <motion.div
                                    key={place.id}
                                    className="col-md-4 mb-3"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: index * 0.2 }}
                                >
                                    <div className={`${style.cardSectionAlsoLink} card`}>
                                        <div className={style.imageWrapper}>
                                            <img
                                                className={style.cardSectionImg}
                                                src={place.banner || '/homepage/top-trip/2.jpeg'}
                                                alt={place.name}
                                                data-aos="fade-up"
                                            />
                                        </div>
                                        <div className="card-body">
                                            <h5
                                                data-aos="fade-up"
                                                className={style.cardTitleAlsoLink}
                                            >
                                                {place.name}
                                            </h5>
                                            <p
                                                data-aos="fade-up"
                                                className={style.catDesc}
                                                dangerouslySetInnerHTML={{
                                                    __html: place.description,
                                                }}
                                            ></p>
                                            <motion.div
                                                className="d-flex justify-content-center align-items-center gap-2"
                                                animate={isShaking ? { x: [-2, 2, -2, 2, 0] } : {}}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <Link
                                                    className="text-main d-flex justify-content-center align-items-center gap-2"
                                                    href={`/${locale}/destinations/${id}/Sites/${place.id}`}
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
                        ) : (
                            <p>{t('No Market found')}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Market;
