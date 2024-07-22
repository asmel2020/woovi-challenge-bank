import { GraphQLObjectType} from 'graphql';

import UserMutations from '../modules/auth/mutations';
export default new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...UserMutations
  }),
})

