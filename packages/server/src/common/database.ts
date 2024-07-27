import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  mongoose.connection.on('close', () => console.log('Database connection closed.'));

  await mongoose.connect('mongodb://root:example@localhost:27017/');
};
