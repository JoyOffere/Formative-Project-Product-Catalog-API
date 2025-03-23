const express = require('express');
const inventoryController = require('../controllers/inventoryController');
const router = express.Router();

const { validateIdParam, validateInventoryRequest } = require('../middleware/validator');

// Get low stock items report
router.get('/low-stock', inventoryController.getLowStockItems);


router.get('/product/:id', validateIdParam, inventoryController.getProductInventory);


router.put('/product/:id', validateIdParam, validateInventoryRequest, inventoryController.updateProductInventory);


router.put('/product/:productId/variant/:variantId', validateIdParam, validateInventoryRequest, inventoryController.updateVariantInventory);


module.exports = router;
