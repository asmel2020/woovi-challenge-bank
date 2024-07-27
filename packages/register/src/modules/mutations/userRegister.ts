import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import jwt from 'jsonwebtoken';
import { errorsField, successField } from '../../utils';

import { UserModel } from '@bank/models';
import { Args, IContext } from '../interfaces/interfaces';

export default mutationWithClientMutationId({
  name: 'userRegister',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async (args: Args, context: IContext) => {
    const { email, password, name } = args;
    if (!context.isAuthApiKey)
      return {
        error: 'Not authorized'
      };

    const isExistUser = (await UserModel.countDocuments({ email: email.trim().toLowerCase() })) > 0;

    if (isExistUser)
      return {
        error: 'Email already in use'
      };

    try {
      const user = await new UserModel({
        name,
        email,
        password
      }).save();

      const tokenJWT = jwt.sign({ id: user._id }, 'process.env.JWT_SECRET');

      return {
        token: tokenJWT,
        id: user._id,
        success: 'Registration completed successfully'
      };
    } catch (error: any) {
      return {
        error: error.message
      };
    }
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
