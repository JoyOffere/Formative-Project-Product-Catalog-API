const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

const { validateCategoryRequest, validateIdParam } = require('../middleware/validator');

// Get all categories
router.get('/', categoryController.getAllCategories);


router.get('/:id', validateIdParam, categoryController.getCategoryById);


// Get products by category
router.get('/:id/products', categoryController.getProductsByCategory);

router.post('/', validateCategoryRequest, categoryController.createCategory);


router.put('/:id', validateIdParam, validateCategoryRequest, categoryController.updateCategory);


router.delete('/:id', validateIdParam, categoryController.deleteCategory);


module.exports = router;
