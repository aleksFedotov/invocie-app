import type { NextPage } from 'next';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Data from '../data.json';
import { IInvoice, IInvoiceListData } from '../@types/types';
import { selectFilters } from '../store/filterSlice';
import { selectformModal } from '../store/modalSlice';
import { useAppSelector } from '../store/hooks';
import { AnimatePresence } from 'framer-motion';

import InvoicesHeader from '../components/home/header/InvoicesHeader';
import InvoicesList from '../components/home/invoices-list/InvoicesList';
import EmptyList from '../components/home/empty-invoicelist/EmptyList';
import Modal from '../components/UI/modal/Modal';
import InvoiceForm from '../components/shered/form/InvoiceForm';

const Home: NextPage<{ invoicesListData: IInvoiceListData[] }> = ({
  invoicesListData,
}) => {
  const filters = useAppSelector(selectFilters);
  const isModalOpened = useAppSelector(selectformModal);

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
      <AnimatePresence>
        {isModalOpened && (
          <Modal type="new">
            <InvoiceForm />
          </Modal>
        )}
      </AnimatePresence>
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
