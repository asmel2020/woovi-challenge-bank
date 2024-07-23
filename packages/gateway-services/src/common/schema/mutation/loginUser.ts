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


  const graphQLClient = new GraphQLClient(`${configuration.AUTH_SERVICES.AUTH_SERVICES_URL}/graphql`, {
    headers: {
      authenticator: configuration.AUTH_SERVICES.AUTH_SERVICES_API_KEY,
    },
  });

  const { userLogin }: IUserLoginRespond = await graphQLClient.request(mutation);

  return userLogin;
};
