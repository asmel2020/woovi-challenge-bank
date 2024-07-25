import { createClient,} from 'graphql-ws';
import WebSocket from 'ws';
import { clientServer, connections } from '../../app';
import pubSub from './pubSub';

interface IConnectWebsocket {
  urlWebsocket: string;
  userID: string;
  authorization: string;
  nameEventTrigger: string;
  query: string;
  variables?: any;
}

export const connectWebsocket = ({ urlWebsocket, userID, nameEventTrigger, query, authorization,variables = {} }: IConnectWebsocket) => {
  const client = createClient({
    url: urlWebsocket,
    webSocketImpl: WebSocket,
    connectionParams: {
      id: userID,
      authorization
    },
  });
  {
    if (!clientServer.get(userID)) {
      const unsubscribe = client.subscribe(
        {
          query,
          variables,
        },
        {
          next: async (data: any) => {
            await pubSub.publish(nameEventTrigger, {...data});
          },
          
          error: (data: any) => {
            const socket: WebSocket = connections.get(userID);
            socket.close(1000, 'Unauthorized');
            connections.delete(userID);
            return;
          },
          complete: () => ({}),
        },
      );

      clientServer.set(userID, unsubscribe);
    }
  }
};
