import { subscriptionWithClientId } from 'graphql-relay-subscription';
import UserType from '../../UserType';
import pubSub, { EVENTS } from '../../../common/helpers/pubSub';
import { connectWebsocket } from '../../../common/helpers/connetWebsocket';
import { clientServer } from '../../../app';

type userData = {
  id: string;
  name: string;
  email: string;
  balance: number;
  error: string;
};
interface IUserData {
  data: {
    userData: {
      user: {
        name: string;
        email: string;
        balance: number;
        error: string;
      };
    };
  };
}
export const userData = subscriptionWithClientId({
  name: 'userData',
  outputFields: {
    user: {
      type: UserType,
      resolve: async (args: any, _, context) => args,
    },
  },
  subscribe: (input, context) => {
    const nameEventTrigger = `${EVENTS.POST.NEW}.${context.userID}`;

    const query = `subscription UserData {
                        userData(input: { clientSubscriptionId: "asdasd" }) {
                        user {
                        name
                    email
                balance
              error
          }
        }
    }

   `;

    connectWebsocket({
      nameEventTrigger: nameEventTrigger,
      query,
      urlWebsocket: 'ws://localhost:8002/subscriptions',
      userID: context.userID,
    });

    return pubSub.asyncIterator(nameEventTrigger);
  },
  getPayload: (obj: IUserData) => {
    return {
      name: obj.data.userData.user.name,
      email: obj.data.userData.user.email,
      balance: obj.data.userData.user.balance,
      error: obj.data.userData.user.error,
    };
  },
});
