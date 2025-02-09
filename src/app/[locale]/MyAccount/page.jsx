'use client';
import React from 'react';
import style from './MyAccount.module.css';
import NavBar from '@/components/navBar/NavBar';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';

import MyAccountTabs from './component/MyAccountTabs';

const MyAccount = () => {
    const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Account' }];



    return (
        <>
            <NavBar />
            <div className={style.myAccount}>
                <DynamicBreadcrumbs items={breadcrumbs} />
                <h2 className={style.title}>My Account</h2>
                <MyAccountTabs />
            </div>
        </>
    );
};

export default MyAccount;
