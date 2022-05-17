import type { NextPage } from 'next';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Data from '../../data.json';
import { IInvoice } from '../../@types/types';
import Link from 'next/link';
import ArrowLeftIcon from '../../public/assets/icon-arrow-left.svg';
import styled from 'styled-components';
import InvoiceViewHeader from '../../components/invoce-view-header/InvoiceViewHeader';
import InvoiceViewContent from '../../components/invoice-view-main/InvoiceViewContent';
const GoBack = styled.div`
  display: flex;
  gap: 2.2rem;
  cursor: pointer;
  font-family: 'Spartan-Bold';

  p {
    color: ${({ theme }) => theme.mainText};
  }
`;

const InvoceView: NextPage<{ invoiceData: IInvoice }> = ({ invoiceData }) => {
  return (
    <>
      <Head>
        <title>Incoice app</title>
        <meta name="description" content="Invoice View" />
        <link rel="icon" href="/assets/favicon-32x32.png" />
      </Head>

      <Link href={'/'}>
        <GoBack>
          <ArrowLeftIcon />
          <p>Go back</p>
        </GoBack>
      </Link>
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
