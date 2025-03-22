// Create this file as utils/setupData.js
const fs = require('fs').promises;
const path = require('path');

const setupDataDirectory = async () => {
  const dataDir = path.join(__dirname, '../data');
  
  try {
    await fs.access(dataDir);
    console.log('Data directory exists');
  } catch (error) {
    console.log('Creating data directory');
    await fs.mkdir(dataDir);
  }
  
  // Initialize empty JSON files if they don't exist
  const productsFile = path.join(dataDir, 'products.json');
  const categoriesFile = path.join(dataDir, 'categories.json');
  
  try {
    await fs.access(productsFile);
  } catch (error) {
    await fs.writeFile(productsFile, JSON.stringify([], null, 2));
    console.log('Created empty products.json file');
  }
  
  try {
    await fs.access(categoriesFile);
  } catch (error) {
    await fs.writeFile(categoriesFile, JSON.stringify([], null, 2));
    console.log('Created empty categories.json file');
  }
};

module.exports = setupDataDirectory;