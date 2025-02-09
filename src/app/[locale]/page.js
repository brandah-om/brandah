'use client';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/globals.css';
import Home from './home/home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = ({ params }) => {
  const { locale } = params;

  return (
    <div>

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
      <Home />
    </div>
  );
};

export default Page;

