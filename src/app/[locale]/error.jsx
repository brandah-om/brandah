'use client';
// import NavBar from '@/components/navBar/NavBar';
import Link from 'next/link';
import React from 'react';
import NavBar from './home/component/navbar/NavBar';

const ErrorPage = ({ error, reset }) => {
    return (
        <>
            <NavBar />
            <div style={{ paddingTop: '150px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-center m-auto">
                            <h3 style={{ color: 'red' }} className="text-capitalize">
                                Something went wrong
                            </h3>
                            <h2>Error Message: {error.message}</h2>
                            <button className="btn btn-info my-3" onClick={() => reset()}>
                                Try Again
                            </button>
                            <div>
                                <Link href="/">Go to Homepage</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;
