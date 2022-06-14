import { useState } from 'react';
import type { AppProps } from 'next/app';
import { GlobalStyles, MainWrapper, PageWrapper } from '../styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme/theme';
import { Provider } from 'react-redux';
import store from '../store/store';

import { useRouter } from 'next/router';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import Header from '../components/header/Header';

import { AnimatePresence } from 'framer-motion';

let persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<string>('dark');

  const router = useRouter();

  const changeTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
      localStorage.setItem('theme', theme);
    }
  };

  const pageAnimation = {
    hidden: {
      opacity: 0,
      transition: {
        type: 'tween',
        ease: 'easeIn',
        duration: 0.5,
        staggerChildren: 0,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'tween', ease: 'easeOut', duration: 1 },
    },
    exit: {
      opacity: 0,
      x: '50%',
      transition: {
        type: 'tween',
        ease: 'easeIn',
        duration: 0.5,
        staggerChildren: 0,
      },
    },
  };
  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyles />
          <PageWrapper>
            <Header themeHandler={changeTheme} theme={theme} />
            <AnimatePresence exitBeforeEnter>
              <MainWrapper
                key={router.route}
                variants={pageAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Component {...pageProps} />
              </MainWrapper>
            </AnimatePresence>
          </PageWrapper>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
