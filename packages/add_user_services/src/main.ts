import { createServer } from 'http';
import { useServer } from 'graphql-ws/lib/use/ws';
import ws from 'ws';
import configuration from './config/configuration';
import { connectDatabase } from './common/database';
import { schema } from './schema/schema';
import app from './app';
import pubSub, { EVENTS } from './common/helpers/pubSub';

async function bootstrap() {
  await connectDatabase();
  
  setInterval(async () => {
    await pubSub.publish(EVENTS.POST.NEW, { id: 'input.id' });
  }, 1000);
  const server = createServer(app.callback());
  server.listen(configuration.PORT, () => console.log(`server running on port :${configuration.PORT}`));
  const graphqlWs = new ws.Server({ server });
  useServer({ schema }, graphqlWs);
}

bootstrap();
