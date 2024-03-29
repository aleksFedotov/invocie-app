import type { NextPage } from 'next';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import dbConnect from '../../helpers/mongoDB';
import Invoice from '../../models/invoice';
import Data from '../../data.json';
import { IInvoice } from '../../@types/types';
import { useAppSelector } from '../../store/hooks';
import { selectDeleteModal, selectformModal } from '../../store/modalSlice';
import { selectDemo } from '../../store/demoSlice';
import { Button } from '../../components/UI/button/ButtonStyles';
import InvoiceViewHeader from '../../components/ivoice-view/header/InvoiceViewHeader';
import InvoiceViewContent from '../../components/ivoice-view/content/InvoiceViewContent';
import Modal from '../../components/UI/modal/Modal';
import DeletePopup from '../../components/ivoice-view/delete-popup/DeletePopup';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import IconArrowLeft from '../../public/assets/icon-arrow-left.svg';
import InvoiceForm from '../../components/shered/form/InvoiceForm';
import prisma from '../../client';
import useWindowWidth from '../../hooks/useWindowWidth';
import ViewButtons from '../../components/ivoice-view/view-buttons/ViewButtons';

const InvoceView: NextPage<{ invoiceData: IInvoice }> = ({ invoiceData }) => {
  const modalIsOpened = useAppSelector(selectDeleteModal);
  const isFormModalOpened = useAppSelector(selectformModal);
  const { invoices, isDemoMode } = useAppSelector(selectDemo);
  const windowWidth = useWindowWidth();
  const router = useRouter();

  if (!invoiceData) {
    const { id } = router.query;
    // @ts-ignore
    invoiceData = invoices.find((item) => item.id === id);
    if (!id || !invoiceData) return <></>;
  }
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
          router.push('/', undefined, { shallow: true });
        }}
      >
        <IconArrowLeft />
        <p>Go back</p>
      </Button>
      <InvoiceViewHeader data={invoiceData} />
      <InvoiceViewContent data={invoiceData} />
      {windowWidth! < 700 && (
        <ViewButtons
          isMobile={true}
          invoiceId={isDemoMode ? invoiceData.id : invoiceData._id}
        />
      )}
      <AnimatePresence>
        {modalIsOpened && (
          <Modal type="delete" key="modal">
            <DeletePopup
              id={invoiceData.id}
              invoiceId={invoiceData._id}
              key="delete"
            />
          </Modal>
        )}
        <AnimatePresence>
          {isFormModalOpened && (
            <Modal type="new">
              <InvoiceForm edit data={invoiceData} />
            </Modal>
          )}
        </AnimatePresence>
      </AnimatePresence>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id;

  // const invoiceData = await prisma.invoice.findFirst({
  //   where: {
  //     // @ts-ignore
  //     id: id,
  //   },
  //   include: {
  //     senderAddress: true,
  //     clientAddress: true,
  //     items: true,
  //   },
  // });

  await dbConnect();
  const invoiceData = await Invoice.findOne({ id: id });

  return {
    props: {
      invoiceData: JSON.parse(JSON.stringify(invoiceData)),
    },
  };
};

export default InvoceView;
