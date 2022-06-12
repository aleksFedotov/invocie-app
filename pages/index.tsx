import type { NextPage } from 'next';
import Head from 'next/head';
import prisma from '../client';
import nookies, { destroyCookie } from 'nookies';
import { GetServerSideProps } from 'next';
import { IInvoiceListData } from '../@types/types';
import { selectFilters } from '../store/filterSlice';
import { selectformModal } from '../store/modalSlice';
import { selectDemo } from '../store/demoSlice';
import { logout, selectAuth } from '../store/authSlice';
import { useAppSelector } from '../store/hooks';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/authSlice';
import { loginDemo } from '../store/demoSlice';
import { useRouter } from 'next/router';

import InvoicesHeader from '../components/home/header/InvoicesHeader';
import InvoicesList from '../components/home/invoices-list/InvoicesList';
import EmptyList from '../components/home/empty-invoicelist/EmptyList';
import Modal from '../components/UI/modal/Modal';
import InvoiceForm from '../components/shered/form/InvoiceForm';
import Welcome from '../components/home/welcome/Welcome';
import { wrapper } from '../store/store';

let logOutTimer: ReturnType<typeof setTimeout>;

const Home: NextPage<{ invoicesListData: IInvoiceListData[] }> = ({
  invoicesListData,
}) => {
  const filters = useAppSelector(selectFilters);
  const isModalOpened = useAppSelector(selectformModal);
  const { isDemoMode, invoices } = useAppSelector(selectDemo);
  const { token, tokenExpirationDate, isLogin } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const refreshData = useCallback(
    () => router.replace(router.asPath),
    [router]
  );

  if (filters.length) {
    invoicesListData = invoicesListData.filter((invoice) =>
      filters.includes(invoice.status)
    );
  }

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();
      logOutTimer = setTimeout(() => {
        dispatch(logout());
        destroyCookie(null, 'userData');
        refreshData();
      }, remainingTime);
    } else {
      clearTimeout(logOutTimer);
    }
  }, [token, dispatch, tokenExpirationDate, refreshData]);

  useEffect(() => {
    const cookies = parseCookies();
    if (Object.keys(cookies).length === 0) return;
    const storedData = JSON.parse(cookies.userData);
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      dispatch(
        login({
          userId: storedData.id,
          token: storedData.token,
          tokenExpirationDate: storedData.expiration,
        })
      );
    }
  }, [dispatch]);

  if (!isLogin && !isDemoMode) {
    return <Welcome />;
  }

  if (isDemoMode) {
    invoicesListData = invoices;
  }

  return (
    <>
      <Head>
        <title>Incoice app</title>
        <meta name="description" content="Invoices" />
        <link rel="icon" href="/assets/favicon-32x32.png" />
      </Head>

      <InvoicesHeader total={invoicesListData.length} />
      {invoicesListData.length ? (
        <InvoicesList data={invoicesListData} />
      ) : (
        <EmptyList />
      )}
      <AnimatePresence>
        {isModalOpened && (
          <Modal type="new">
            <InvoiceForm create />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const cookies = nookies.get(ctx);

    if (Object.keys(cookies).length === 0) {
      store.dispatch(loginDemo());

      const data = store.getState().demo.invoices;

      return {
        props: {
          invoicesListData: data,
        },
      };
    }
    const userData = JSON.parse(cookies.userData);

    const data = await prisma.user.findUnique({
      where: {
        id: userData.id,
      },
      include: {
        invoices: true,
      },
    });

    return {
      props: {
        invoicesListData: data?.invoices,
      },
    };
  });

export default Home;
