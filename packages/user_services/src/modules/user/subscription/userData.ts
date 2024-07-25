import { subscriptionWithClientId } from 'graphql-relay-subscription';
import UserType from '../UserType';
import pubSub, { EVENTS } from '../../../common/helpers/pubSub';
import { mapUserData } from '../../../app';



interface userData {
  userData: {
    name: string;
    email: string;
    balance: number;
    error: string;
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
    const nameEventTrigger = `${EVENTS.USER.DATA}.${context.user.id}`;

    let publish = mapUserData.get(context.user.id);

    if (!publish) {
      publish = pubSub.asyncIterator(nameEventTrigger);

      const initialData = {
        name: context.user.name,
        email: context.user.email,
        balance: context.user.balance,
        error: null,
      };

      const initialPayload = {
        userData: initialData,
      };

      setTimeout(() => {
        pubSub.publish(nameEventTrigger, initialPayload);
      }, 0); 

      mapUserData.set(context.userID, publish);
    }

    return pubSub.asyncIterator(nameEventTrigger);;
  },
  getPayload: (obj: userData) => {
    return {
      name: obj.userData.name,
      email: obj.userData.email,
      balance: obj.userData.balance,
      error: obj.userData.error,
    };
  },
});
