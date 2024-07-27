import request from 'supertest';
import app from '../src/app';

export default (payload: { query: string; variables: any }) =>
  request(app.callback())
    .post('/graphql')
    .set({ Accept: 'application/json', 'Content-Type': 'application/json' })
    .send(JSON.stringify(payload));
