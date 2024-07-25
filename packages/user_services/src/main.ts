import { createServer } from 'http';
import { useServer } from 'graphql-ws/lib/use/ws';
import ws from 'ws';
import configuration from './config/configuration';
import { connectDatabase } from './common/database';
import { schema } from './schema/schema';
import app, { mapUserData } from './app';

import { GraphQLError } from 'graphql';
/* import guardAuth from './common/helpers/guardAuth'; */
import { getUser } from './common/helpers/getUser';
/* import { mapUserData } from './modules/user/subscription'; */

async function bootstrap() {
  await connectDatabase();
  const server = createServer(app.callback());
  server.listen(configuration.PORT, () => console.log(`server running on port :${configuration.PORT}`));
  const graphqlWs = new ws.Server({ server });
  useServer(
    {
      schema,
      context: async (ctx, msg, args) => {
        const request = {
          headers: ctx.extra.request.headers,
          method: ctx.extra.request.method,
          connectionParams: ctx.connectionParams,
        };
        const user = await getUser(request.connectionParams?.authorization as any);
        if (!user) {
          throw new GraphQLError('Not authorized');
        }
        return { request, user };
      },
      onClose: (ctx: any, msg, args) => {
        // close the subscription when the connection is closed
        mapUserData.get(ctx.connectionParams.id)?.return?.();
      },
      onError: (ctx: any, msg, args) => {
         // close the subscription when the connection is closed
        mapUserData.get(ctx.connectionParams.id)?.return?.();
      },
    },
    graphqlWs,
  );
}

bootstrap();
