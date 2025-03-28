import bodyParser from "body-parser";
import db from "./db/database";
import express from "express";
import productRoutes from "./routes/productRoutes";

const app = express();
app.use(bodyParser.json());
app.use('/api', productRoutes);

// Error Handling Middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;

// Verify database connection before starting the server
db.get('SELECT 1 AS test', (err) => {
    if (err) {
        console.error('Failed to connect to the database:', err.message);
        process.exit(1); // Exit the process if the database connection fails
    } else {
        console.log('Successfully connected to the SQLite database');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
});