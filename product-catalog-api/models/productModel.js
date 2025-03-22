const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const productsFilePath = path.join(__dirname, '../data/products.json');

// Initialize products.json if it doesn't exist
const initializeProductsFile = async () => {
  try {
    await fs.access(productsFilePath);
  } catch (error) {
    await fs.writeFile(productsFilePath, JSON.stringify([], null, 2));
  }
};

// Get all products
const getAllProducts = async () => {
  await initializeProductsFile();
  const data = await fs.readFile(productsFilePath, 'utf8');
  return JSON.parse(data);
};

// Get product by ID
const getProductById = async (id) => {
  const products = await getAllProducts();
  return products.find(product => product.id === id);
};

// Create new product
const createProduct = async (productData) => {
  const products = await getAllProducts();
  
  const newProduct = {
    id: uuidv4(),
    ...productData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  products.push(newProduct);
  await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
  return newProduct;
};

// Update product
const updateProduct = async (id, productData) => {
  const products = await getAllProducts();
  const index = products.findIndex(product => product.id === id);
  
  if (index === -1) return null;
  
  products[index] = {
    ...products[index],
    ...productData,
    updatedAt: new Date().toISOString()
  };
  
  await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
  return products[index];
};

// Delete product
const deleteProduct = async (id) => {
  const products = await getAllProducts();
  const filteredProducts = products.filter(product => product.id !== id);
  
  if (filteredProducts.length === products.length) return false;
  
  await fs.writeFile(productsFilePath, JSON.stringify(filteredProducts, null, 2));
  return true;
};

// Search products
const searchProducts = async (query) => {
  const products = await getAllProducts();
  
  return products.filter(product => {
    const searchTerm = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
};