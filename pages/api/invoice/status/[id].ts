import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../client';
import dbConnect from '../../../../helpers/mongoDB';
import Invoice from '../../../../models/invoice';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    const invoiceId = req.query.id;
    // for prisma
    // const data = req.body;

    let invoice;
    await dbConnect();
    try {
      // invoice = await prisma.invoice.findFirst({
      //   where: {
      //     // @ts-ignore
      //     id_db: invoiceId,
      //   },
      //   include: {
      //     items: true,
      //   },
      // });
      invoice = await Invoice.findOne({
        _id: invoiceId,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: 'Something went wrong, could not update status.',
      });
    }
    try {
      // await prisma.invoice.update({
      //   where: {
      //     // @ts-ignore
      //     id_db: invoiceId,
      //   },
      //   data: {
      //     status: 'paid',
      //   },
      // });
      await Invoice.updateOne(
        {
          _id: invoiceId,
        },
        {
          $set: {
            status: 'paid',
          },
        }
      );
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: 'Something went wrong, could not update status.',
      });
    }

    res.status(200).json({ success: true, msg: 'Status was updated' });
  }
}
