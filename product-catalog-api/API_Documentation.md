# API Documentation for Product Catalog API

## Overview
Welcome to the Product Catalog API. This API allows you to manage products, categories, and inventory in a product catalog system.

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### Products

#### Get All Products
- **URL:** `/products`
- **Method:** `GET`
- **Response:**
  - **200 OK**: Returns a list of all products.

#### Search Products
- **URL:** `/products/search`
- **Method:** `GET`
- **Query Parameters:**
  - `minPrice`: Minimum price for filtering products.
  - `maxPrice`: Maximum price for filtering products.
  - `category`: Category ID for filtering products.
- **Response:**
  - **200 OK**: Returns a list of filtered products.

#### Get Product by ID
- **URL:** `/products/:id`
- **Method:** `GET`
- **URL Params:**
  - `id`: Product ID (UUID).
- **Response:**
  - **200 OK**: Returns the product details.
  - **404 Not Found**: If the product does not exist.

#### Create New Product
- **URL:** `/products`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "Product Name",
    "description": "Product Description",
    "price": 100.00,
    "discount": 10,
    "stockQuantity": 50
  }
  ```
- **Response:**
  - **201 Created**: Returns the created product.
  - **400 Bad Request**: If required fields are missing or invalid.

#### Update Product
- **URL:** `/products/:id`
- **Method:** `PUT`
- **URL Params:**
  - `id`: Product ID (UUID).
- **Request Body:** Same as Create New Product.
- **Response:**
  - **200 OK**: Returns the updated product.
  - **404 Not Found**: If the product does not exist.

#### Delete Product
- **URL:** `/products/:id`
- **Method:** `DELETE`
- **URL Params:**
  - `id`: Product ID (UUID).
- **Response:**
  - **204 No Content**: Successfully deleted.
  - **404 Not Found**: If the product does not exist.

### Categories

#### Get All Categories
- **URL:** `/categories`
- **Method:** `GET`
- **Response:**
  - **200 OK**: Returns a list of all categories.

#### Get Category by ID
- **URL:** `/categories/:id`
- **Method:** `GET`
- **URL Params:**
  - `id`: Category ID (UUID).
- **Response:**
  - **200 OK**: Returns the category details.
  - **404 Not Found**: If the category does not exist.

#### Create New Category
- **URL:** `/categories`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "Category Name",
    "parentId": "UUID of parent category (optional)"
  }
  ```
- **Response:**
  - **201 Created**: Returns the created category.
  - **400 Bad Request**: If required fields are missing or invalid.

#### Update Category
- **URL:** `/categories/:id`
- **Method:** `PUT`
- **URL Params:**
  - `id`: Category ID (UUID).
- **Request Body:** Same as Create New Category.
- **Response:**
  - **200 OK**: Returns the updated category.
  - **404 Not Found**: If the category does not exist.

#### Delete Category
- **URL:** `/categories/:id`
- **Method:** `DELETE`
- **URL Params:**
  - `id`: Category ID (UUID).
- **Response:**
  - **204 No Content**: Successfully deleted.
  - **404 Not Found**: If the category does not exist.

### Inventory

#### Get Low Stock Items
- **URL:** `/inventory/low-stock`
- **Method:** `GET`
- **Response:**
  - **200 OK**: Returns a list of low stock items.

#### Get Product Inventory
- **URL:** `/inventory/product/:id`
- **Method:** `GET`
- **URL Params:**
  - `id`: Product ID (UUID).
- **Response:**
  - **200 OK**: Returns the inventory details for the product.
  - **404 Not Found**: If the product does not exist.

#### Update Product Inventory
- **URL:** `/inventory/product/:id`
- **Method:** `PUT`
- **URL Params:**
  - `id`: Product ID (UUID).
- **Request Body:**
  ```json
  {
    "quantity": 100
  }
  ```
- **Response:**
  - **200 OK**: Returns the updated inventory.
  - **404 Not Found**: If the product does not exist.

#### Update Variant Inventory
- **URL:** `/inventory/product/:productId/variant/:variantId`
- **Method:** `PUT`
- **URL Params:**
  - `productId`: Product ID (UUID).
  - `variantId`: Variant ID (UUID).
- **Request Body:** Same as Update Product Inventory.
- **Response:**
  - **200 OK**: Returns the updated variant inventory.
  - **404 Not Found**: If the product or variant does not exist.

## Error Codes
- **400 Bad Request**: Invalid request parameters or body.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Unexpected server error.

## Conclusion
This documentation provides an overview of the Product Catalog API, including all available endpoints, request/response formats, and error codes. For further assistance, please refer to the codebase or contact the development team.
