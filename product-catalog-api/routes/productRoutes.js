const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

// Get all products
router.get('/', productController.getAllProducts);

// Search products
router.get('/search', productController.searchProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

// Create new product
router.post('/', productController.createProduct);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

// Add variant to product
router.post('/:id/variants', productController.addVariant);

module.exports = router;