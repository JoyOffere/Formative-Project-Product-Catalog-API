const categoryModel = require('../models/categoryModel');
const productModel = require('../models/productModel');

// Get all categories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryModel.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// Get category by ID
const getCategoryById = async (req, res, next) => {
  try {
    const category = await categoryModel.getCategoryById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// Create new category
const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    
    const categoryData = {
      name,
      description: description || '',
      parentId: req.body.parentId || null
    };
    
    const newCategory = await categoryModel.createCategory(categoryData);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

// Update category
const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const categoryData = req.body;
    
    const updatedCategory = await categoryModel.updateCategory(categoryId, categoryData);
    
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

// Delete category
const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    
    // Check if any products use this category
    const products = await productModel.getAllProducts();
    const productsInCategory = products.filter(product => product.categoryId === categoryId);
    
    if (productsInCategory.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete category that has products assigned to it',
        productsCount: productsInCategory.length 
      });
    }
    
    const result = await categoryModel.deleteCategory(categoryId);
    
    if (!result) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get products by category
const getProductsByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    
    // Check if category exists
    const category = await categoryModel.getCategoryById(categoryId);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    // Get all products
    const products = await productModel.getAllProducts();
    
    // Filter products by category
    const productsInCategory = products.filter(product => product.categoryId === categoryId);
    
    res.status(200).json({
      category: category,
      products: productsInCategory
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory
};