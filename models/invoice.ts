import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const invoiceSchame = new Schema({
  id: { type: String, require: true },
  status: { type: String, require: true },
  createdAt: { type: String, require: true },
  paymentDue: { type: String, require: true },
  description: { type: String, require: true },
  paymentTerms: { type: Number, require: true },
  clientName: { type: String, require: true },
  clientEmail: { type: String, require: true },
  senderAddress: {
    street: { type: String, require: true },
    city: { type: String, require: true },
    postCode: { type: String, require: true },
    country: { type: String, require: true },
  },
  clientAddress: {
    street: { type: String, require: true },
    city: { type: String, require: true },
    postCode: { type: String, require: true },
    country: { type: String, require: true },
  },

  items: [
    {
      name: { type: String, require: true },
      quantity: { type: Number, require: true },
      price: { type: Number, require: true },
      total: { type: Number, require: true },
    },
  ],
  total: { type: Number, require: true },
  userId: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'User',
  },
});

export default mongoose.models.Invoice ||
  mongoose.model('Invoice', invoiceSchame);
