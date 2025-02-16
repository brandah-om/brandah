'use client';
import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/navBar/NavBar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import style from './hotels.module.css';
import Newsletter from '../home/component/newsletter/Newsletter';
import Filter from '@/components/filter/Filter';
import { useGetHotelsQuery } from '@/store/hotels/hotelsApiSlice';
import Loading from '@/components/Loading/Loading';
import { ToastContainer } from 'react-toastify';
import { useLocale, useTranslations } from 'next-intl';

const Hotels = () => {
    const locale = useLocale();
    const { data, error, isLoading } = useGetHotelsQuery(locale);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const t = useTranslations('HomePage');

    return (
        <div>
            <NavBar />
            {/* <ToastContainer /> */}
            <div className={style.hotelsPage}>
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link className={style.links} underline="hover" href="/">
                            {t('Home')}
                        </Link>
                        <Typography className={style.subLink} sx={{ color: 'text.primary' }}>
                            {t('Hotels')}
                        </Typography>
                    </Breadcrumbs>
                </div>

                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <p>{t('Error loading Data')}</p>
                ) : (
                    <>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }} // يبدأ مخفيًا وينزلق للأعلى
                            whileInView={{ opacity: 1, y: 0 }} // يظهر تدريجيًا عند التمرير
                            transition={{
                                duration: 0.3,
                                ease: 'easeOut',
                            }} // تأخير بسيط لكل كارد
                            viewport={{ once: true }}
                            className="mt-4 d-flex justify-content-between align-items-center"
                        >
                            <form className="d-flex justify-content-start">
                                <input
                                    type="text"
                                    className={style.subscribeInput}
                                    placeholder={t('Type here')}
                                />
                                <button className={style.subscribeBtn}>{t('Subscribe')}</button>
                            </form>
                            <Filter
                                open={open}
                                handleClickOpen={handleClickOpen}
                                handleClose={handleClose}
                            />
                        </motion.div>

                        <div className="container-fluid mt-5">
                            <div className="row">
                                {data.data.map((hotel, index) => (
                                    <motion.div
                                        key={hotel.id}
                                        className="col-md-3 mb-3"
                                        initial={{ opacity: 0, y: 50 }} // يبدأ مخفيًا وينزلق للأعلى
                                        whileInView={{ opacity: 1, y: 0 }} // يظهر تدريجيًا عند التمرير
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                            ease: 'easeOut',
                                        }} // تأخير بسيط لكل كارد
                                        viewport={{ once: true }} // يعمل مرة واحدة فقط عند التمرير
                                        whileHover={{ scale: 1.05 }} // تأثير الهوفر
                                    >
                                        <Link
                                            href={`/${locale}/hotels/${hotel.id}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <div
                                                className={`${style.cardSection} card`}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <img
                                                    className={style.cardSectionImg}
                                                    src={hotel.images}
                                                    alt={hotel.name}
                                                />
                                                <div className="card-body">
                                                    <h5 className={`${style.cardTitle}`}>
                                                        {hotel.name || 'No Name'}
                                                    </h5>
                                                    <p
                                                        className={`${style.cardBody}`}
                                                        dangerouslySetInnerHTML={{
                                                            __html: hotel.description || '',
                                                        }}
                                                    />
                                                    <div className={style.cardRate}>
                                                        <div className="ml-2">
                                                            <img
                                                                src="/homepage/hotels/star.png"
                                                                alt="star"
                                                            />
                                                        </div>
                                                        <p className="m-0">
                                                            {hotel.rating || 'no rate'}
                                                        </p>
                                                    </div>
                                                    <div className={style.cardPrice}>
                                                        <p>
                                                            {hotel.price || 'No price'}{' '}
                                                            {hotel.currency}
                                                        </p>
                                                        <div>
                                                            {hotel.days} {t('nights accomodation')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}

                                <Newsletter />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Hotels;
