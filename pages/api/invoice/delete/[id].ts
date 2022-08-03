import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../helpers/mongoDB';
import Invoice from '../../../../models/invoice';
import User from '../../../../models/user';
// import { User, Invoice } from '@prisma/client';
import prisma from '../../../../client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const invoiceId = req.query.id;
    const { userId } = JSON.parse(req.body);

    let invoice;
    await dbConnect();
    try {
      // invoice = await prisma.invoice.findUnique({
      //   where: {
      //     // @ts-ignore
      //     id_db: invoiceId,
      //   },
      // });
      invoice = await Invoice.findOne({
        _id: invoiceId,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: 'Something went wrong, could not delete invoice.',
      });
    }

    if (invoice!.userId.toString() !== userId) {
      return res.status(501).json({
        success: false,
        msg: 'You are not allowed to delete this invoice.',
      });
    }

    try {
      // await prisma.invoice.delete({
      //   where: {
      //     // @ts-ignore
      //     id_db: invoiceId,
      //   },
      // });
      await Invoice.deleteOne({ _id: invoiceId });
      // @ts-ignore
      await User.updateOne({ _id: userId }, { $pull: { invoices: invoiceId } });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: 'Something went wrong, could not delete invoice.',
      });
    }

    res.status(200).json({ success: true, msg: 'Invoice was deleted' });
  }
}
