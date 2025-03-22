const productModel = require('../models/productModel');
const { v4: uuidv4 } = require('uuid');

// Get all products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// Get product by ID
const getProductById = async (req, res, next) => {
  try {
    const product = await productModel.getProductById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Create new product
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, categoryId, stockQuantity, variants } = req.body;
    
    if (!name || !description || !price) {
      return res.status(400).json({ message: 'Name, description and price are required' });
    }
    
    // Process variants if provided
    let processedVariants = [];
    if (variants && Array.isArray(variants)) {
      processedVariants = variants.map(variant => ({
        id: variant.id || uuidv4(),
        name: variant.name,
        attributes: variant.attributes,
        price: variant.price,
        stockQuantity: variant.stockQuantity || 0
      }));
    }
    
    const productData = {
      name,
      description,
      price: parseFloat(price),
      categoryId,
      stockQuantity: stockQuantity || 0,
      variants: processedVariants,
      discount: req.body.discount || 0,
      tags: req.body.tags || []
    };
    
    const newProduct = await productModel.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// Update product
const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    
    const updatedProduct = await productModel.updateProduct(productId, productData);
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// Delete product
const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const result = await productModel.deleteProduct(productId);
    
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Add variant to product
const addVariant = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await productModel.getProductById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const { name, attributes, price, stockQuantity } = req.body;
    
    if (!name || !attributes) {
      return res.status(400).json({ message: 'Variant name and attributes are required' });
    }
    
    const newVariant = {
      id: uuidv4(),
      name,
      attributes,
      price: price || product.price,
      stockQuantity: stockQuantity || 0
    };
    
    const variants = product.variants || [];
    variants.push(newVariant);
    
    const updatedProduct = await productModel.updateProduct(productId, { variants });
    
    res.status(201).json({
      message: 'Variant added successfully',
      variant: newVariant,
      product: updatedProduct
    });
  } catch (error) {
    next(error);
  }
};

// Search products
const searchProducts = async (req, res, next) => {
  try {
    const { query, category, minPrice, maxPrice } = req.query;
    
    if (!query && !category && !minPrice && !maxPrice) {
      return res.status(400).json({ message: 'At least one search parameter is required' });
    }
    
    let results = [];
    
    if (query) {
      results = await productModel.searchProducts(query);
    } else {
      results = await productModel.getAllProducts();
    }
    
    // Filter by category if provided
    if (category) {
      results = results.filter(product => product.categoryId === category);
    }
    
    // Filter by price range if provided
    if (minPrice || maxPrice) {
      results = results.filter(product => {
        const productPrice = product.price * (1 - (product.discount || 0) / 100);
        
        if (minPrice && maxPrice) {
          return productPrice >= parseFloat(minPrice) && productPrice <= parseFloat(maxPrice);
        } else if (minPrice) {
          return productPrice >= parseFloat(minPrice);
        } else if (maxPrice) {
          return productPrice <= parseFloat(maxPrice);
        }
        
        return true;
      });
    }
    
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addVariant,
  searchProducts
};