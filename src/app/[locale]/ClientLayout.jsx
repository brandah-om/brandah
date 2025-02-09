'use client';

import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function ClientProviders({ children, messages, locale }) {
  return (
    <Provider store={store}>
      <NextIntlClientProvider messages={messages} locale={locale}>
        {children}
      </NextIntlClientProvider>
    </Provider>
  );
}
