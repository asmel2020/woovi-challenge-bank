import { GraphQLSchema } from 'graphql';
import query from './query';
import mutation from './mutation';
import subscription from './subscription';
export const schema = new GraphQLSchema({
  mutation,
  query,
  subscription,
});
