import { GraphQLNonNull, GraphQLString } from 'graphql';
import { errorsField, successField } from '../../../common/helpers';
import { mutationWithClientMutationId } from 'graphql-relay';
import { loginUser } from '../../../common/schema';
export default mutationWithClientMutationId({
  name: 'userLogin',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ email, password }, context) => loginUser({ email: email, password: password }),

  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }: any) => token,
    },
    ...successField,
    ...errorsField,
  },
});
