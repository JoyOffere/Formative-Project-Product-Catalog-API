/**
 * Request validation middleware for the Product Catalog API
 */

const { sanitizeObject, isValidUUID, validateRequiredFields } = require('../utils/helpers');

// Middleware to sanitize request body
const sanitizeRequest = (req, res, next) => {
  if (req.body && Object.keys(req.body).length > 0) {
    req.body = sanitizeObject(req.body);
  }
  next();
};

// Validate product request body
const validateProductRequest = (req, res, next) => {
  // For creation, check required fields
  if (req.method === 'POST') {
    const validation = validateRequiredFields(req.body, ['name', 'description', 'price']);
    
    if (!validation.valid) {
      return res.status(400).json({
        message: 'Missing required fields',
        missingFields: validation.missingFields
      });
    }
    
    // Validate price format
    if (isNaN(parseFloat(req.body.price)) || parseFloat(req.body.price) < 0) {
      return res.status(400).json({
        message: 'Price must be a valid positive number'
      });
    }
  }
  
  // Validate discount if present
  if (req.body.discount !== undefined) {
    const discount = parseFloat(req.body.discount);
    if (isNaN(discount) || discount < 0 || discount > 100) {
      return res.status(400).json({
        message: 'Discount must be a valid number between 0 and 100'
      });
    }
  }
  
  // Validate stock quantity if present
  if (req.body.stockQuantity !== undefined) {
    const stock = parseInt(req.body.stockQuantity);
    if (isNaN(stock) || stock < 0) {
      return res.status(400).json({
        message: 'Stock quantity must be a valid non-negative integer'
      });
    }
  }
  
  next();
};

// Validate category request body
const validateCategoryRequest = (req, res, next) => {
  // For creation, check name is present
  if (req.method === 'POST' && (!req.body.name || req.body.name.trim() === '')) {
    return res.status(400).json({
      message: 'Category name is required'
    });
  }
  
  // Validate parent category ID if present
  if (req.body.parentId && !isValidUUID(req.body.parentId)) {
    return res.status(400).json({
      message: 'Invalid parent category ID format'
    });
  }
  
  next();
};

// Validate inventory update request
const validateInventoryRequest = (req, res, next) => {
  // Check quantity is present and valid
  if (req.body.quantity === undefined) {
    return res.status(400).json({
      message: 'Quantity is required'
    });
  }
  
  const quantity = parseInt(req.body.quantity);
  if (isNaN(quantity) || quantity < 0) {
    return res.status(400).json({
      message: 'Quantity must be a valid non-negative integer'
    });
  }
  
  req.body.quantity = quantity; // Convert to number
  next();
};

// Validate ID parameter format
const validateIdParam = (req, res, next) => {
  const id = req.params.id || req.params.productId || req.params.variantId;
  
  if (id && !isValidUUID(id)) {
    return res.status(400).json({
      message: 'Invalid ID format. Must be a valid UUID.'
    });
  }
  
  next();
};

// Middleware to validate search query parameters
const validateSearchParams = (req, res, next) => {
  // Validate price range if provided
  if (req.query.minPrice !== undefined && isNaN(parseFloat(req.query.minPrice))) {
    return res.status(400).json({
      message: 'Minimum price must be a valid number'
    });
  }
  
  if (req.query.maxPrice !== undefined && isNaN(parseFloat(req.query.maxPrice))) {
    return res.status(400).json({
      message: 'Maximum price must be a valid number'
    });
  }
  
  // Validate category ID if provided
  if (req.query.category && !isValidUUID(req.query.category)) {
    return res.status(400).json({
      message: 'Invalid category ID format'
    });
  }
  
  next();
};

module.exports = {
  sanitizeRequest,
  validateProductRequest,
  validateCategoryRequest,
  validateInventoryRequest,
  validateIdParam,
  validateSearchParams
};