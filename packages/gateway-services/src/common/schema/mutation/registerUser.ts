import configuration from '../../../config/configuration';
import { IUserRegisterRespond, Respond } from '../interfaces/ILoginUserRespond.interfaces';
import { IUserTest } from '../interfaces/IUserTest.interfaces';
import { gql, request } from 'graphql-request';

export const registerUser = async ({ name, email, password }: IUserTest): Promise<Respond> => {
  const mutation = gql`
    mutation UserRegister {
        userRegister(input: { name: "${name}", email: "${email}", password: "${password}" }) {
            error
            token
            success
        }
    }
  `;

  const { userRegister }: IUserRegisterRespond = await request(`${configuration.AUTH_SERVICES.URL_AUTH_SERVICES}/graphql`, mutation);

  return userRegister;
};
