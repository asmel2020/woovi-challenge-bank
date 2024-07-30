import { userDataSubscription } from '@bank/user';
import { GraphQLObjectType } from 'graphql';
export default new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    user: userDataSubscription
  }
});
