import type { NextApiRequest, NextApiResponse } from 'next';
import { User, Invoice } from '@prisma/client';
import prisma from '../../../../client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const invoiceId = req.query.id;
    const { userId } = JSON.parse(req.body);

    let invoice;
    try {
      invoice = await prisma.invoice.findUnique({
        where: {
          // @ts-ignore
          db: invoiceId,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: 'Something went wrong, could not delete invoice.',
      });
    }

    if (invoice!.userId !== userId) {
      return res.status(501).json({
        success: false,
        msg: 'You are not allowed to delete this invoice.',
      });
    }

    try {
      await prisma.invoice.delete({
        where: {
          // @ts-ignore
          db: invoiceId,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        msg: 'Something went wrong, could not delete invoice.',
      });
    }

    res.status(200).json({ success: true, msg: 'Invoice was deleted' });
  }
}
