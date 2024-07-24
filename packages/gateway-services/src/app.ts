import Koa from 'koa';
//@ts-ignore
import Router from 'koa-router';
import logger from 'koa-logger';
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
import koaPlayground from 'graphql-playground-middleware-koa';
import { getGraphQLParameters, processRequest, renderGraphiQL, sendResult, shouldRenderGraphiQL } from 'graphql-helix';

import { schema } from './schema/schema';

const router = new Router();

const app = new Koa();

app.use(bodyParser());

app.on('error', (err: any) => console.log('app error: ', err));

app.use(logger());

app.use(cors());

router.all(
  '/graphql',
  koaPlayground({
    endpoint: '/graphql',
    subscriptionEndpoint: '/subscriptions',
  }),
);

router.all('/graphql', async (ctx: any) => {
  const request= {
    body: ctx.request.body,
    headers: ctx.req.headers,
    method: ctx.request.method,
    query: ctx.request.query,
  };

 
  if (shouldRenderGraphiQL(request)) {
    ctx.body = renderGraphiQL({});
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request);
  
    const result:any = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
      contextFactory(executionContext) {

        return { req: request };
      },
    });

    ctx.respond = false;
    sendResult(result, ctx.res);
  }
});

app.use(router.routes()).use(router.allowedMethods());

export default app;
