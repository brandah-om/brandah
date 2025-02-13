import React from 'react';
import { Vujahday_Script } from 'next/font/google';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});
import style from './tourGuide.module.css';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

const tourGuide = ({ data }) => {
    const locale = useLocale();
    const t = useTranslations('HomePage');

    return (
        <div className={style.tourguide}>
            <div className="px-lg-5 px-2">
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-md-12 text-center mb-4">
                            <h6 className={`${vujahday.className} ${style.tourGuideTitle}`}>
                                {t('We’re here for you')}
                            </h6>
                            <h2 className={style.tourGuideMailTitle}>{t('Tour Guides')}</h2>
                            <p className={style.tourGuideCaption}>
                                {t('Hire expert tour guides trusted by +100,000 customers')}
                            </p>
                        </div>

                        {data?.slice(0, 4).map(guide => (
                            <div className="col-md-3 mb-3" key={guide.id}>
                                <div className={`${style.cardSection} card`}>
                                    <img
                                        className="card-img-top"
                                        src={guide.image || '/homepage/tour-guide/1.jpeg'}
                                        alt={guide.name || 'tourGuide'}
                                    />
                                    <div className="card-body">
                                        <h5 className={`${style.cardTitle}`}>{guide.name}</h5>
                                        <div className={style.cardRate}>
                                            <div className="ml-2">
                                                <img
                                                    src="/homepage/tour-guide/star.png"
                                                    alt="star"
                                                />
                                            </div>
                                            <p className="m-0">{guide.rate || 'null'}</p>
                                        </div>

                                        <div className={style.location}>
                                            <div>
                                                <img
                                                    src="/homepage/tour-guide/location.png"
                                                    alt="location"
                                                />
                                            </div>
                                            <p className="m-0">
                                                {guide.city} , {guide.country}
                                            </p>
                                        </div>

                                        <div className={style.location}>
                                            <div>
                                                <img
                                                    src="/homepage/tour-guide/lang.png"
                                                    alt="location"
                                                />
                                            </div>
                                            {guide.languages.map(lang => (
                                                <p className="m-0" key={lang.id}>
                                                    {lang.name}
                                                </p>
                                            ))}
                                        </div>

                                        <div className={style.cardPrice}>
                                            <p>$ {guide.price}</p>
                                            <div>
                                                {t('for')} {guide.days}{' '}
                                                {t('days including accomodation')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className={`${style.cardBtn} col-md-12`}>
                            <Link href={`/${locale}/tourguide`}>
                                <span>{t('View More Guides')}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default tourGuide;
