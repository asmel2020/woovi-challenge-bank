import { userLogin } from '@bank/login';
import { userRegister } from '@bank/register';
import { GraphQLObjectType } from 'graphql';
export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    userRegister: userRegister,
    userLogin: userLogin
  })
});
