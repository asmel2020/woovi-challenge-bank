import { IUserTest } from "../interfaces/IUserTest.interfaces";

export const registerUser = ({ name, email, password }:  IUserTest) => {
  return `
    mutation UserRegister {
        userRegister(input: { name: "${name}", email: "${email}", password: "${password}" }) {
            error
            token
            success
        }
    }
  `;
};
