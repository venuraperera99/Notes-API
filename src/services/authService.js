const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

class AuthService {
  static async signup(username, password) {
    try {
      const user = new User({ username, password });
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async login(username, password) {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        throw new Error('Incorrect password');
      }

      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: 24 * 60 * 60 });
      return { user, token };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
