import 'dotenv/config';

export default {
  PORT: parseInt(process.env.PORT || '8000', 10),
  JWT_SECRET: process.env.JWT_SECRET || 'ASDASDASDASD',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://root:example@localhost:27017/',
  AUTH_SERVICES_API_KEY: process.env.AUTH_SERVICES_API_KEY || '',
};
