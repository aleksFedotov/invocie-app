import type { NextPage } from 'next';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Data from '../data.json';
import { IInvoice } from '../@types/types';

import InvoicesHeader from '../components/invoices-header/InvoicesHeader';
import InvoicesList from '../components/invoices-list/InvoicesList';

const Home: NextPage<{ invoices: IInvoice[] }> = ({ invoices }) => {
  return (
    <>
      <Head>
        <title>Incoice app</title>
        <meta name="description" content="Invoice app" />
        <link rel="icon" href="/assets/favicon-32x32.png" />
      </Head>

      <InvoicesHeader total={invoices.length} />
      <InvoicesList data={invoices} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const invoices = await Data;

  return {
    props: {
      invoices,
    },
  };
};

export default Home;
