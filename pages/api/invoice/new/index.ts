import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../client';

const data = {
  id: 'XM9141',
  createdAt: '2021-08-21',
  paymentDue: '2021-09-20',
  description: 'Graphic Design',
  paymentTerms: 30,
  clientName: 'Alex Grim',
  clientEmail: 'alexgrim@mail.com',
  status: 'pending',
  senderAddress: {
    street: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom',
  },
  clientAddress: {
    street: '84 Church Way',
    city: 'Bradford',
    postCode: 'BD1 9PB',
    country: 'United Kingdom',
  },
  items: [
    {
      name: 'Banner Design',
      quantity: 1,
      price: 156.0,
      total: 156.0,
    },
    {
      name: 'Email Design',
      quantity: 2,
      price: 200.0,
      total: 400.0,
    },
  ],
  total: 556.0,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      await prisma.invoice.create({
        data: {
          id: data.id,
          createdAt: data.createdAt,
          paymentDue: data.paymentDue,
          description: data.description,
          paymentTerms: data.paymentTerms,
          clientName: data.clientName,
          clientEmail: data.clientEmail,
          status: data.status,
          senderAddress: {
            create: {
              street: data.senderAddress.street,
              city: data.senderAddress.city,
              postCode: data.senderAddress.postCode,
              country: data.senderAddress.country,
            },
          },
          clientAddress: {
            create: {
              street: data.clientAddress.street,
              city: data.clientAddress.city,
              postCode: data.clientAddress.postCode,
              country: data.clientAddress.country,
            },
          },
          items: { create: [...data.items] },
          total: data.total,
        },
      });

      res.status(200).json({ success: true, msg: 'Invoice was created' });
    } catch (error) {
      res.status(500).json({
        success: true,
        msg: 'Can not create a new invoice, please try later',
      });
    }
  }
}
