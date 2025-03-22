const express = require('express');
const productController = require('../controllers/productController');
const { 
  sanitizeRequest, 
  validateProductRequest, 
  validateIdParam, 
  validateSearchParams 
} = require('../middleware/validator');
const router = express.Router();

// Get all products
router.get('/', productController.getAllProducts);

// Search products
router.get('/search', validateSearchParams, productController.searchProducts);

// Get product by ID
router.get('/:id', validateIdParam, productController.getProductById);

// Create new product
router.post('/', sanitizeRequest, validateProductRequest, productController.createProduct);

// Update product
router.put('/:id', validateIdParam, sanitizeRequest, validateProductRequest, productController.updateProduct);

// Delete product
router.delete('/:id', validateIdParam, productController.deleteProduct);

// Add variant to product
router.post('/:id/variants', validateIdParam, sanitizeRequest, productController.addVariant);

module.exports = router;