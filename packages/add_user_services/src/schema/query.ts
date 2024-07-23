import { GraphQLObjectType, GraphQLString } from 'graphql';
import userQuery from '../modules/user/query';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...userQuery,
  }),
});
