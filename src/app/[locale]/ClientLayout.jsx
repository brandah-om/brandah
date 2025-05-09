'use client';

import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { store } from '../../store/store';

export default function ClientProviders({ children, messages, locale }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = Cookies.get('token');
        const isSubscribed = Cookies.get('is_subscribed') === 'true';

        console.log('Token client:', token);
        console.log('isSubscribed client:', isSubscribed);

        const allowedRoutes = [
            '/en',
            '/ar',
            '/en/login',
            '/ar/login',
            '/en/subscribe',
            '/ar/subscribe',
            '/en/MyAccount',
            '/ar/MyAccount',
            '/en/RegisterAgency',
            '/ar/RegisterAgency',
            '/en/RegisterTourGuide',
            '/ar/RegisterTourGuide',
            '/en/RegisterTourist',
            '/ar/RegisterTourist',
            '/ar/contactUs',
            '/en/contactUs',
            '/en/otp',
            '/ar/otp',
            '/en/forgetPassword',
            '/ar/forgetPassword',
            '/en/resetPassword',
            '/ar/resetPassword',
            '/en/aboutUs',
            '/ar/aboutUs',
            '/en/blogs',
            '/ar/blogs',
            '/en/faq',
            '/ar/faq',
            '/ar/mice',
            '/en/mice',
            '/en/parnershipTerms',
            '/ar/parnershipTerms',
            '/en/privacy',
            '/ar/privacy',
            '/en/userTerms',
            '/ar/userTerms',
        ];

        if ((!token || !isSubscribed) && !allowedRoutes.includes(pathname)) {
            router.push('/');
        }

        if ((pathname === '/en/MyAccount' || pathname === '/ar/MyAccount') && !token) {
            return NextResponse.redirect(new URL('/en/login', req.url));
        }
    }, [pathname]);

    return (
        <Provider store={store}>
            <NextIntlClientProvider messages={messages} locale={locale}>
                {children}
            </NextIntlClientProvider>
        </Provider>
    );
}
