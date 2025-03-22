const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get category by ID
router.get('/:id', categoryController.getCategoryById);

// Get products by category
router.get('/:id/products', categoryController.getProductsByCategory);

// Create new category
router.post('/', categoryController.createCategory);

// Update category
router.put('/:id', categoryController.updateCategory);

// Delete category
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;