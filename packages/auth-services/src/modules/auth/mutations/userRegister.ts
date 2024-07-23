import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import UserModel from '../UserModel';
import { errorsField, generateTokenJWT, successField } from '../../../common/helpers';
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
  mutateAndGetPayload: async ({ name, email, password }: Args, context: IContext) => {
    if (!context.isAuthApiKey) {
      return {
        error: 'Not authorized',
      };
    }

    const isExistUser = (await UserModel.countDocuments({ email: email.trim().toLowerCase() })) > 0;

    if (isExistUser)
      return {
        error: 'Email already in use',
      };

    try {
      const user = await new UserModel({
        name,
        email,
        password,
      }).save();

      const tokenJWT = generateTokenJWT(user);

      return {
        token: tokenJWT,
        id: user._id,
        success: 'Registration completed successfully',
      };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
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
