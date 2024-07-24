import { GraphQLObjectType, GraphQLString } from 'graphql';

/* import PostNew from '../modules/post/subscription/PostNewSubscription'; */

import { subscriptionWithClientId } from 'graphql-relay-subscription';

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLString, resolve: post => post.id },
  }),
});

type PostNew = {
  postId: string;
};

const PostNewSubscription = subscriptionWithClientId({
  name: 'PostNew',
  inputFields: {},
  outputFields: {
    post: {
      type: PostType,
      resolve: async ({ id }: any, _, context) => ({ id }),
    },
  },
  subscribe: (input, context) => {
    setInterval(() => {
      console.log('new post');
     return {id:'ss'}
    }, 1000);
   /*  setTimeout(() => {
      console.log('new post');
     return { id:"1" }
    }, 1000); */
    return 'ss'
  },
  getPayload: (obj: PostNew) => {
    return {
      id: obj.postId,
    };
  },
});


const subscription = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    PostNew:  PostNewSubscription as any,
  },
});

export default subscription;
