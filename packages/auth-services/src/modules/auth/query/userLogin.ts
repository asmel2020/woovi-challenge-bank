import { GraphQLObjectType, GraphQLString } from 'graphql';
import UserModel from '../UserModel';
import { generateTokenJWT } from '../../../common/helpers';
import { userLoginType } from '../userLoginType';

export const userLogin = {
  userLogin: {
    type: new GraphQLObjectType({
      name: 'UserLogin',
      fields: () => ({
        userLogin: {
          args: {
            email: { type: GraphQLString },
            password: { type: GraphQLString },
          },
          type: userLoginType,
          resolve: async (_, { email, password }: { email: string; password: string }) => {
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
        },
      }),
    }),
    resolve: () => ({}),
  },
};
