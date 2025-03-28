import * as categoryController from "../controllers/categoryController";
import * as productController from "../controllers/productController";
import { Router } from "express";

const router = Router();

// Product Management
router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Category Management
router.get('/categories', categoryController.getCategories);
router.post('/categories', categoryController.createCategory);

// Search and Filtering
router.get('/products/search', productController.searchProducts);

// Inventory Management
router.patch('/products/:id/variants/:variantId/stock', productController.updateStock);

// Reporting
router.get('/reports/low-stock', productController.getLowStock);

export default router;