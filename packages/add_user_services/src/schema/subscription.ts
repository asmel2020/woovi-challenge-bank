import { GraphQLObjectType, GraphQLString } from 'graphql';

/* import PostNew from '../modules/post/subscription/PostNewSubscription'; */

import { subscriptionWithClientId } from 'graphql-relay-subscription';
import pubSub, { EVENTS } from '../common/helpers/pubSub';
/* import pubSub, { EVENTS } from '../common/helpers/pubSub'; */

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLString, resolve: post => post.id },
  }),
});

type PostNew = {
  id: string;
};

const PostNewSubscription = subscriptionWithClientId({
  name: 'PostNew',
  inputFields: {
    id: {
      type: GraphQLString,
    },
  },
  outputFields: {
    post: {
      type: PostType,
      resolve: async ({ id }: any, _, context) => ({ id }),
    },
  },
  subscribe: (input, context) => {
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
