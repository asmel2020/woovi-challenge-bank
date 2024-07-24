import { GraphQLFloat, GraphQLObjectType, GraphQLString } from 'graphql';

export interface IUserType {
  name: string;
  email: string;
  balance: number;
  error: string;
}

const UserType = new GraphQLObjectType<IUserType, any>({
  name: 'User',
  description: 'User data',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
    balance: {
      type: GraphQLFloat,
      resolve: user => user.balance,
    },
    error: {
      type: GraphQLString,
      resolve: user => user.error,
    },
  }),
});

export default UserType;
