const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes');

const app = express();
app.use(bodyParser.json());

app.use('/api', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});