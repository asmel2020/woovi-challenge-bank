import configuration from '../../../config/configuration';
import { Args } from '../../interfaces';
import { IUserRegisterRespond, Respond } from '../interfaces/ILoginUserRespond.interfaces';
import { gql, GraphQLClient } from 'graphql-request';

export const registerUser = async ({ name, email, password }: Args) => {
  const mutation = gql`
    mutation UserRegister {
        userRegister(input: { name: "${name}", email: "${email}", password: "${password}" }) {
            error
            token
            success
        }
    }
  `;

  const graphQLClient = new GraphQLClient(`${configuration.AUTH_SERVICES.AUTH_SERVICES_URL}/graphql`, {
    headers: {
      'api-key-x': configuration.AUTH_SERVICES.AUTH_SERVICES_API_KEY,
    },
  });

  try {
    const { userRegister }: IUserRegisterRespond = await graphQLClient.request(mutation);
    return userRegister;
  } catch (error) {
    return {
      error: 'Server not available',
    };
  }
};
