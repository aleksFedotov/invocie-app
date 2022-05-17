import type { NextPage } from 'next';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Data from '../data.json';
import { IInvoice, IInvoiceListData } from '../@types/types';
import { selectFilters } from '../store/filterSlice';
import { useAppSelector } from '../store/hooks';

import InvoicesHeader from '../components/invoices-header/InvoicesHeader';
import InvoicesList from '../components/invoices-list/InvoicesList';
import EmptyList from '../components/empty-invoicelist/EmptyList';

const Home: NextPage<{ invoicesListData: IInvoiceListData[] }> = ({
  invoicesListData,
}) => {
  const filters = useAppSelector(selectFilters);

  if (filters.length) {
    invoicesListData = invoicesListData.filter((invoice) =>
      filters.includes(invoice.status)
    );
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let initialData: IInvoice[] = Data;

  const invoicesListData = initialData.map(
    (invoice: IInvoice): IInvoiceListData => ({
      id: invoice.id,
      paymentDue: invoice.paymentDue,
      clientName: invoice.clientName,
      status: invoice.status,
      total: invoice.total,
    })
  );

  return {
    props: {
      invoicesListData,
    },
  };
};

export default Home;
