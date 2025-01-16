'use client';

// import { Provider } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
// import { store } from '@/store/store';
import { useEffect, useState } from 'react';

export default function ClientLayout({ children }) {
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setIsClient(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 10);

        return () => clearTimeout(timer);
    }, []);

    return (
        // <Provider store={store}>
        <>
            {isClient && loading && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        zIndex: 9999,
                    }}
                >
                    <CircularProgress color="red" />
                </div>
            )}
            {children}
        </>
        // </Provider>
    );
}
