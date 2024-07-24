import { GraphQLObjectType, GraphQLString } from 'graphql';
import UserQuery from '../modules/user/query';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...UserQuery,
  }),
});
