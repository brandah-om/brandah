'use client';
import React from 'react';
import style from './terms.module.css';
import NavBar from '@/components/navBar/NavBar';
import HeroSection from '@/components/heroSection/HeroSection';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import Loading from '@/components/Loading/Loading';
import { useGetTermsPageQuery } from '@/store/pages/TermsPageSlice';

const userTerms = () => {
    const breadcrumbs = [{ label: 'Home', href: '/' }, { label: ' Usage Terms' }];
    const { data: TermsPage, isLoading, error } = useGetTermsPageQuery();

    return (
        <>
            <NavBar />
            <div className={`${style.userTerms}`}>
                {isLoading ? (
                    <Loading />
                ) : error || !TermsPage ? (
                    <p>Error loading page content.</p>
                ) : (
                    <>
                        <div
                            style={{
                                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.288), rgba(0, 0, 0, 0.274)), 
                    url(${TermsPage?.banner || '/hero-section.jpeg'})`,
                                height: '500px',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <HeroSection
                                title={TermsPage?.heading || 'Terms'}
                                description="Dream, Explore, Discover Your Travel Begins Here"
                            />
                        </div>
                        <div className={style.box}>
                            <DynamicBreadcrumbs items={breadcrumbs} />
                            <div
                                className={style.caption}
                                dangerouslySetInnerHTML={{ __html: TermsPage?.content?.en || '' }}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default userTerms;
