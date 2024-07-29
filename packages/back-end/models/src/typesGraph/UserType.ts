import { GraphQLFloat, GraphQLObjectType, GraphQLString } from 'graphql';
import { IUser } from '../models/UserModel';

interface IUserType extends IUser {
  error: string;
}

const UserType = new GraphQLObjectType<IUserType, any>({
  name: 'User',
  description: 'User data',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: user => user.name
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email
    },
    balance: {
      type: GraphQLFloat,
      resolve: user => user.balance
    },
    error: {
      type: GraphQLString,
      resolve: user => user.error
    }
  })
});

export default UserType;
