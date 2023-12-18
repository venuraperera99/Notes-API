const AuthController = require('../controllers/authController');
const AuthService = require('../services/authService');
const express = require('express');
const supertest = require('supertest');

const app = express();
app.use(express.json());

jest.mock('../services/authService');

describe('Authentication Endpoints', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('POST /api/auth/signup', () => {
    it('should create a new user account', async () => {
      const userData = { username: 'testuser', password: 'testpassword' };
      const createdUser = { _id: 'user123', username: 'testuser' };

      AuthService.signup.mockResolvedValueOnce(createdUser);

      const response = await supertest(app)
        .post('/api/auth/signup')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.user).toEqual(createdUser);
      expect(AuthService.signup).toHaveBeenCalledWith(userData);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in to an existing user account and receive an access token', async () => {
      const userData = { username: 'testuser', password: 'testpassword' };
      const accessToken = 'token123';

      AuthService.login.mockResolvedValueOnce({ accessToken });

      const response = await supertest(app)
        .post('/api/auth/login')
        .send(userData);

      expect(response.status).toBe(200);
      expect(response.body.accessToken).toEqual(accessToken);
      expect(AuthService.login).toHaveBeenCalledWith(userData);
    });
  });
});
