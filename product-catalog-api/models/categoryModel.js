const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const categoriesFilePath = path.join(__dirname, '../data/categories.json');

// Initialize categories.json if it doesn't exist
const initializeCategoriesFile = async () => {
  try {
    await fs.access(categoriesFilePath);
  } catch (error) {
    await fs.writeFile(categoriesFilePath, JSON.stringify([], null, 2));
  }
};

// Get all categories
const getAllCategories = async () => {
  await initializeCategoriesFile();
  const data = await fs.readFile(categoriesFilePath, 'utf8');
  return JSON.parse(data);
};

// Get category by ID
const getCategoryById = async (id) => {
  const categories = await getAllCategories();
  return categories.find(category => category.id === id);
};

// Create new category
const createCategory = async (categoryData) => {
  const categories = await getAllCategories();
  
  const newCategory = {
    id: uuidv4(),
    ...categoryData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  categories.push(newCategory);
  await fs.writeFile(categoriesFilePath, JSON.stringify(categories, null, 2));
  return newCategory;
};

// Update category
const updateCategory = async (id, categoryData) => {
  const categories = await getAllCategories();
  const index = categories.findIndex(category => category.id === id);
  
  if (index === -1) return null;
  
  categories[index] = {
    ...categories[index],
    ...categoryData,
    updatedAt: new Date().toISOString()
  };
  
  await fs.writeFile(categoriesFilePath, JSON.stringify(categories, null, 2));
  return categories[index];
};

// Delete category
const deleteCategory = async (id) => {
  const categories = await getAllCategories();
  const filteredCategories = categories.filter(category => category.id !== id);
  
  if (filteredCategories.length === categories.length) return false;
  
  await fs.writeFile(categoriesFilePath, JSON.stringify(filteredCategories, null, 2));
  return true;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};