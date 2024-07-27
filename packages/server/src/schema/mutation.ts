import { GraphQLObjectType } from 'graphql';
import { userRegister } from '@bank/register';
export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    userRegister: userRegister
  })
});
