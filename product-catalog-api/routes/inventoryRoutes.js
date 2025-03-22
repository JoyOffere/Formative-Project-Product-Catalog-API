const express = require('express');
const inventoryController = require('../controllers/inventoryController');
const router = express.Router();

// Get low stock items report
router.get('/low-stock', inventoryController.getLowStockItems);

// Get inventory for a product
router.get('/product/:id', inventoryController.getProductInventory);

// Update product inventory
router.put('/product/:id', inventoryController.updateProductInventory);

// Update variant inventory
router.put('/product/:productId/variant/:variantId', inventoryController.updateVariantInventory);

module.exports = router;