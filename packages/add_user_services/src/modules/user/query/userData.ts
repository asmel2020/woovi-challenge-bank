import pubSub, { EVENTS } from '../../../common/helpers/pubSub';
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

      pubSub.publish(`${EVENTS.POST.NEW}.${user._id}`, {
        name: user.name,
        email: user.email,
        balance: user.balance,
      });

      return { name: user.name, email: user.email, balance: user.balance };
    },
  },
};

export default userData;
