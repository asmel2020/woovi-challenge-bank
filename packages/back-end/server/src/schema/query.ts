import { GraphQLObjectType, GraphQLString } from 'graphql';
import { userDataQuery } from '@bank/user';
export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: userDataQuery
  })
});
