import 'dotenv/config';

export default {
  PORT: parseInt(process.env.PORT || '8000', 10),
  JWT_SECRET: process.env.JWT_SECRET || 'ASDASDASDASD',
  AUTH_SERVICES: {
    AUTH_SERVICES_URL: process.env.AUTH_SERVICES_URL || 'http://localhost:8001',
    AUTH_SERVICES_API_KEY: process.env.AUTH_SERVICES_API_KEY || '',
  },
};
