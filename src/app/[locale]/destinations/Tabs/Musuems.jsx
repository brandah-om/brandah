import { useGetStatesBtIdQuery } from '@/store/States/StateDetailsSlice';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import style from './tabs.module.css';
import Link from 'next/link';
import Loading from '@/components/Loading/Loading';

const Musuems = ({ id }) => {
    const locale = useLocale();
    const t = useTranslations('HomePage');

    const { data, isLoading, error } = useGetStatesBtIdQuery({ id, lang: locale });
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
                                        <div key={`${catIndex}-${index}`} className="col-md-4 mb-3">
                                            <div className={`${style.cardSectionAlsoLink} card`}>
                                                <img
                                                    className="card-img-top"
                                                    src={
                                                        state.banner || '/homepage/top-trip/2.jpeg'
                                                    }
                                                    alt="trips"
                                                />
                                                <div className="card-body">
                                                    <h5 className={style.cardTitleAlsoLink}>
                                                        {state.name}
                                                    </h5>
                                                    <p
                                                        className={style.catDesc}
                                                        dangerouslySetInnerHTML={{
                                                            __html: state.description,
                                                        }}
                                                    ></p>
                                                    <div className="d-flex justify-content-center wow fadeInLeft">
                                                        <Link
                                                            className="text-main"
                                                            href={`/${locale}/`}
                                                        >
                                                            {t('Read More')}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
