import { UserModel } from '@bank/models';
import { clearDatabase, connectMongoose, disconnectMongoose } from '../../test/confingMongodbMemoryServer';
import { userFaker } from '../../test/fakeUser';
import request from '../../test/request';

beforeAll(connectMongoose);

beforeEach(clearDatabase);

afterAll(disconnectMongoose);

describe('register user', () => {
  it('should return 200 and return Successful authentication', async () => {
    await new UserModel({
      name: userFaker.name,
      email: userFaker.email,
      password: userFaker.password,
      balance: userFaker.balance
    }).save();

    const query = `
         mutation UserLogin {
            userLogin(input: { email: "${userFaker.email}", password: "${userFaker.password}" }) {
                token
                success
                error
                clientMutationId
            }
        }
    `;

    const variables = {};

    const payload = {
      query,
      variables
    };

    const response = await request(payload);

    expect(typeof response.body.data.userLogin.token).toBe('string');
    expect(response.body.data.userLogin.success).toBe('Successful authentication');
    expect(response.body.data.userLogin.error).toBe(null);
    expect(response.status).toBe(200);
  });

  it('should return 200 and return Invalid credentials', async () => {
    await new UserModel({
      name: userFaker.name,
      email: userFaker.email,
      password: userFaker.password,
      balance: userFaker.balance
    }).save();

    const query = `
         mutation UserLogin {
            userLogin(input: { email: "${userFaker.email}", password: "${userFaker.passwordError}" }) {
                token
                success
                error
                clientMutationId
            }
        }
    `;

    const variables = {};

    const payload = {
      query,
      variables
    };

    const response = await request(payload);

    expect(response.body.data.userLogin.token).toBe(null);
    expect(response.body.data.userLogin.success).toBe(null);
    expect(response.body.data.userLogin.error).toBe('Invalid credentials');
    expect(response.status).toBe(200);
  });
});
