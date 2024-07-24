import { createServer } from 'http';
import { useServer } from 'graphql-ws/lib/use/ws';
import ws from 'ws';
import { schema } from './schema/schema';
import configuration from './config/configuration';
import app from './app';

async function bootstrap() {
  
  const server = createServer(app.callback());

  server.listen(configuration.PORT, () => console.log(`server running on port :${configuration.PORT}`));

  const graphqlWs = new ws.Server({ server });

  useServer({ schema }, graphqlWs);

}

bootstrap();
