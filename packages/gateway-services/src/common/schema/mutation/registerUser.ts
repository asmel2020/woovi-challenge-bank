import configuration from '../../../config/configuration';
import { Args } from '../../interfaces';
import { IUserRegisterRespond, Respond } from '../interfaces/ILoginUserRespond.interfaces';
import { gql, GraphQLClient} from 'graphql-request';

export const registerUser = async ({ name, email, password }: Args): Promise<Respond> => {
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
      authenticator: configuration.AUTH_SERVICES.AUTH_SERVICES_API_KEY,
    },
  });
  
  const { userRegister }: IUserRegisterRespond = await graphQLClient.request(mutation);

  return userRegister;
};
