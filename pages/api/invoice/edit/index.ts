import type { NextApiRequest, NextApiResponse } from 'next';
import { IInvoice } from '../../../../@types/types';
import prisma from '../../../../client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const data: IInvoice = req.body;

    let invoice;
    try {
      invoice = await prisma.invoice.findFirst({
        where: {
          // @ts-ignore
          id_db: data.id_db,
        },
        include: {
          items: true,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: 'Something went wrong, could not edit invoice.',
      });
    }

    if (invoice!.userId !== data.userId) {
      return res.status(501).json({
        success: false,
        msg: 'You are not allowed to edit this invoice.',
      });
    }

    try {
      await prisma.item.deleteMany({
        where: { invoiceId: invoice?.id_db },
      });
      await prisma.invoice.update({
        where: {
          // @ts-ignore
          id_db: data.id_db,
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
          items: {
            create: data.items.map((item) => {
              return {
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.total,
              };
            }),
          },
          total: data.total,
        },
      });
    } catch (error) {
      console.log('second', error);
      return res.status(500).json({
        success: false,
        msg: 'Something went wrong, could not edit invoice.',
      });
    }
    res.status(200).json({ success: true, msg: 'Invoice was edit' });
  }
}
