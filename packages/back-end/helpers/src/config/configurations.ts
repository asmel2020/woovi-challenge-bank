import 'dotenv/config';

export const configurations = {
  NODE_ENV: process.env.NODE_ENV || undefined,
  PORT: parseInt(process.env.PORT || '8000', 10),
  JWT_SECRET: process.env.JWT_SECRET || 'development',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://root:example@localhost:27017/'
};
