const { Brand } = require('../models/models');
const ApiError = require('../error/ApiError');

class BrandController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const candidate = await Brand.findOne({ where: { name } });
      if (candidate) {
        return next(ApiError.badRequest('Такой бренд уже существует'));
      }
      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const brands = await Brand.findAll();
      return res.json(brands);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new BrandController();
