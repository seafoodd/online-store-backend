const { Cart, CartDevice } = require('../models/models');
const ApiError = require('../error/ApiError');

class CartController {
  
  async getAll(req, res, next) {
    try {
      const brands = await Brand.findAll();
      return res.json(brands);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async addToCart(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const { id } = req.params;
      const cart = await Cart.findOne({ where: { userId: decoded.id } });

      const cartDevice = await CartDevice.create({
        cartId: cart.id,
        deviceId: id,
      });
      return res.json(cartDevice);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}
module.exports = new CartController();
