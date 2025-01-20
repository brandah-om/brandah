import { Baloo_Bhaijaan_2 } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/globals.css'
import ClientLayout from './ClientLayout';
import NavBar from '@/components/navBar/NavBar';
import Footer from '@/components/footer/Footer';
const baloo = Baloo_Bhaijaan_2({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
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
          {/* <NavBar/> */}
          {children}
          <Footer/>
        </ClientLayout>
      </body>
    </html>
  );
}

