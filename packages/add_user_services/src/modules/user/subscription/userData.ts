import { subscriptionWithClientId } from 'graphql-relay-subscription';
import UserType from '../UserType';
import pubSub, { EVENTS } from '../../../common/helpers/pubSub';
import { clientServer } from '../../../app';

type userData = {
  id: string;
  name: string;
  email: string;
  balance: number;
  error: string;
};

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
    return pubSub.asyncIterator(nameEventTrigger);
  },
  getPayload: (obj: userData) => {
    console.log('obj', obj);
    return {
      name: obj.name,
      email: obj.email,
      balance: obj.balance,
      error: obj.error,
    };
  },
});
