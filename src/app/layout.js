import { Baloo_Bhaijaan_2 } from 'next/font/google';
import ClientLayout from './ClientLayout';
const baloo = Baloo_Bhaijaan_2({
  subsets: ['latin'],
  weight: ['400', '800'],
});

export const metadata = {
  title: 'Brandah',
  description: 'Brandah Dream, Explore, Discover Your Travel Begins Here ',

  icons: {
    icon: '/carousel-home.png',
    apple: '/carousel-home.png',
  },
};

export default function Layout({ children }) {
  return (
    <html lang="en" className={baloo.className}>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

