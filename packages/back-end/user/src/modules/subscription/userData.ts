import { subscriptionWithClientId } from 'graphql-relay-subscription';

import { EVENTS, pubSub } from '@bank/helpers';
import { UserType } from '@bank/models';
interface userData {
  userData: {
    name: string;
    email: string;
    balance: number;
    error: string;
  };
}

export const userDataSubscription = subscriptionWithClientId({
  name: 'userData',
  outputFields: {
    user: {
      type: UserType,
      resolve: async (args: any, _) => args
    }
  },
  subscribe: (_, context) => {
    const nameEventTrigger = `${EVENTS.USER.DATA}.${context.user.id}`;

    return pubSub.asyncIterator(nameEventTrigger);
  },
  getPayload: (obj: userData) => ({
    name: obj.userData.name,
    email: obj.userData.email,
    balance: obj.userData.balance,
    error: obj.userData.error
  })
});
