import { GraphQLObjectType, GraphQLString } from 'graphql';

export const userLoginType = new GraphQLObjectType({
  name: 'UserLoginType',
  fields: {
    token: { type: GraphQLString },
    success: { type: GraphQLString },
    error: { type: GraphQLString },
  },
});
