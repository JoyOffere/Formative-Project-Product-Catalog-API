import db from "./db/database";
import express from "express";
import router from "./routes"; // Adjust to "./routes" or "./routes/index";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); // Replace bodyParser.json() with built-in middleware

// Mount the router at /api
app.use('/api', router);

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

export default app;