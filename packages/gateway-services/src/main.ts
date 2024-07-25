import { createServer } from 'http';
import { useServer } from 'graphql-ws/lib/use/ws';
import { Context } from 'graphql-ws';
import ws from 'ws';
import { schema } from './schema/schema';
import configuration from './config/configuration';
import app, { clientServer, connections } from './app';
import { decodeTokenJWT } from './common/helpers/generateTokenJWT';
import { GraphQLError } from 'graphql';
import guardAuth from './common/helpers/guardAuth';

interface IContext extends Context {
  c: string;
}
async function bootstrap() {
  const server = createServer(app.callback());
  server.listen(configuration.PORT, () => console.log(`server running on port :${configuration.PORT}`));
  const graphqlWs = new ws.Server({ server });
  useServer(
    {
      schema,
      context: (ctx, msg, args) => {
        const request = {
          headers: ctx.extra.request.headers,
          method: ctx.extra.request.method,
        };
        const { userID } = guardAuth(request.headers.authorization as any);

        if (!userID) {
          throw new GraphQLError('Not authorized');
        }

        connections.set(userID, ctx.extra.socket);
        return { request, userID }; 
      },
      onClose: (ctx: any, msg, args) => {
        // get user id to close websocket connection
        const { userID } = guardAuth(ctx.extra.request.headers.authorization);
        
        // get client from clientServer and unsubscribe from subscription
        const unsubscribe = clientServer.get(userID);

        // if client exist
        if (unsubscribe) {
          // unsubscribe from subscription
          unsubscribe();
          // delete client from clientServer
          clientServer.delete(userID);
          return;
        }
      },
      onError: (ctx: any, msg, args) => {
        // get user id to close websocket connection
        const { userID } = guardAuth(ctx.extra.request.headers.authorization);

        // get client from clientServer and unsubscribe from subscription
        const unsubscribe = clientServer.get(userID);

        // if client exist
        if (unsubscribe) {
          // unsubscribe from subscription
          unsubscribe();
          // delete client from clientServer
          clientServer.delete(userID);
          return;
        }
      },
    },
    graphqlWs,
  );
}

bootstrap();
