import configuration from '../../../config/configuration';

import { IContext } from '../../interfaces';

import { IUserDataRespond } from '../interfaces';

import { gql, GraphQLClient } from 'graphql-request';

export const queryUserData = async ({ req }: IContext) => {
  const mutation = gql`
    query UserData {
      userData {
        name
        email
        balance
        error
      }
    }
  `;

  const graphQLClient = new GraphQLClient(`${configuration.USER_SERVICES.USER_SERVICES_URL}/graphql`, {
    headers: {
      'api-key-x': configuration.AUTH_SERVICES.AUTH_SERVICES_API_KEY,
      authorization: req.headers.authorization || '',
    },
  });
  try {
    const { userData }: IUserDataRespond = await graphQLClient.request(mutation);
    return userData;
  } catch (error) {
    return {
      error: 'Server not available',
    };
  }
};
