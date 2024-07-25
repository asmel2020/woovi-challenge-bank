import { PubSub } from 'graphql-subscriptions';

export const EVENTS = {
  USER: {
    DATA: 'DATA',
  },
};

export default new PubSub();
