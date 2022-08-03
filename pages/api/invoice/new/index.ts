import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../../helpers/mongoDB';
import Invoice from '../../../../models/invoice';
import prisma from '../../../../client';
import user from '../../../../models/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const data = req.body;

  if (req.method === 'POST') {
    let existinguser;
    try {
      // existinguser = await prisma.user.findUnique({
      //   where: {
      //     id: data.userId,
      //   },
      // });
      existinguser = await user.findOne({ id: data.userId });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: 'Creation failed, please try again later.',
      });
    }

    if (!existinguser) {
      return res.status(401).json({
        success: false,
        msg: 'Please login in',
      });
    }

    try {
      // await prisma.invoice.create({
      //   data: {
      //     id: data.id,
      //     createdAt: data.createdAt,
      //     paymentDue: data.paymentDue,
      //     description: data.description,
      //     paymentTerms: data.paymentTerms,
      //     clientName: data.clientName,
      //     clientEmail: data.clientEmail,
      //     status: data.status,
      //     senderAddress: {
      //       create: {
      //         street: data.senderAddress.street,
      //         city: data.senderAddress.city,
      //         postCode: data.senderAddress.postCode,
      //         country: data.senderAddress.country,
      //       },
      //     },
      //     clientAddress: {
      //       create: {
      //         street: data.clientAddress.street,
      //         city: data.clientAddress.city,
      //         postCode: data.clientAddress.postCode,
      //         country: data.clientAddress.country,
      //       },
      //     },
      //     items: { create: [...data.items] },
      //     total: data.total,
      //     user: { connect: { id: data.userId } },
      //   },
      // });

      const newInvoice = await Invoice.create({
        id: data.id,
        createdAt: data.createdAt,
        paymentDue: data.paymentDue,
        description: data.description,
        paymentTerms: data.paymentTerms,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        status: data.status,
        senderAddress: {
          street: data.senderAddress.street,
          city: data.senderAddress.city,
          postCode: data.senderAddress.postCode,
          country: data.senderAddress.country,
        },
        clientAddress: {
          street: data.clientAddress.street,
          city: data.clientAddress.city,
          postCode: data.clientAddress.postCode,
          country: data.clientAddress.country,
        },
        items: [...data.items],
        total: data.total,
        userId: data.userId,
      });

      await user.findByIdAndUpdate(data.userId, {
        $push: { invoices: newInvoice._id },
      });

      res.status(200).json({ success: true, msg: 'Invoice was created' });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: 'Can not create a new invoice, please try later',
      });
    }
  }
}
