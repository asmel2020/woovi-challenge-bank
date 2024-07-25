import { createServer } from 'http';
import { useServer } from 'graphql-ws/lib/use/ws';
import ws from 'ws';
import configuration from './config/configuration';
import { connectDatabase } from './common/database';
import { schema } from './schema/schema';
import app from './app';

import { GraphQLError } from 'graphql';

async function bootstrap() {
  await connectDatabase();

  const server = createServer(app.callback());
  server.listen(configuration.PORT, () => console.log(`server running on port :${configuration.PORT}`));
  const graphqlWs = new ws.Server({ server });
  useServer(
    {
      schema,
      context: (ctx, msg, args) => {
        const userID = ctx.connectionParams?.id || null;

        if (!userID) {
          throw new GraphQLError('Not authorized');
        }
        return { userID };
      },
      onClose: (ctx: any, msg, args) => {
        console.log('onClose');
      },
      onError: (ctx: any, msg, args) => {
        console.log('onError');
      },
    },
    graphqlWs,
  );
}

bootstrap();
