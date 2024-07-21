import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { connectionArgs } from '@entria/graphql-mongo-helpers';





const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({}),
});

export default QueryType;
