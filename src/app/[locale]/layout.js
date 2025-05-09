import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Baloo_Bhaijaan_2, Tajawal } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import './styles/globals.css';
import Footer from '../../components/footer/Footer';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import ClientProviders from './ClientLayout';
import ContactUs from './home/component/contactUs/ContactUs';

const baloo = Baloo_Bhaijaan_2({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800', '900'],
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
  // const fontClass = locale === 'ar' ? tajawal.className : baloo.className;
  const fontClass = locale === 'ar' ? tajawal.className : baloo.className;
  const bodyFontClass = locale === 'ar' ? tajawal.className : baloo.className;


  return (
    <html lang={locale} className={fontClass} dir={direction}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={bodyFontClass}>
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
