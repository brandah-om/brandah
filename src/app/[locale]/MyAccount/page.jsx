'use client';
import React from 'react';
import style from './MyAccount.module.css';
import NavBar from '@/components/navBar/NavBar';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import MyAccountTabs from './component/MyAccountTabs';
import { useTranslations } from 'next-intl';

const MyAccount = () => {
    const t = useTranslations('HomePage');
    const breadcrumbs = [{ label: t('Home'), href: '/' }, { label: (t('Account')) }];

    return (
        <>
            <NavBar />
            <div className={style.myAccount}>
                <DynamicBreadcrumbs items={breadcrumbs} />
                {/* <h2 className={style.title}>{t('My Account')}</h2> */}
                <MyAccountTabs />
            </div>
        </>
    );
};

export default MyAccount;
