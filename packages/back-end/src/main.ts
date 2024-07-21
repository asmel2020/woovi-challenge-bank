import http from 'http';

import Koa from 'koa';

import configuration from './config/configuration';

const app = new Koa();
 
async function bootstrap() {
  const server = http.createServer(app.callback());

  server.listen(configuration.PORT, () => {
    console.log(`server running on port :${configuration.PORT}`);
  });
}

bootstrap();
