import { Inputs, IInvoice } from '../@types/types';
import createID from './generateId';
import { format, addDays } from 'date-fns';

export default function generateData(data: Inputs, type = 'pending'): IInvoice {
  const total = data.items.reduce((acc, curr) => (acc = acc + curr.total), 0);
  const dateDue = addDays(new Date(data.createdAt), data.paymentTerms);
  return {
    ...data,
    id: createID(),
    status: type,
    total,
    paymentDue: format(dateDue, 'yyyy-MM-dd'),
  };
}
