import { GraphQLNonNull, GraphQLString } from 'graphql';
import UserModel from '../UserModel';
import { errorsField, generateTokenJWT, successField } from '../../../common/helpers';

import { mutationWithClientMutationId } from 'graphql-relay';
import { Args, IContext } from '../../../common/interfaces';

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
  mutateAndGetPayload: async ({ email, password }: Omit<Args, 'name'>, context: IContext) => {
    if (!context.isAuthApiKey) {
      return {
        error: 'Not authorized',
      };
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return {
        error: 'Invalid credentials',
      };
    }

    const isCorrectPassword = user.authenticate(password);

    if (!isCorrectPassword) {
      return {
        error: 'Invalid credentials',
      };
    }

    const tokenJWT = generateTokenJWT(user);
    return { token: tokenJWT, success: 'Successful authentication' };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }: any) => token,
    },
    ...successField,
    ...errorsField,
  },
});
