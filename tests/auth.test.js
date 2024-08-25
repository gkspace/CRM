import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

const baseUrl = 'http://localhost:5000/api';
let token;
let userId;

const randomEmail = `user_${uuidv4()}@example.com`;
const randomPassword = uuidv4();

describe('Auth API Tests', () => {
  it('should register a user', async () => {
    const response = await request(baseUrl)
      .post('/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        name: 'bala',
        email: randomEmail,
        password: randomPassword,
        role: 'developer'
      });
    expect(response.status).toBe(200);
  });

  it('should login a user', async () => {
    const response = await request(baseUrl)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: randomEmail,
        password: randomPassword
      });
    expect(response.status).toBe(200);
    token = response.body.token; // Save token for future requests
  });

  it('should get user details', async () => {
    const response = await request(baseUrl)
      .get('/auth/user')
      .set('Authorization', `${token}`);
    expect(response.status).toBe(200);
    userId = response.body.user._id; 
    console.log(userId);
  });
});

describe('Users API Tests', () => {
  it('should get all users', async () => {
    const response = await request(baseUrl)
      .get('/users')
      .set('Authorization', `${token}`);
    expect(response.status).toBe(200);
  });

  it('should get user by id', async () => {
    const response = await request(baseUrl)
      .get(`/users/${userId}`)
      .set('Authorization', `${token}`)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
  });

  it('should update user by id', async () => {
    const response = await request(baseUrl)
      .put(`/users/${userId}`)
      .set('Authorization', `${token}`)
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin'
      });
    expect(response.status).toBe(200);
  });

  it('should delete user by id', async () => {
    const response = await request(baseUrl)
      .delete(`/users/${userId}`)
      .set('Authorization', `${token}`);
    expect(response.status).toBe(200);
  });
});
