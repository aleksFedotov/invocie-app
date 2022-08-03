import mongoose from 'mongoose';
import Invoice from './invoice';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  invoices: [
    {
      type: Schema.Types.ObjectId,
      required: false,
      ref: Invoice,
    },
  ],
});

export default mongoose.models.User || mongoose.model('User', userSchema);
