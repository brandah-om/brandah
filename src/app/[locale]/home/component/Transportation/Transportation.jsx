'use client';
import React from 'react';
import style from './transportation.module.css';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useLocale, useTranslations } from 'next-intl';

const Transportation = () => {
    const locale = useLocale();

    const t = useTranslations('HomePage');
    return (
        <div className={style.transportationSection}>
            <div
                className={`${style.transportationSec} d-flex justify-content-between align-items-center flex-wrap`}
            >
                <div className="">
                    <div
                        className={`${style.transportationLogoSec} d-flex justify-content-between align-items-center flex-wrap`}
                    >
                        <img src="/homepage/transportation/logo.png" alt="logo" />
                        <h4>{t('Brandah Transportation')}</h4>
                    </div>
                </div>

                <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
                    <div className={style.verticalLineContainer}>
                        <div className={`${style.circle} ${style.topCircle}`}></div>
                        <div className={style.line}></div>
                        <div className={`${style.circle} ${style.bottomCircle}`}></div>
                    </div>
                    <div className={style.transportationLocation}>
                        <p>{t('Your Location')}</p>
                        <span>{t('2 hours')}</span>
                        <h6>
                            <strong>{t('Muscat')} </strong>{' '}
                            {t('or you can choose another destination')}
                        </h6>
                    </div>
                </div>

                <div>
                    <div className="d-flex flex-column flex-wrap gap-3">
                        <div className="d-flex justify-content-start flex-wrap gap-4">
                            <div className={style.transportationNumbers}>
                                <span>23</span>
                            </div>
                            <div className={style.transportationNumbers}>
                                <span>56</span>
                            </div>
                            <div className={style.transportationNumbers}>
                                <span>48</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-start flex-wrap align-items-center">
                            <Link href="/" className={style.transportationBook}>
                                {t('Book Now US24$')}
                            </Link>
                            <>
                                {locale === 'ar' ? (
                                    <ArrowBackIosIcon sx={{ color: '#9F733C', width: '35px' }} />
                                ) : (
                                    <ArrowForwardIosIcon sx={{ color: '#9F733C', width: '35px' }} />
                                )}
                            </>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className={style.sliderContainer}>
                            <Slider {...settings}>
                                <div className={style.sliderItem}>
                                    <div className={style.sliderElement}>
                                        <img
                                            src="/homepage/transportation/1.png"
                                            alt="transportation"
                                        />
                                    </div>
                                </div>
                                <div className={style.sliderItem}>
                                    <div className={style.sliderElement}>
                                        <img
                                            src="/homepage/transportation/2.jpeg"
                                            alt="transportation"
                                        />
                                    </div>
                                </div>

                                <div className={style.sliderItem}>
                                    <div className={style.sliderElement}>
                                        <img
                                            src="/homepage/transportation/1.png"
                                            alt="transportation"
                                        />
                                    </div>
                                </div>
                                <div className={style.sliderItem}>
                                    <div className={style.sliderElement}>
                                        <img
                                            src="/homepage/transportation/2.jpeg"
                                            alt="transportation"
                                        />
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Transportation;
