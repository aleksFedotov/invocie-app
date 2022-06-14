import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    const invoiceId = req.query.id;
    const data = req.body;

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
      return res.status(500).json({
        success: false,
        msg: 'Something went wrong, could not update status.',
      });
    }
    try {
      await prisma.invoice.update({
        where: {
          // @ts-ignore
          id_db: invoiceId,
        },
        data: {
          status: 'paid',
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        msg: 'Something went wrong, could not update status.',
      });
    }

    res.status(200).json({ success: true, msg: 'Status was updated' });
  }
}
