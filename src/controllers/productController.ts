import db from "../db/database";
import { Request, Response } from "express";
import { Product, Variant } from "../models/product";

// Type for SQLite row results (to match Product and Variant)
interface ProductRow extends Omit<Product, 'variants'> { }
interface VariantRow extends Variant { }

export const createProduct = (req: Request, res: Response) => {
    const { name, description, price, discount, category, variants } = req.body;
    if (!name || typeof price !== 'number' || !category || !Array.isArray(variants)) {
        return res.status(400).json({ error: 'Invalid input: name, price, category, and variants are required' });
    }

    db.run(
        'INSERT INTO products (name, description, price, discount, category) VALUES (?, ?, ?, ?, ?)',
        [name, description, price, discount || 0, category],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            const productId = this.lastID;
            const variantInserts = variants.map((v: Variant) =>
                new Promise<void>((resolve, reject) =>
                    db.run(
                        'INSERT INTO variants (id, productId, size, color, stock) VALUES (?, ?, ?, ?, ?)',
                        [v.id, productId, v.size, v.color, v.stock],
                        (err) => (err ? reject(err) : resolve())
                    )
                )
            );
            Promise.all(variantInserts)
                .then(() => {
                    db.run('INSERT OR IGNORE INTO categories (name) VALUES (?)', [category]);
                    res.status(201).json({ id: productId, name, description, price, discount, category, variants });
                })
                .catch(err => res.status(500).json({ error: err.message }));
        }
    );
};

export const getProducts = (req: Request, res: Response) => {
    db.all('SELECT * FROM products', (err, rows: ProductRow[]) => {
        if (err) return res.status(500).json({ error: err.message });
        const promises = rows.map((p: ProductRow) =>
            new Promise<Product>((resolve) =>
                db.all('SELECT * FROM variants WHERE productId = ?', [p.id], (err, variants: VariantRow[]) => {
                    resolve({ ...p, variants: err ? [] : variants });
                })
            )
        );
        Promise.all(promises).then(results => res.json(results));
    });
};

export const getProductById = (req: Request, res: Response) => {
    db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, product: ProductRow | undefined) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        db.all('SELECT * FROM variants WHERE productId = ?', [req.params.id], (err, variants: VariantRow[]) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ ...product, variants });
        });
    });
};

export const updateProduct = (req: Request, res: Response) => {
    const { name, description, price, discount, category, variants } = req.body;
    if (!name || typeof price !== 'number' || !category || !Array.isArray(variants)) {
        return res.status(400).json({ error: 'Invalid input' });
    }
    db.run(
        'UPDATE products SET name = ?, description = ?, price = ?, discount = ?, category = ? WHERE id = ?',
        [name, description, price, discount || 0, category, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Product not found' });
            db.run('DELETE FROM variants WHERE productId = ?', [req.params.id], (err) => {
                if (err) return res.status(500).json({ error: err.message });
                const variantInserts = variants.map((v: Variant) =>
                    new Promise<void>((resolve, reject) =>
                        db.run(
                            'INSERT INTO variants (id, productId, size, color, stock) VALUES (?, ?, ?, ?, ?)',
                            [v.id, req.params.id, v.size, v.color, v.stock],
                            (err) => (err ? reject(err) : resolve())
                        )
                    )
                );
                Promise.all(variantInserts)
                    .then(() => {
                        db.run('INSERT OR IGNORE INTO categories (name) VALUES (?)', [category]);
                        res.json({ id: parseInt(req.params.id), name, description, price, discount, category, variants });
                    })
                    .catch(err => res.status(500).json({ error: err.message }));
            });
        }
    );
};

export const deleteProduct = (req: Request, res: Response) => {
    db.run('DELETE FROM products WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Product not found' });
        db.run('DELETE FROM variants WHERE productId = ?', [req.params.id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(204).send();
        });
    });
};

export const searchProducts = (req: Request, res: Response) => {
    const { q, category, minPrice, maxPrice } = req.query;
    let query = 'SELECT * FROM products WHERE 1=1';
    const params: any[] = [];
    if (q) {
        query += ' AND (name LIKE ? OR description LIKE ?)';
        params.push(`%${q}%`, `%${q}%`);
    }
    if (category) {
        query += ' AND category = ?';
        params.push(category);
    }
    if (minPrice) {
        query += ' AND price >= ?';
        params.push(parseFloat(minPrice as string));
    }
    if (maxPrice) {
        query += ' AND price <= ?';
        params.push(parseFloat(maxPrice as string));
    }
    db.all(query, params, (err, rows: ProductRow[]) => {
        if (err) return res.status(500).json({ error: err.message });
        const promises = rows.map((p: ProductRow) =>
            new Promise<Product>((resolve) =>
                db.all('SELECT * FROM variants WHERE productId = ?', [p.id], (err, variants: VariantRow[]) => {
                    resolve({ ...p, variants: err ? [] : variants });
                })
            )
        );
        Promise.all(promises).then(results => res.json(results));
    });
};

export const updateStock = (req: Request, res: Response) => {
    const { stock } = req.body;
    if (typeof stock !== 'number') return res.status(400).json({ error: 'Stock must be a number' });
    db.run(
        'UPDATE variants SET stock = ? WHERE id = ? AND productId = ?',
        [stock, req.params.variantId, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Variant not found' });
            db.get('SELECT * FROM variants WHERE id = ?', [req.params.variantId], (err, variant: VariantRow | undefined) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json(variant);
            });
        }
    );
};

export const getLowStock = (req: Request, res: Response) => {
    const threshold = parseInt(req.query.threshold as string) || 10;
    db.all(
        'SELECT p.id, p.name, v.id as variantId, v.size, v.color, v.stock FROM products p JOIN variants v ON p.id = v.productId WHERE v.stock <= ?',
        [threshold],
        (err, rows: any[]) => {
            if (err) return res.status(500).json({ error: err.message });
            const lowStock = rows.reduce((acc: Product[], row: any) => {
                const product = acc.find((p) => p.id === row.id);
                const variant: Variant = { id: row.variantId, size: row.size, color: row.color, stock: row.stock };
                if (product) product.variants.push(variant);
                else acc.push({ id: row.id, name: row.name, description: '', price: 0, discount: 0, category: '', variants: [variant] });
                return acc;
            }, []);
            res.json(lowStock);
        }
    );
};