import { queryUserData } from '../../../common/schema';
import UserType from '../../UserType';





const userData = {
  userData: {
    type: UserType,
    resolve: (root: any, args: any, context: any) => queryUserData(context),
  },
};

export default userData;
