import { faker } from '@faker-js/faker';
import { clearDatabase, connectMongoose, disconnectMongoose } from '../../../test/confingMongodbMemoryServer';
import UserModel from '../UserModel';

const userFaker = {
  name: faker.person.fullName().toLocaleLowerCase(),
  email: faker.internet.email().toLocaleLowerCase(),
  password: faker.internet.password(),
  balance: faker.number.int({ min: 1000, max: 100000 })
};

beforeAll(connectMongoose);

beforeEach(clearDatabase);

afterAll(disconnectMongoose);

describe('UserModel', () => {
  it('should create a new user', async () => {
    const user = await new UserModel({
      name: userFaker.name,
      email: userFaker.email,
      password: userFaker.password,
      balance: userFaker.balance
    }).save();
    expect(user._id).toBeDefined();
    expect(user.name).toEqual(userFaker.name);
    expect(user.email).toEqual(userFaker.email);
    expect(user.balance).toEqual(userFaker.balance);
  });

  it('should throw an error if email is not provided', async () => {
    try {
      const user = new UserModel({ name: userFaker.name, password: userFaker.password });
      await user.save();
    } catch (error: any) {
      expect(error.errors.email).toBeDefined();
    }
  });

  it('should throw an error if email is not provided', async () => {
    try {
      await new UserModel({ name: userFaker.name, password: userFaker.password }).save();
    } catch (error: any) {
      expect(error.errors.email).toBeDefined();
    }
  });
});
