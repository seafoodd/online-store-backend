const Router = require('express');
const router = new Router();
const DeviceController = require('../controllers/deviceController');
const checkRole = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', checkRole('ADMIN'), DeviceController.create);
router.get('/', DeviceController.getAll);
router.get('/:id', DeviceController.getOne); // get for getting device
router.post('/:id', authMiddleware, DeviceController.addToCart); // Post for adding to cart

module.exports = router;
