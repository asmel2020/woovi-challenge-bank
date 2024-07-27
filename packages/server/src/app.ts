/* import { getGraphQLParameters, processRequest, renderGraphiQL, sendResult, shouldRenderGraphiQL } from 'graphql-helix'; */
import koaPlayground from 'graphql-playground-middleware-koa';
import cors from 'kcors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import Router from 'koa-router';

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

app.use(router.routes()).use(router.allowedMethods());

export default app;
