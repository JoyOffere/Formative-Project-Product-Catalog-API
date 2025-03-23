require('dotenv').config();

const app = require('./app');
const dotenv = require('dotenv');
const setupDataDirectory = require('./utils/setupData');

dotenv.config();

const PORT = process.env.PORT || 3000;

// Set up data directory and files
setupDataDirectory()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error setting up data directory:', err);
    process.exit(1);
  });