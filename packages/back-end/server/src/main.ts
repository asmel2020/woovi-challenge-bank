import { createServer } from 'http';
import { useServer } from 'graphql-ws/lib/use/ws';
import { GraphQLError } from 'graphql';
import ws from 'ws';
import { configurations, getUser } from '@bank/helpers';
import app from './app';
import { connectDatabase } from './common/database';
import { schema } from './schema/schema';
async function bootstrap() {
  await connectDatabase();
  const server = createServer(app.callback());
  server.listen(configurations.PORT, () => console.log(`server running on port :${configurations.PORT}`));

  const graphqlWs = new ws.Server({ server });
  useServer(
    {
      schema,
      context: async ctx => {
        const request = {
          headers: ctx.extra.request.headers,
          method: ctx.extra.request.method,
          connectionParams: ctx.connectionParams
        };

        const user = await getUser(request.headers.authorization);

        if (!user)
          throw new GraphQLError('Not authorized', {
            extensions: {
              code: 'UNAUTHORIZED',
              statusCode: 401
            }
          });

        return { request, user };
      },
      onClose: ctx => {
        // close the subscription when the connection is closed
      },
      onError: ctx => {
        // close the subscription when the connection is closed
      }
    },
    graphqlWs
  );
}

bootstrap();
