import { createServer } from 'http';
import configuration from './config/configuration';
import app from './app';
import { connectDatabase } from './common/database';

async function bootstrap() {
  await connectDatabase();
  const server = createServer(app.callback());
  server.listen(configuration.PORT, () => {
    console.log(`server running on port :${configuration.PORT}`);
  }); 
}

bootstrap();
