import { createServer } from 'http';
import { configurations } from '@bank/helpers';
import app from './app';
import { connectDatabase } from './common/database';
async function bootstrap() {
  await connectDatabase();
  const server = createServer(app.callback());
  server.listen(configurations.PORT, () => console.log(`server running on port :${configurations.PORT}`));
}

bootstrap();
