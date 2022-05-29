import type { NextApiRequest, NextApiResponse } from 'next';
import { User, Invoice } from '@prisma/client';
import prisma from '../../../../client';

const data = {
  id: 'RT3080',
  createdAt: '2021-08-18',
  paymentDue: '2021-08-19',
  description: 'Re-branding',
  paymentTerms: 2,
  clientName: 'Jensen Huang',
  clientEmail: 'jensenh@mail.com',
  status: 'paid',
  senderAddress: {
    street: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom',
  },
  clientAddress: {
    street: '106 Kendell Street',
    city: 'Sharrington',
    postCode: 'NR24 5WQ',
    country: 'United Kingdom',
  },
  items: [
    {
      name: 'Brand Guidelines',
      quantity: 2,
      price: 1800.9,
      total: 1800.9,
    },
  ],

  total: 1800.9,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const invoiceId = req.query.id;
    // const data: Invoice = req.body;

    let invoice;
    try {
      invoice = await prisma.invoice.findFirst({
        where: {
          // @ts-ignore
          id_db: invoiceId,
        },
        include: {
          items: true,
        },
      });
    } catch (error) {
      // console.log(error);
      return res.status(500).json({
        success: false,
        msg: 'Something went wrong, could not edit invoice.',
      });
    }

    // if(invoice.userId !== data.userId) {
    //     return res.status(501).json({success: false, msg: "ou are not allowed to edit this invoice."})
    // }

    try {
      const updatedItems = data.items;
      await prisma.invoice.update({
        where: {
          // @ts-ignore
          id_db: invoiceId,
        },
        data: {
          createdAt: data.createdAt,
          paymentDue: data.paymentDue,
          description: data.description,
          paymentTerms: data.paymentTerms,
          clientName: data.clientName,
          clientEmail: data.clientEmail,
          status: data.status,
          senderAddress: {
            update: {
              street: data.senderAddress.street,
              city: data.senderAddress.city,
              postCode: data.senderAddress.postCode,
              country: data.senderAddress.country,
            },
          },
          clientAddress: {
            update: {
              street: data.clientAddress.street,
              city: data.clientAddress.city,
              postCode: data.clientAddress.postCode,
              country: data.clientAddress.country,
            },
          },
          items: { update: data.items },
          total: data.total,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        msg: 'Something went wrong, could not edit invoice.',
      });
    }
    res.status(200).json(invoice);
  }
}
