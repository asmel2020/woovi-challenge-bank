import { userDataQuery } from '@bank/user';
import { GraphQLObjectType } from 'graphql';
export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: userDataQuery
  })
});
