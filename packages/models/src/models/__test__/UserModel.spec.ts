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
    const user = new UserModel({
      name: userFaker.name,
      email: userFaker.email,
      password: userFaker.password,
      balance: userFaker.balance
    });

    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toEqual(userFaker.name);
    expect(savedUser.email).toEqual(userFaker.email);
    expect(savedUser.balance).toEqual(userFaker.balance);
  });

  it('should throw an error if email is not provided', async () => {
    try {
      const user = new UserModel({ name: userFaker.name, password: userFaker.password });
      await user.save();
    } catch (error: any) {
      expect(error.errors.email).toBeDefined();
    }
  });
});
