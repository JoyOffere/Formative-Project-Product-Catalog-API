# Product Catalog API

A RESTful API for managing an e-commerce product catalog.

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with:
   ```
   PORT=3000
   ```
4. Start the server:
   ```
   npm start
   ```
5. For development with auto-reload:
   ```
   npm run dev
   ```

## API Endpoints

### Products

#### Get All Products
- **URL**: `/api/products`
- **Method**: `GET`
- **Response**: Array of all products
- **Example Response**:
  ```json
  [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones with noise cancellation",
      "price": 149.99,
      "categoryId": "123e4567-e89b-12d3-a456-426614174000",
      "stockQuantity": 45,
      "variants": [
        {
          "id": "550e8400-e29b-41d4-a716-446655440001",
          "name": "Black",
          "attributes": {
            "color": "Black"
          },
          "price": 149.99,
          "stockQuantity": 30
        },
        {
          "id": "550e8400-e29b-41d4-a716-446655440002",
          "name": "White",
          "attributes": {
            "color": "White"
          },
          "price": 149.99,
          "stockQuantity": 15
        }
      ],
      "discount": 10,
      "tags": ["electronics", "audio", "wireless"],
      "createdAt": "2023-01-15T08:30:00.000Z",
      "updatedAt": "2023-01-15T08:30:00.000Z"
    }
  ]
  ```

#### Get Product by ID
- **URL**: `/api/products/:id`
- **Method**: `GET`
- **URL Params**: `id=[UUID]`
- **Response**: Single product object
- **Example Response**:
  ```json
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones with noise cancellation",
    "price": 149.99,
    "categoryId": "123e4567-e89b-12d3-a456-426614174000",
    "stockQuantity":