const crypto = require('crypto');

// Generate a random JWT secret key
const generateJwtKey = () => {
    return crypto.randomBytes(32).toString('base64');
};

console.log(generateJwtKey());
