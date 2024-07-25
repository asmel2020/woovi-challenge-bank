import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    node: {
      type: GraphQLString,
      resolve: (root: any, args: any, context: any) => null,
    },
  }),
});
