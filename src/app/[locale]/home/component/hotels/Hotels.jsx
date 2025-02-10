import React from 'react';
import { Vujahday_Script } from 'next/font/google';

const vujahday = Vujahday_Script({
    subsets: ['latin'],
    weight: ['400'],
});
import style from './hotesl.module.css';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

const Hotels = ({ data }) => {
    const t = useTranslations('HomePage');
    const locale = useLocale();
    return (
        <div className="px-lg-5 px-2">
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-12 text-center mb-4">
                        <h6 className={`${vujahday.className} ${style.hotelsTitle}`}>
                            {t('wonderful place for you')}
                        </h6>
                        <h2 className={style.hotelsMailTitle}>{t('Popular Hotels')}</h2>
                        <p className={style.hotelsCaption}>
                            {t('Explore our popular hotels voted by more than +100,000 customers')}
                        </p>
                    </div>
                    {data?.slice(0, 4).map(hotel => (
                        <div className="col-md-3 mb-3" key={hotel.id}>
                            <div className={`${style.cardSection} card`}>
                                <img
                                    className={`${style.hotelImg} card-img-top`}
                                    src={hotel.images || '/homepage/hotels/1.png'}
                                    alt={hotel.name || t('null')}
                                />
                                <div className="card-body">
                                    <h5 className={`${style.cardTitle}`}>
                                        {hotel.name || t('null')}
                                    </h5>
                                    <p
                                        className={`${style.cardBody}`}
                                        dangerouslySetInnerHTML={{
                                            __html: hotel.description || '',
                                        }}
                                    >
                                        {/* {hotel.description || t('null')} */}
                                    </p>
                                    <div className={style.cardRate}>
                                        <div className="ml-2">
                                            <img src="/homepage/hotels/star.png" alt="star" />
                                        </div>
                                        <p className="m-0">{hotel.rating || t('null')}</p>
                                    </div>
                                    <div className={style.cardPrice || t('null')}>
                                        <p>
                                            {hotel.price || t('null')} {hotel.currency}
                                        </p>
                                        <div>
                                            {hotel.days || t('null')} {t('nights accomodation')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className={`${style.cardBtn} col-md-12`}>
                        <Link href={`/${locale}/hotels`}>
                            <span>{t('View More Hotels')}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hotels;
