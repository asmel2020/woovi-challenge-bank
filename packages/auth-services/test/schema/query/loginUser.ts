import { IUserTest } from '../interfaces/IUserTest.interfaces';

export const loginUser = ({ email, password }: Omit<IUserTest, 'name'>) => {
  return `
        query UserLogin {
            userLogin {
                userLogin(email: "${email}", password: "${password}") {
                    token
                    error
                    success
                }
            }
        }

    `;
};
