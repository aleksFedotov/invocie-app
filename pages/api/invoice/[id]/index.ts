import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../../helpers/mongoDB';
import Invoice from '../../../../models/invoice';
import prisma from '../../../../client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query;
    await dbConnect();
    try {
      // const invoice = await prisma.invoice.findFirst({
      //   where: {
      //     // @ts-ignore
      //     id_db: id,
      //   },
      //   include: {
      //     clientAddress: true,
      //     senderAddress: true,
      //     items: true,
      //   },
      // });
      const invoice = await Invoice.findOne({ _id: id });

      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({ success: false, msg: 'Can not find invoice' });
    }
  }
}
