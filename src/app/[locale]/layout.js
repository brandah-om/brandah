import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Baloo_Bhaijaan_2, Cairo } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import './styles/globals.css';
import Footer from '@/components/footer/Footer';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import ClientProviders from './ClientLayout';
import ContactUs from './home/component/contactUs/ContactUs';

const baloo = Baloo_Bhaijaan_2({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});


export const metadata = {
  title: 'Brandah',
  description: 'Brandah Dream, Explore, Discover Your Travel Begins Here',
  icons: {
    icon: '/carousel-home.png',
    apple: '/carousel-home.png',
  },
};

export default async function Layout({ children, params }) {
  const { locale } = params;
  const supportedLocales = ['en', 'ar'];

  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  let messages;
  try {
    messages = await getMessages(locale);
  } catch (error) {
    console.error('❌ خطأ في getMessages:', error);
    messages = {};
  }

  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const fontClass = locale === 'ar' ? cairo.className : baloo.className;

  return (
    <html lang={locale} className={fontClass} dir={direction}>
      <body>
        <ClientProviders messages={messages} locale={locale}>
          <ToastContainer
            position={locale === 'ar' ? 'top-left' : 'top-right'}
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={locale === 'ar'}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          {children}
          <ContactUs />
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
