const { Type } = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const candidate = await Type.findOne({ where: { name } });
      if (candidate) {
        return next(
          ApiError.badRequest('Такой тип уже существует')
        );
      }
      const type = await Type.create({ name });
      return res.json(type);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new TypeController();
