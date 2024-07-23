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

router.get('/api', async (ctx: any) => {
  ctx.body = renderGraphiQL({});
});

router.all('/graphql', async (ctx: any) => {
  const request: any = {
    body: ctx.request.body,
    headers: ctx.req.headers,
    method: ctx.request.method,
    query: ctx.request.query,
  };

  if (shouldRenderGraphiQL(request)) {
    ctx.body = renderGraphiQL({});
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request);
    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
    });

    ctx.respond = false;
    sendResult(result, ctx.res);
  }
});

app.use(router.routes()).use(router.allowedMethods());

export default app;
