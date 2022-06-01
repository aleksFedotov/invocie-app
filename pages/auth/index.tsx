import type { NextPage } from 'next';
import Head from 'next/head';
// import { GetServerSideProps } from 'next';

// import prisma from '../client';

import Auth from '../../components/auth/Auth';

const Authentication: NextPage = () => {
  return (
    <>
      <Head>
        <title>Incoice app</title>
        <meta name="description" content="Invoice web app | Authentication" />
        <link rel="icon" href="/assets/favicon-32x32.png" />
      </Head>

      <Auth />
    </>
  );
};

export default Authentication;
