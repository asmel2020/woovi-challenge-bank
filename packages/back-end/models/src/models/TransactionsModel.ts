import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './UserModel';
const { ObjectId } = Schema;

const transactionSchema = new mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      required: true,
      ref: 'User',
      trim: true
    },
    recipient: {
      type: ObjectId,
      ref: 'User',
      required: true,
      trim: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    description: {
      type: String,
      trim: true
    },
    direction: {
      type: String,
      required: true,
      enum: ['received', 'sent'] // Indicates if the transfer is incoming or outgoing
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    },
    collection: 'Transaction'
  }
);

export interface ITransaction extends Document {
  sender: IUser['_id'];
  recipient: IUser['_id'];
  amount: number;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
  description?: string;
  direction: 'received' | 'sent';
}

const TransactionModel: Model<ITransaction> =
  mongoose.models['Transaction'] || mongoose.model('Transaction', transactionSchema);

export default TransactionModel;
