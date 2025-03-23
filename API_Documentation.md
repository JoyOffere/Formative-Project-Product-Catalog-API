# Product Catalog API Documentation

## Overview
The Product Catalog API provides endpoints for managing products, categories, and inventory in an e-commerce application. It allows users to perform CRUD operations on products and categories, as well as manage inventory levels.

## Endpoints

### Products

#### Get All Products
- **Method**: GET
- **URL**: `/products`
- **Response**:
  - **200 OK**: Returns a list of all products.
  - **Example**:
    ```json
    [
      {
        "id": "1",
        "name": "Product 1",
        "description": "Description of Product 1",
        "price": 100.00,
        "categoryId": "1",
        "stockQuantity": 50
      }
    ]
    ```

#### Get Product by ID
- **Method**: GET
- **URL**: `/products/:id`
- **Response**:
  - **200 OK**: Returns the product with the specified ID.
  - **404 Not Found**: If the product does not exist.
  - **Example**:
    ```json
    {
      "id": "1",
      "name": "Product 1",
      "description": "Description of Product 1",
      "price": 100.00,
      "categoryId": "1",
      "stockQuantity": 50
    }
    ```

#### Create New Product
- **Method**: POST
- **URL**: `/products`
- **Request Body**:
  ```json
  {
    "name": "New Product",
    "description": "Description of New Product",
    "price": 150.00,
    "categoryId": "1",
    "stockQuantity": 30
  }
  ```
- **Response**:
  - **201 Created**: Returns the created product.
  - **400 Bad Request**: If required fields are missing.
  - **Example**:
    ```json
    {
      "id": "2",
      "name": "New Product",
      "description": "Description of New Product",
      "price": 150.00,
      "categoryId": "1",
      "stockQuantity": 30
    }
    ```

#### Update Product
- **Method**: PUT
- **URL**: `/products/:id`
- **Request Body**: Same as Create New Product
- **Response**:
  - **200 OK**: Returns the updated product.
  - **404 Not Found**: If the product does not exist.
  - **Example**:
    ```json
    {
      "id": "1",
      "name": "Updated Product",
      "description": "Updated description",
      "price": 120.00,
      "categoryId": "1",
      "stockQuantity": 40
    }
    ```

#### Delete Product
- **Method**: DELETE
- **URL**: `/products/:id`
- **Response**:
  - **200 OK**: Returns a success message.
  - **404 Not Found**: If the product does not exist.
  - **Example**:
    ```json
    {
      "message": "Product deleted successfully"
    }
    ```

### Categories

#### Get All Categories
- **Method**: GET
- **URL**: `/categories`
- **Response**:
  - **200 OK**: Returns a list of all categories.
  - **Example**:
    ```json
    [
      {
        "id": "1",
        "name": "Category 1",
        "description": "Description of Category 1"
      }
    ]
    ```

#### Get Category by ID
- **Method**: GET
- **URL**: `/categories/:id`
- **Response**:
  - **200 OK**: Returns the category with the specified ID.
  - **404 Not Found**: If the category does not exist.
  - **Example**:
    ```json
    {
      "id": "1",
      "name": "Category 1",
      "description": "Description of Category 1"
    }
    ```

#### Create New Category
- **Method**: POST
- **URL**: `/categories`
- **Request Body**:
  ```json
  {
    "name": "New Category",
    "description": "Description of New Category"
  }
  ```
- **Response**:
  - **201 Created**: Returns the created category.
  - **400 Bad Request**: If required fields are missing.
  - **Example**:
    ```json
    {
      "id": "2",
      "name": "New Category",
      "description": "Description of New Category"
    }
    ```

#### Update Category
- **Method**: PUT
- **URL**: `/categories/:id`
- **Request Body**: Same as Create New Category
- **Response**:
  - **200 OK**: Returns the updated category.
  - **404 Not Found**: If the category does not exist.
  - **Example**:
    ```json
    {
      "id": "1",
      "name": "Updated Category",
      "description": "Updated description"
    }
    ```

#### Delete Category
- **Method**: DELETE
- **URL**: `/categories/:id`
- **Response**:
  - **200 OK**: Returns a success message.
  - **404 Not Found**: If the category does not exist.
  - **Example**:
    ```json
    {
      "message": "Category deleted successfully"
    }
    ```

### Inventory

#### Get Inventory for a Product
- **Method**: GET
- **URL**: `/inventory/product/:id`
- **Response**:
  - **200 OK**: Returns the inventory for the specified product.
  - **404 Not Found**: If the product does not exist.
  - **Example**:
    ```json
    {
      "productId": "1",
      "quantity": 50
    }
    ```

#### Update Product Inventory
- **Method**: PUT
- **URL**: `/inventory/product/:id`
- **Request Body**:
  ```json
  {
    "quantity": 60
  }
  ```
- **Response**:
  - **200 OK**: Returns the updated inventory.
  - **404 Not Found**: If the product does not exist.
  - **Example**:
    ```json
    {
      "productId": "1",
      "quantity": 60
    }
    ```

#### Update Variant Inventory
- **Method**: PUT
- **URL**: `/inventory/product/:productId/variant/:variantId`
- **Request Body**:
  ```json
  {
    "quantity": 30
  }
  ```
- **Response**:
  - **200 OK**: Returns the updated inventory for the variant.
  - **404 Not Found**: If the product or variant does not exist.
  - **Example**:
    ```json
    {
      "productId": "1",
      "variantId": "1",
      "quantity": 30
    }
    ```

#### Get Low Stock Items Report
- **Method**: GET
- **URL**: `/inventory/low-stock`
- **Response**:
  - **200 OK**: Returns a list of low stock items.
  - **Example**:
    ```json
    {
      "threshold": 10,
      "totalItems": 2,
      "items": [
        {
          "productId": "1",
          "quantity": 5
        }
      ]
    }
    ```

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd product-catalog-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node server.js
   ```
5. The API will be running on `http://localhost:3000`.

## Error Handling
The API uses a centralized error handler that returns a JSON response for errors. The structure of the error response is as follows:
```json
{
  "error": {
    "message": "Error message",
    "status": 400
  }
}
