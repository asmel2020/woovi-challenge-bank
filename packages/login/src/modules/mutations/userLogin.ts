import { configurations, errorsField, successField } from '@bank/helpers';
import { UserModel } from '@bank/models';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import jwt from 'jsonwebtoken';
import { Args } from './interfaces/args.interfaces';

export default mutationWithClientMutationId({
  name: 'userLogin',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async (args: Omit<Args, 'name'>, _) => {
    const { email, password } = args;

    const user = await UserModel.findOne({ email });

    if (!user)
      return {
        error: 'Invalid credentials'
      };

    const isCorrectPassword = user.authenticate(password);

    if (!isCorrectPassword)
      return {
        error: 'Invalid credentials'
      };

    const tokenJWT = jwt.sign({ id: user._id }, configurations.JWT_SECRET);
    return { token: tokenJWT, success: 'Successful authentication' };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }: any) => token
    },
    ...successField,
    ...errorsField
  }
});
