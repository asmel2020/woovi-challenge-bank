import { configurations } from '@bank/helpers';
import mongoose from 'mongoose';
/* import { MongoMemoryServer } from 'mongodb-memory-server'; */
export const connectDatabase = async (): Promise<void> => {
  mongoose.connection.on('close', () => console.log('Database connection closed.'));

  let url: string;

  if (configurations.NODE_ENV === 'development') {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const MMS = await MongoMemoryServer.create();
    url = MMS.getUri();
    console.log('MongoDB Memory Server started.');
  } else {
    url = configurations.MONGO_URI;
    console.log('MongoDB Server started.');
  }

  await mongoose.connect(url);
};
