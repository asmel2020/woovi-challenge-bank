import { EVENTS, pubSub } from '@bank/helpers';
import { UserType } from '@bank/models';
import { subscriptionWithClientId } from 'graphql-relay-subscription';
interface userData {
  name: string;
  email: string;
  balance: number;
  error: string;
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
    if (context.user)
      setTimeout(() => {
        pubSub.publish(nameEventTrigger, context.user);
      }, 0);

    return pubSub.asyncIterator(nameEventTrigger);
  },
  getPayload: (obj: userData) => ({
    name: obj.name,
    email: obj.email,
    balance: obj.balance,
    error: obj.error
  })
});
