import type { NextPage } from 'next';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Data from '../../data.json';
import { IInvoice } from '../../@types/types';
import { useAppSelector } from '../../store/hooks';
import { selectDeleteModal } from '../../store/modalSlice';
import { Button } from '../../components/UI/button/ButtonStyles';

import InvoiceViewHeader from '../../components/ivoice-view/header/InvoiceViewHeader';
import InvoiceViewContent from '../../components/ivoice-view/content/InvoiceViewContent';
import Modal from '../../components/UI/modal/Modal';
import DeletePopup from '../../components/ivoice-view/delete-popup/DeletePopup';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import IconArrowLeft from '../../public/assets/icon-arrow-left.svg';

const InvoceView: NextPage<{ invoiceData: IInvoice }> = ({ invoiceData }) => {
  const modalIsOpened = useAppSelector(selectDeleteModal);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Incoice app</title>
        <meta name="description" content="Invoice View" />
        <link rel="icon" href="/assets/favicon-32x32.png" />
      </Head>

      <Button
        className="back_btn"
        onClick={() => {
          router.push('/');
        }}
      >
        <IconArrowLeft />
        <p>Go back</p>
      </Button>
      <InvoiceViewHeader data={invoiceData} />
      <InvoiceViewContent data={invoiceData} />
      <AnimatePresence>
        {modalIsOpened && (
          <Modal type="delete" key="modal">
            <DeletePopup id={invoiceData.id} key="delete" />
          </Modal>
        )}
      </AnimatePresence>
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
