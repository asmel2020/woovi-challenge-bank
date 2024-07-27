import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: {
      type: new GraphQLObjectType({
        name: 'Node',
        fields: () => ({
          node: {
            type: GraphQLString,
            resolve: async _ => {}
          }
        })
      }),
      resolve: () => ({})
    }
  })
});
