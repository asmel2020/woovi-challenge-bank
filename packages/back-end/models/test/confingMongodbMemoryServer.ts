import mongoose from 'mongoose';

async function connectMongoose() {
  const { MONGO_URI }: any = global;

  jest.setTimeout(20000);

  return mongoose.connect(MONGO_URI, { connectTimeoutMS: 10000 });
}

const disconnectMongoose = () => mongoose.disconnect();

const clearDatabase = async () => await mongoose.connection.db.dropDatabase();

export { clearDatabase, disconnectMongoose, connectMongoose };
