import 'dotenv/config';

export default {
  PORT: parseInt(process.env.PORT || '8000', 10),
  JWT_SECRET: process.env.JWT_SECRET || 'ASDASDASDASD',
  AUTH_SERVICES: {
    URL_AUTH_SERVICES: process.env.URL_AUTH_SERVICES || 'http://localhost:8001',
  },
};
