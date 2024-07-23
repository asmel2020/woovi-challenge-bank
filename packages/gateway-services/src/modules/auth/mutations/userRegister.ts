import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { errorsField,successField } from '../../../common/helpers';
import { registerUser } from '../../../common/schema';
import { Args, IContext } from '../../../common/interfaces';

export default mutationWithClientMutationId({
  name: 'userRegister',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (data:Args, context:IContext) => registerUser(data),
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }: any) => token,
    },
    ...successField,
    ...errorsField,
  },
});
