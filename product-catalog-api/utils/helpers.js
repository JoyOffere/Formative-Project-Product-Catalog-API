/**
 * Helper utility functions for the Product Catalog API
 */

// Validate if an ID is in proper UUID format
const isValidUUID = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };
  
  // Format price with two decimal places
  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };
  
  // Calculate discounted price
  const calculateDiscountedPrice = (price, discountPercentage) => {
    if (!discountPercentage || discountPercentage <= 0) {
      return price;
    }
    
    const discount = (price * discountPercentage) / 100;
    return (price - discount).toFixed(2);
  };
  
  // Sanitize input to prevent common security issues
  const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    
    // Remove HTML tags
    return input
      .replace(/<[^>]*>?/gm, '')
      // Prevent script injections
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim();
  };
  
  // Deep sanitize an object's string properties
  const sanitizeObject = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    
    const sanitized = {};
    
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'string') {
          sanitized[key] = sanitizeInput(obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          sanitized[key] = sanitizeObject(obj[key]);
        } else {
          sanitized[key] = obj[key];
        }
      }
    }
    
    return sanitized;
  };
  
  // Generate a slug from a string
  const generateSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };
  
  // Validate required fields in an object
  const validateRequiredFields = (object, fields) => {
    const missingFields = [];
    
    fields.forEach(field => {
      if (object[field] === undefined || object[field] === null || object[field] === '') {
        missingFields.push(field);
      }
    });
    
    return {
      valid: missingFields.length === 0,
      missingFields
    };
  };
  
  module.exports = {
    isValidUUID,
    formatPrice,
    calculateDiscountedPrice,
    sanitizeInput,
    sanitizeObject,
    generateSlug,
    validateRequiredFields
  };