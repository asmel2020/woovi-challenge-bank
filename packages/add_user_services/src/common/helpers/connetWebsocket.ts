import { createClient } from 'graphql-ws';
import WebSocket from 'ws';
import { clientServer } from '../../app';
import pubSub from './pubSub';

interface IConnectWebsocket {
  urlWebsocket: string;
  userID: string;
  nameEventTrigger: string;
  query: string;
}
export const connectWebsocket = ({ urlWebsocket, userID, nameEventTrigger, query }: IConnectWebsocket) => {
  const client = createClient({
    url: urlWebsocket,
    webSocketImpl: WebSocket,
  });
  {
    if (!clientServer.get(userID)) {
      const variables = {};

      const unsubscribe = client.subscribe(
        {
          query,
          variables,
        },
        {
          next: async (data: any) => {
            console.log(data);
            await pubSub.publish(nameEventTrigger, { id: data.data.PostNew.post.id });
          },
          error: data => console.log('ss',data),
          complete: () => console.log('complete'),
        },
      );

      clientServer.set(userID, unsubscribe);
    }
  }
};
