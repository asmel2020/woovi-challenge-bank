import { getGraphQLParameters, processRequest, renderGraphiQL, sendResult, shouldRenderGraphiQL } from 'graphql-helix';
import koaPlayground from 'graphql-playground-middleware-koa';
import cors from 'kcors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import Router from 'koa-router';
import { schema } from './schema/schema';
import { getUser } from '@bank/helpers';

const router = new Router();

const app = new Koa();

app.use(bodyParser());

app.on('error', err => console.log('app error: ', err));

app.use(logger());

app.use(cors());

router.all(
  '/graphql',
  koaPlayground({
    endpoint: '/graphql',
    subscriptionEndpoint: '/subscriptions'
  })
);

router.all('/graphql', async (ctx: any) => {
  const request = {
    body: ctx.request.body,
    headers: ctx.req.headers,
    method: ctx.request.method,
    query: ctx.request.query
  };

  const user = await getUser(ctx.request.headers.authorization);

  if (shouldRenderGraphiQL(request)) ctx.body = renderGraphiQL({});
  else {
    const { operationName, query, variables } = getGraphQLParameters(request);

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
      contextFactory: () => ({
        req: request,
        user
      })
    });

    ctx.respond = false;
    sendResult(result, ctx.res);
  }
});
app.use(router.routes()).use(router.allowedMethods());

export default app;
