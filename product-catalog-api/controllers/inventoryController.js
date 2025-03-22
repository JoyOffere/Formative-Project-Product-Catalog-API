const inventoryModel = require('../models/inventoryModel');

// Get inventory for a product
const getProductInventory = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const inventory = await inventoryModel.getProductInventory(productId);
    
    if (!inventory) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(inventory);
  } catch (error) {
    next(error);
  }
};

// Update product inventory
const updateProductInventory = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { quantity } = req.body;
    
    if (quantity === undefined || isNaN(quantity)) {
      return res.status(400).json({ message: 'Valid quantity is required' });
    }
    
    const updatedInventory = await inventoryModel.updateProductInventory(productId, parseInt(quantity));
    
    if (!updatedInventory) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(updatedInventory);
  } catch (error) {
    next(error);
  }
};

// Update variant inventory
const updateVariantInventory = async (req, res, next) => {
  try {
    const { productId, variantId } = req.params;
    const { quantity } = req.body;
    
    if (quantity === undefined || isNaN(quantity)) {
      return res.status(400).json({ message: 'Valid quantity is required' });
    }
    
    const updatedInventory = await inventoryModel.updateVariantInventory(
      productId, 
      variantId, 
      parseInt(quantity)
    );
    
    if (!updatedInventory) {
      return res.status(404).json({ message: 'Product or variant not found' });
    }
    
    res.status(200).json(updatedInventory);
  } catch (error) {
    next(error);
  }
};

// Get low stock items report
const getLowStockItems = async (req, res, next) => {
  try {
    const threshold = req.query.threshold ? parseInt(req.query.threshold) : 10;
    
    const lowStockItems = await inventoryModel.getLowStockItems(threshold);
    
    res.status(200).json({
      threshold: threshold,
      totalItems: lowStockItems.length,
      items: lowStockItems
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductInventory,
  updateProductInventory,
  updateVariantInventory,
  getLowStockItems
};