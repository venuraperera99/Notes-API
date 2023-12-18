const authService = require('../services/authService');

class AuthController {
  static async signup(req, res, next) {
    const { username, password } = req.body;

    try {
      const user = await authService.signup(username, password);
      res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const { username, password } = req.body;

    try {
      const { user, token } = await authService.login(username, password);
      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
