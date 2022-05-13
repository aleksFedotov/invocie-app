import { useState } from 'react';
import type { AppProps } from 'next/app';
import { GlobalStyles, MainWrapper, PageWrapper } from '../styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme/theme';
import { Provider } from 'react-redux';
import store from '../store/store';

import Header from '../components/header/Header';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<string>('dark');
  const changeTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
      localStorage.setItem('theme', theme);
    }
  };
  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <Provider store={store}>
        <GlobalStyles />
        <PageWrapper>
          <Header themeHandler={changeTheme} theme={theme} />
          <MainWrapper>
            <Component {...pageProps} />
          </MainWrapper>
        </PageWrapper>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
