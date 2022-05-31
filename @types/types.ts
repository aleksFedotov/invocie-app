export interface IInvoice {
  id_db?: string;
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: IAddress;
  clientAddress: IAddress;
  items: IInvoiceItem[];
  total: number;
}

export interface IAddress {
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

export interface IInvoiceListData {
  id: string;
  paymentDue: string;
  clientName: string;
  total: number;
  status: string;
}

export type Inputs = {
  createdAt: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  senderAddress: IAddress;
  clientAddress: IAddress;
  items: IInvoiceItem[];
};
