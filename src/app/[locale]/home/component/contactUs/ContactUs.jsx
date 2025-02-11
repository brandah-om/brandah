import React from 'react';
import style from './contactUs.module.css';
import { useTranslations } from 'next-intl';

const ContactUs = () => {
    const t = useTranslations('HomePage');
    return (
        <div className={style.ContactUs}>
            <div className="container-fluid h-100">
                <div className="d-flex justify-content-between align-items-center flex-wrap h-100">
                    <div
                        className={`${style.contactBox} d-flex justify-content-center align-items-center flex-column flex-wrap`}
                    >
                        <img src="/homepage/contact-us/phone.png" alt="phone" />
                        <p>{t('Emergency')}</p>
                        <p>+20(10)10101010</p>
                    </div>

                    <div
                        className={`${style.contactBox} d-flex justify-content-center align-items-center flex-column flex-wrap`}
                    >
                        <img src="/homepage/contact-us/mail.png" alt="mail" />
                        <p>{t('SEND US A MESSAGE')}</p>
                        <p>info@brandah.com</p>
                    </div>

                    <div
                        className={`${style.contactBox} d-flex justify-content-center align-items-center flex-column flex-wrap`}
                    >
                        <img src="/homepage/contact-us/chat.png" alt="chat" />
                        <p>{t('CHAT WITH US NOW')}</p>
                        <p>{t('Get Started')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
