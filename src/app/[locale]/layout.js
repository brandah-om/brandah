import { Baloo_Bhaijaan_2 } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/globals.css';
import Footer from '@/components/footer/Footer';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import ClientProviders from './ClientLayout';

const baloo = Baloo_Bhaijaan_2({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
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
  if (!locale || !supportedLocales.includes(locale)) {
    return notFound();
  }

  let messages;
  try {
    messages = await getMessages(locale);
  } catch (error) {
    console.error('❌ خطأ في getMessages:', error);
    messages = {}; // تجنب كسر الموقع
  }
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} className={baloo.className} dir={direction}>
      <body>
        <ClientProviders messages={messages} locale={locale}>
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
