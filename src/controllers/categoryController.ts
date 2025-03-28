import db from "../db/database";
import { Request, Response } from "express";

export const getCategories = (req: Request, res: Response) => {
    db.all('SELECT name FROM categories', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows.map((row: any) => row.name));
    });
};

export const createCategory = (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Category name required' });
    db.run('INSERT OR IGNORE INTO categories (name) VALUES (?)', [name], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(409).json({ error: 'Category already exists' });
        res.status(201).json({ name });
    });
};