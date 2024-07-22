import { GraphQLObjectType } from 'graphql';

import { userLogin } from '../modules/auth/query';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...userLogin,
  }),
});
