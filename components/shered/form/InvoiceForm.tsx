import React from 'react';

import { FormWrapper } from './InvoiceFormStyles';

const InvoiceForm: React.FC = () => {
  const formAnimation = {
    hidden: {
      x: '-100%',
      transition: { type: 'spring', duration: 0.75 },
    },
    visible: {
      x: 0,
      transition: { type: 'spring', duration: 0.75 },
    },
  };
  return (
    <FormWrapper
      variants={formAnimation}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <h2>New Invoice</h2>
    </FormWrapper>
  );
};

export default InvoiceForm;
