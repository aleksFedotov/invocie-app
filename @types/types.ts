export interface IInvoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: ISenderAddress;
  clientAddress: IClientAddress;
  items: IInvoiceItem[];
  total: number;
}

export interface ISenderAddress {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface IClientAddress {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface IInvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}
