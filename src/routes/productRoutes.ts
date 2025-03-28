import express, { Request, Response } from "express";
import { Product, products } from "../models/product";

const router = express.Router();

router.post('/products', (req: Request, res: Response) => {
    const { name, description, price, category, variants, stock } = req.body;
    if (!name || !price || !stock) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const product: Product = { id: products.length + 1, name, description, price, category, variants, stock };
    products.push(product);
    res.status(201).json(product);
});

router.get('/products', (req: Request, res: Response) => {
    res.json(products);
});

export default router;