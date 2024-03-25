const ApiError = require('../error/ApiError');

class UserController {
  async registration(req, res) {
    res.json({ message: 'registration' });
  }
  async login(req, res) {
    res.json({ message: 'login' });
  }
  async check(req, res, next) {
    try {
      const { id } = req.query;
      if (!id) {
        return next(ApiError.badRequest('Не задан ID'));
      }
      res.json(id);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new UserController();
