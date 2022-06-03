import { format } from 'date-fns';

const defaultValues = {
  description: '',
  createdAt: format(Date.now(), 'yyyy-MM-dd'),
  paymentTerms: 30,
  clientName: '',
  clientEmail: '',

  senderAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  items: [],
};

export default defaultValues;
