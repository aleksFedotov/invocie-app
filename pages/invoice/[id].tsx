import type { NextPage } from 'next';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Data from '../../data.json';
import { IInvoice } from '../../@types/types';

import InvoiceViewHeader from '../../components/ivoice-view/header/InvoiceViewHeader';
import InvoiceViewContent from '../../components/ivoice-view/content/InvoiceViewContent';
import HomeLink from '../../components/ivoice-view/home-link/HomeLink';

const InvoceView: NextPage<{ invoiceData: IInvoice }> = ({ invoiceData }) => {
  return (
    <>
      <Head>
        <title>Incoice app</title>
        <meta name="description" content="Invoice View" />
        <link rel="icon" href="/assets/favicon-32x32.png" />
      </Head>

      <HomeLink />
      <InvoiceViewHeader data={invoiceData} />
      <InvoiceViewContent data={invoiceData} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id;
  const invoiceData = Data.find((invoice) => invoice.id === id);

  return {
    props: {
      invoiceData,
    },
  };
};

export default InvoceView;
