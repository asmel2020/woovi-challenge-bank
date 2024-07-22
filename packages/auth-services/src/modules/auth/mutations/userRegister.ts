import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import UserModel from '../UserModel';
import { errorsField, generateTokenJWT, successField } from '../../../common/helpers';

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
  mutateAndGetPayload: async ({ name, email, password }, context) => {
    const isExistUser = (await UserModel.countDocuments({ email: email.trim().toLowerCase() })) > 0;

    if (isExistUser)
      return {
        error: 'Email already in use',
      };

    const user = await new UserModel({
      name,
      email,
      password,
    }).save();

    const tokenJWT = generateTokenJWT(user);

    return {
      token: tokenJWT,
      id: user._id,
      errors: 'Registration completed successfully',
      error: null,
    };
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
