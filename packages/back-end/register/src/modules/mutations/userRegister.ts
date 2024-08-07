import { configurations, errorsField, successField } from '@bank/helpers';
import { UserModel } from '@bank/models';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import jwt from 'jsonwebtoken';
import { Args } from '../interfaces/args.interfaces';

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
  mutateAndGetPayload: async (args: Args, _) => {
    const { email, password, name } = args;
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

      const tokenJWT = jwt.sign({ id: user._id }, configurations.JWT_SECRET);

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
