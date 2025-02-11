import React from 'react';
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
        <div className={style.newsletter}>
            <div className="container">
                <div className="row">
                    <div className={`${style.newsletterTitle} col-md-12 mb-2`}>
                        <h6 className={newsTitle.className}>{t('Newsletter')}</h6>
                        <h4>{t('Subscribe to our newsletter')}</h4>
                    </div>
                    <div className="col-md-6 m-auto">
                        <form className='d-flex justify-content-center'>
                            <input
                                type="text"
                                className={style.subscribeInput}
                                placeholder={t("Type your mail here")}
                            />
                            <button className={style.subscribeBtn}>{t('Subscribe')}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
