import { error } from 'console';
import guardAuth from '../../../common/helpers/guardAuth';
import pubSub, { EVENTS } from '../../../common/helpers/pubSub';
import { queryUserData } from '../../../common/schema';
import UserType from '../../UserType';

const userData = {
  userData: {
    type: UserType,
    resolve: (root: any, args: any, context: any) => {
      const { userID } = guardAuth(context.req.headers.authorization);

      if (!userID) {
        return {
          error: 'Not authorized',
        };
      }

      return queryUserData(context);
    },
  },
};

export default userData;
