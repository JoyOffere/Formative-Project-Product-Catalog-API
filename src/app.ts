import bodyParser from "body-parser";
import express from "express";
import productRoutes from "./routes/productRoutes";

const app = express();
app.use(bodyParser.json());
app.use('/api', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});