import { GraphQLObjectType, GraphQLString } from 'graphql';

/* import PostNew from '../modules/post/subscription/PostNewSubscription'; */

import { subscriptionWithClientId } from 'graphql-relay-subscription';
import pubSub, { EVENTS } from '../common/helpers/pubSub';

import { createClient } from 'graphql-ws';

import WebSocket from 'ws';

const client = createClient({
  url: 'ws://localhost:8002/subscriptions',
  webSocketImpl: WebSocket,
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: post => {
        console.log('post', post);
        return post.id;
      },
    },
  }),
});

type PostNew = {
  id: string;
};

const PostNewSubscription = subscriptionWithClientId({
  name: 'PostNew',
  inputFields: { id: { type: GraphQLString } },
  outputFields: {
    post: {
      type: PostType,
      resolve: async ({ id }: any, _, context) => ({ id }),
    },
  },

  subscribe: (input, context) => {
    const query = `subscription PostNew {
      PostNew(input: { id: "${input.id}" }) {
          post {
              id
          }
      }
  }
  `;
    const variables = {};

    client.subscribe(
      {
        query,
        variables,
      },
      {
        next: async (data: any) => {
          await pubSub.publish(EVENTS.POST.NEW, { id: data.data.PostNew.post.id });
        },
        error: data => console.log(data),
        complete: () => console.log('complete'),
      },
    );

    return pubSub.asyncIterator(EVENTS.POST.NEW);
  },
  getPayload: (obj: PostNew) => {
    return {
      id: obj.id,
    };
  },
});

const subscription = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    PostNew: PostNewSubscription as any,
  },
});

export default subscription;