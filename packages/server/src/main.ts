import { createServer } from 'http';
import app from './app';

async function bootstrap() {
  const server = createServer(app.callback());
  server.listen(8000, () => console.log(`server running on port :${8000}`));
}

bootstrap();
