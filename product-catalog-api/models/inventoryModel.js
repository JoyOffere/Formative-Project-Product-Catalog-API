const fs = require('fs').promises;
const path = require('path');
const productModel = require('./productModel');

// Get inventory status for a product
const getProductInventory = async (productId) => {
  const product = await productModel.getProductById(productId);
  
  if (!product) return null;
  
  return {
    productId: product.id,
    name: product.name,
    stockLevel: product.stockQuantity || 0,
    variants: product.variants || []
  };
};

// Update product inventory
const updateProductInventory = async (productId, quantity) => {
  const product = await productModel.getProductById(productId);
  
  if (!product) return null;
  
  const updatedProduct = await productModel.updateProduct(productId, {
    stockQuantity: quantity
  });
  
  return {
    productId: updatedProduct.id,
    name: updatedProduct.name,
    stockLevel: updatedProduct.stockQuantity,
    updatedAt: updatedProduct.updatedAt
  };
};

// Update variant inventory
const updateVariantInventory = async (productId, variantId, quantity) => {
  const product = await productModel.getProductById(productId);
  
  if (!product || !product.variants) return null;
  
  const variantIndex = product.variants.findIndex(v => v.id === variantId);
  
  if (variantIndex === -1) return null;
  
  product.variants[variantIndex].stockQuantity = quantity;
  
  const updatedProduct = await productModel.updateProduct(productId, {
    variants: product.variants
  });
  
  return {
    productId: updatedProduct.id,
    variantId: variantId,
    name: updatedProduct.name,
    variantName: updatedProduct.variants[variantIndex].name,
    stockLevel: updatedProduct.variants[variantIndex].stockQuantity,
    updatedAt: updatedProduct.updatedAt
  };
};

// Get low stock items (below threshold)
const getLowStockItems = async (threshold = 10) => {
  const products = await productModel.getAllProducts();
  
  const lowStockItems = [];
  
  products.forEach(product => {
    // Check main product stock
    if ((product.stockQuantity !== undefined) && product.stockQuantity < threshold) {
      lowStockItems.push({
        productId: product.id,
        name: product.name,
        stockLevel: product.stockQuantity,
        type: 'product'
      });
    }
    
    // Check variants stock
    if (product.variants && Array.isArray(product.variants)) {
      product.variants.forEach(variant => {
        if ((variant.stockQuantity !== undefined) && variant.stockQuantity < threshold) {
          lowStockItems.push({
            productId: product.id,
            variantId: variant.id,
            name: product.name,
            variantName: variant.name,
            stockLevel: variant.stockQuantity,
            type: 'variant'
          });
        }
      });
    }
  });
  
  return lowStockItems;
};

module.exports = {
  getProductInventory,
  updateProductInventory,
  updateVariantInventory,
  getLowStockItems
};