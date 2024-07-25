import { GraphQLObjectType } from 'graphql';

import * as userData from '../modules/user/subscription';

export default new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    ...userData,
  },
});
