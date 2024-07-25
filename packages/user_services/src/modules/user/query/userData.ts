import UserType from '../UserType';

const userData = {
  userData: {
    type: UserType,
    resolve: (root: any, args: any, { isAuthApiKey, user }: any) => {
      if (!isAuthApiKey) {
        return {
          error: 'Not authorized',
        };
      }

      if (!user) {
        return {
          error: 'Not authorized',
        };
      }

      return { name: user.name, email: user.email, balance: user.balance };
    },
  },
};

export default userData;