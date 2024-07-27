import { clearDatabase, connectMongoose, disconnectMongoose } from '../../test/confingMongodbMemoryServer';
import { userFaker } from '../../test/fakeUser';
import request from '../../test/request';

beforeAll(connectMongoose);
beforeEach(clearDatabase);
afterAll(disconnectMongoose);

describe('register user', () => {
  it('should return 200 and return Registration completed successfully', async () => {
    const query = `
    mutation UserRegister {
        userRegister(input: { name: "${userFaker.name}", email: "${userFaker.email}", password: "${userFaker.password}" }) {
            error
            token
            success
        }
    }
  `;

    const variables = {};

    const payload = {
      query,
      variables
    };

    const response = await request(payload);

    expect(response.body.data.userRegister.success).toBe('Registration completed successfully');
    expect(response.body.data.userRegister.error).toBe(null);
    expect(response.status).toBe(200);
  });

  it('should return 200 and return Email already in use', async () => {
    const query = `
    mutation UserRegister {
        userRegister(input: { name: "${userFaker.name}", email: "${userFaker.email}", password: "${userFaker.password}" }) {
            error
            token
            success
        }
    }
  `;

    const variables = {};

    const payload = {
      query,
      variables
    };
    // first register user with email
    await request(payload);
    // second register user with email
    const response = await request(payload);
    expect(response.body.data.userRegister.success).toBe(null);
    expect(response.body.data.userRegister.error).toBe('Email already in use');
    expect(response.status).toBe(200);
  });

  /*  it('should return 200 and return Password not validate', async () => {
      const query = registerUser({
        name: user.name,
        email: user.emailTwo,
        password: user.passwordError
      });

      const variables = {};

      const payload = {
        query,
        variables
      };

      const { AUTH_SERVICES_API_KEY }: any = global;
      const response = await consult(payload, AUTH_SERVICES_API_KEY);

      const testErrorPassword =
        'Password must contain min 8 character at least 1 uppercase, 1 lowercase, 1 number and 1 special character (@$!%*?&.)';
      expect(response.body.data.userRegister.success).toBe(null);
      expect(response.body.data.userRegister.error).toBe(testErrorPassword);
      expect(response.status).toBe(200);
    }); */

  /*  it('should return 200 and return Email not validate', async () => {
    const query = `
    mutation UserRegister {
        userRegister(input: { name: "${userFaker.name}", email: "${userFaker.emailError}", password: "${userFaker.password}" }) {
            error
            token
            success
        }
    }
  `;

    const variables = {};

    const payload = {
      query,
      variables
    };

    const response = await request(payload);

    console.log(response.body);
    expect(response.body.data.userRegister.success).toBe(null);
    expect(response.body.data.userRegister.error).toBe('email must be a valid email');
    expect(response.status).toBe(200);
  }); */
});
