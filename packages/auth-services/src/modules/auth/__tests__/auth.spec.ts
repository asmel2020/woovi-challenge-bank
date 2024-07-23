import request from 'supertest';
import app from '../../../app';
import { clearDatabase, connectMongoose, disconnectMongoose } from '../../../../test/confingMongodbMemoryServer';

import { registerUser, loginUser } from '../../../../test/schema';
import configuration from '../../../config/configuration';

const user = {
  name: 'user',
  email: 'user1@example.com',
  emailTwo: 'user2@example.com',
  password: 'adafasf14A.',
  emailError: 'userSs',
  passwordError: 'asflsajdfsa',
};

const consult = (payload: { query: string; variables: any }, authenticator: string) =>
  request(app.callback())
    .post('/graphql')
    .set({ Accept: 'application/json', 'Content-Type': 'application/json', authenticator })
    .send(JSON.stringify(payload));

beforeAll(connectMongoose);

afterAll(async () => {
  await clearDatabase();
  await disconnectMongoose();
});

describe('auth user', () => {
  describe('register user', () => {
    it('should return 200 and return Registration completed successfully', async () => {
      const query = registerUser({
        name: user.name,
        email: user.email,
        password: user.password,
      });

      const variables = {};

      const payload = {
        query,
        variables,
      };
      const { AUTH_SERVICES_API_KEY }: any = global;
      const response = await consult(payload, AUTH_SERVICES_API_KEY);

      expect(response.body.data.userRegister.success).toBe('Registration completed successfully');
      expect(response.body.data.userRegister.error).toBe(null);
      expect(response.status).toBe(200);
    });

    it('should return 200 and return Email already in use', async () => {
      const query = registerUser({
        name: user.name,
        email: user.email,
        password: user.password,
      });

      const variables = {};

      const payload = {
        query,
        variables,
      };

      const { AUTH_SERVICES_API_KEY }: any = global;
      const response = await consult(payload, AUTH_SERVICES_API_KEY);

      expect(response.body.data.userRegister.success).toBe(null);
      expect(response.body.data.userRegister.error).toBe('Email already in use');
      expect(response.status).toBe(200);
    });

    it('should return 200 and return Password not validate', async () => {
      const query = registerUser({
        name: user.name,
        email: user.emailTwo,
        password: user.passwordError,
      });

      const variables = {};

      const payload = {
        query,
        variables,
      };

      const { AUTH_SERVICES_API_KEY }: any = global;
      const response = await consult(payload, AUTH_SERVICES_API_KEY);

      expect(response.body.data.userRegister.success).toBe(null);
      expect(response.body.data.userRegister.error).toBe(
        'Password must contain min 8 character at least 1 uppercase, 1 lowercase, 1 number and 1 special character (@$!%*?&.)',
      );
      expect(response.status).toBe(200);
    });

    it('should return 200 and return Email not validate', async () => {
      const query = registerUser({
        name: user.name,
        email: user.emailError,
        password: user.password,
      });

      const variables = {};

      const payload = {
        query,
        variables,
      };

      const { AUTH_SERVICES_API_KEY }: any = global;
      const response = await consult(payload, AUTH_SERVICES_API_KEY);

      expect(response.body.data.userRegister.success).toBe(null);
      expect(response.body.data.userRegister.error).toBe('email must be a valid email');
      expect(response.status).toBe(200);
    });
  });

  describe('login user', () => {
    it('should return 200 and return Successful authentication', async () => {
      const query = loginUser({ email: user.email, password: user.password });

      const variables = {};

      const payload = {
        query,
        variables,
      };

      const { AUTH_SERVICES_API_KEY }: any = global;
      const response = await consult(payload, AUTH_SERVICES_API_KEY);

      expect(typeof response.body.data.userLogin.token).toBe('string');
      expect(response.body.data.userLogin.success).toBe('Successful authentication');
      expect(response.body.data.userLogin.error).toBe(null);
      expect(response.status).toBe(200);
    });

    it('should return 200 and return Invalid credentials', async () => {
      const query = loginUser({ email: user.email, password: user.passwordError });

      const variables = {};

      const payload = {
        query,
        variables,
      };

      const { AUTH_SERVICES_API_KEY }: any = global;
      const response = await consult(payload, AUTH_SERVICES_API_KEY);

      expect(response.body.data.userLogin.token).toBe(null);
      expect(response.body.data.userLogin.success).toBe(null);
      expect(response.body.data.userLogin.error).toBe('Invalid credentials');
      expect(response.status).toBe(200);
    });
  });
});
