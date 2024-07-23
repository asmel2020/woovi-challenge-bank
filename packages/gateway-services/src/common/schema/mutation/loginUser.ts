import configuration from '../../../config/configuration';
import { IUserLoginRespond, Respond } from '../interfaces/ILoginUserRespond.interfaces';
import { IUserTest } from '../interfaces/IUserTest.interfaces';

import { gql, GraphQLClient, request } from 'graphql-request';

export const loginUser = async ({ email, password }: Omit<IUserTest, 'name'>): Promise<Respond> => {
  
  const mutation = gql`
         mutation UserLogin {
            userLogin(input: { email: "${email}", password: "${password}" }) {
                token
                success
                error
                clientMutationId
            }
        }
    `;


  const graphQLClient = new GraphQLClient(`${configuration.URL_SERVICES.URL_AUTH_SERVICES}/graphql`, {
    headers: {
      hola: 'D',
    },
  });

  const { userLogin }: IUserLoginRespond = await graphQLClient.request(mutation);

  return userLogin;
};
