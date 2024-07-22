import mongoose from 'mongoose';
import configuration from '../config/configuration';

export const connectDatabase = async (): Promise<void> => {
  // eslint-disable-next-line no-console
  mongoose.connection.on('close', () => console.log('Database connection closed.'));

  await mongoose.connect(configuration.MONGO_URI);
};
