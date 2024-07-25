import { IUserTest } from '../interfaces/IUserTest.interfaces';

export const loginUser = ({ email, password }: Omit<IUserTest, 'name'>) => {
  return `
         mutation UserLogin {
            userLogin(input: { email: "${email}", password: "${password}" }) {
                token
                success
                error
                clientMutationId
            }
        }
    `;
};
