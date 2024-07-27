import { createServer } from 'http';
import app from './app';
import { connectDatabase } from './common/database';

import { Calc } from '@bank/back-end';

async function bootstrap() {
  await connectDatabase();
  const server = createServer(app.callback());
  server.listen(8000, () => console.log(`server running on port :${8000}`));
}

bootstrap();
