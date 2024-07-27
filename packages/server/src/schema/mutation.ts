import { GraphQLObjectType } from 'graphql';
import { userRegister } from '@bank/register';
import { userLogin } from '@bank/login';
export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    userRegister: userRegister,
    userLogin: userLogin
  })
});
