import { faker } from '@faker-js/faker';

export const userFaker = {
  name: faker.person.fullName().toLocaleLowerCase(),
  email: faker.internet.email().toLocaleLowerCase(),
  emailError: faker.string.alphanumeric(10),
  password: faker.internet.password(),
  passwordError: faker.internet.password(),
  balance: faker.number.int({ min: 1000, max: 100000 })
};
