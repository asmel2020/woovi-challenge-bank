import { GraphQLObjectType } from 'graphql';
import { userDataSubscription } from '@bank/user';
export default new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    user: userDataSubscription
  }
});
