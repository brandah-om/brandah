'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import style from './fail.module.css';
import NavBar from '@/components/navBar/NavBar';

const FailPage = () => {
    const router = useRouter();

    useEffect(() => {
        toast.error('Payment failed! Please try again.', {
            position: 'top-right',
            autoClose: 3000,
        });

        setTimeout(() => {
            router.push('/');
        }, 3000);
    }, [router]);

    return (
        <div>
            <NavBar />
            <div className={style.failPage}>
                <div className="container-fluid mb-5">
                    <div className="row">
                        <div className="col-md-12 text-center mb-3">
                            <img src="/navbar-logo.png" alt="logo" />
                            <h2 className="mt-3 text-main">Payment Failed ❌</h2>
                            <p className="mt-2">
                                There was an issue with your payment. You will be redirected
                                shortly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FailPage;
