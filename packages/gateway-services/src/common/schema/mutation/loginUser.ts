import configuration from '../../../config/configuration';
import { Args,IContext,IRequest } from '../../interfaces';
import { IUserLoginRespond } from '../interfaces/ILoginUserRespond.interfaces';
import { gql, GraphQLClient,  } from 'graphql-request';

export const loginUser = async ({ email, password }: Omit<Args, 'name'>, {req}: IContext) => {

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
      'api-key-x': configuration.AUTH_SERVICES.AUTH_SERVICES_API_KEY,
      authorization: req.headers.authorization || '',
    },
  });

  try {
    const { userLogin }: IUserLoginRespond = await graphQLClient.request(mutation);
    return userLogin;
  } catch (error) {
    return {
      error: 'Server not available',
    };
  }
};
