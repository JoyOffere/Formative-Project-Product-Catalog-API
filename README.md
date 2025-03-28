### README.md

```markdown
# Product Catalog API

A RESTful API for managing a product catalog, built with Node.js, Express.js, TypeScript, and SQLite. This project fulfills the requirements of the Formative Project assignment by providing endpoints for product management, category organization, search, inventory tracking, and reporting.

## Features
- CRUD operations for products
- Category management
- Product search and filtering
- Variant support (e.g., size, color, stock)
- Inventory tracking
- Low-stock reporting
- Persistent storage with SQLite in a Docker volume

## Prerequisites
- **Node.js**: v18 or later
- **Docker**: For containerization
- **SQLite3 CLI**: For manual database queries (optional)
- **Postman**: For API testing
- **Git**: For version control

## Setup and Installation

### Clone the Repository
```bash
git clone https://github.com/JoyOffere/Formative-Project-Product-Catalog-API.git
cd Formative-Project-Product-Catalog-API
```

### Install Dependencies
```bash
npm install
```

### Build the Docker Image
```bash
docker build -t product-catalog-api .
```

### Run the Container
```bash
docker run -it \
  -v $(pwd):/app \
  -v /app/node_modules \
  -v product-catalog-db:/app/db \
  -e GIT_PAT=<your-git-personal-access-token> \
  -p 3000:3000 \
  product-catalog-api \
  /bin/sh -c "chmod +x push-to-repo.sh && npm run dev"
```
- Replace `<your-git-personal-access-token>` with your GitHub PAT.
- The API will be available at `http://localhost:3000/api`.

## API Documentation

### Base URL
`http://localhost:3000/api`

### Endpoints

#### Product Management
- **POST /api/products**: Create a product
  - Body: `{ "name": string, "description": string, "price": number, "discount": number, "category": string, "variants": [{ "id": string, "size": string, "color": string, "stock": number }] }`
  - Response: `201 { id, name, description, price, discount, category, variants }`
- **GET /api/products**: List all products
  - Response: `200 [{ id, name, description, price, discount, category, variants }]`
- **GET /api/products/:id**: Get a product by ID
  - Response: `200 { id, name, description, price, discount, category, variants }` or `404`
- **PUT /api/products/:id**: Update a product
  - Body: Same as POST
  - Response: `200 { id, name, description, price, discount, category, variants }` or `404`
- **DELETE /api/products/:id**: Delete a product
  - Response: `204` or `404`

#### Category Management
- **GET /api/categories**: List all categories
  - Response: `200 [string]`
- **POST /api/categories**: Create a category
  - Body: `{ "name": string }`
  - Response: `201 { name }` or `409` (if exists)

#### Search and Filtering
- **GET /api/products/search**: Search products
  - Query Params: `q` (search term), `category`, `minPrice`, `maxPrice`
  - Response: `200 [{ id, name, description, price, discount, category, variants }]`

#### Inventory Management
- **PATCH /api/products/:id/variants/:variantId/stock**: Update variant stock
  - Body: `{ "stock": number }`
  - Response: `200 { id, size, color, stock }` or `404`

#### Reporting
- **GET /api/reports/low-stock**: List low-stock products
  - Query Param: `threshold` (default: 10)
  - Response: `200 [{ id, name, variants: [{ id, size, color, stock }] }]`

### Error Handling
- `400`: Invalid input
- `404`: Resource not found
- `409`: Conflict (e.g., duplicate category)
- `500`: Server error

## Example Requests

### Create a Category
```bash
curl -X POST http://localhost:3000/api/categories -H "Content-Type: application/json" -d '{"name": "Electronics"}'
```
Response: `{"name": "Electronics"}`

### Create a Product
```bash
curl -X POST http://localhost:3000/api/products -H "Content-Type: application/json" -d '{"name": "Laptop", "price": 999.99, "category": "Electronics", "variants": [{"id": "v1", "size": "15-inch", "color": "Silver", "stock": 10}]}'
```
Response: `{"id": 1, "name": "Laptop", "price": 999.99, "discount": 0, "category": "Electronics", "variants": [{"id": "v1", "size": "15-inch", "color": "Silver", "stock": 10}]}`

## Querying the SQLite Database

### Via API
Use the endpoints (e.g., `GET /api/products`) to query data.

### Manually
1. **Locate the Volume**:
   ```bash
   docker volume inspect product-catalog-db
   ```
   Output: Shows `Mountpoint` (e.g., `/var/lib/docker/volumes/product-catalog-db/_data`).

2. **Copy the Database**:
   ```bash
   docker cp <container-id>:/app/db/product-catalog.db ./product-catalog.db
   ```
   Replace `<container-id>` with your running container’s ID (e.g., `15b19d42a2d4`).

3. **Query with SQLite CLI**:
   ```bash
   sqlite3 product-catalog.db
   sqlite> SELECT * FROM products;
   sqlite> SELECT * FROM categories;
   sqlite> SELECT * FROM variants;
   sqlite> .exit
   ```

## Assumptions and Limitations
- SQLite is used for simplicity; consider PostgreSQL for production.
- No authentication (see extensions).
- Variant IDs must be unique and provided by the client.

## Testing
Tested with Postman and cURL. See `ProductCatalogAPI.postman_collection.json` for a full test suite.

## Extensions
- Add JWT authentication
- Implement rate limiting
- Support product images with `multer`
```

---

### Guide: Building, Running, Querying, and Testing

#### 1. Build and Run

1. **Clone the Repo**:
   ```bash
   git clone https://github.com/JoyOffere/Formative-Project-Product-Catalog-API.git
   cd Formative-Project-Product-Catalog-API
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build the Docker Image**:
   ```bash
   docker build -t product-catalog-api .
   ```

4. **Run the Container**:
   ```bash
   docker run -it \
     -v $(pwd):/app \
     -v /app/node_modules \
     -v product-catalog-db:/app/db \
     -e GIT_PAT=<your-git-pat> \
     -p 3000:3000 \
     product-catalog-api \
     /bin/sh -c "chmod +x push-to-repo.sh && npm run dev"
   ```
   - Check logs for `Server running on port 3000`.

#### 2. Query the SQLite Database

1. **Via API**:
   - Use `curl` or Postman (see below) to hit endpoints like `GET /api/products`.

2. **Manually**:
   - **Inspect the Volume**:
     ```bash
     docker volume inspect product-catalog-db
     ```
     Look for `Mountpoint` (e.g., `/var/lib/docker/volumes/product-catalog-db/_data`).
   - **Copy the Database**:
     ```bash
     docker cp <container-id>:/app/db/product-catalog.db ./product-catalog.db
     ```
     Example: `docker cp 15b19d42a2d4:/app/db/product-catalog.db ./product-catalog.db`
   - **Query with SQLite**:
     ```bash
     sqlite3 product-catalog.db
     sqlite> SELECT * FROM products;
     sqlite> SELECT * FROM categories;
     sqlite> SELECT * FROM variants;
     sqlite> .exit
     ```
     - Fix syntax errors by ensuring one command per line (e.g., no extra `SELECT` as in your example).

#### 3. Test Endpoints with Postman

1. **Install Postman**:
   - Download from [postman.com](https://www.postman.com/).

2. **Create a Collection**:
   - Click “New” > “Collection” > Name it “Product Catalog API”.
   - Set up an environment:
     - “Environments” > “New” > Name: “Local” > Add `baseUrl: http://localhost:3000/api` > Save.

3. **Test Each Endpoint**:

   - **POST /api/categories**:
     - Method: POST
     - URL: `{{baseUrl}}/categories`
     - Headers: `Content-Type: application/json`
     - Body: Raw > JSON > `{"name": "Electronics"}`
     - Send: Expect `201 {"name": "Electronics"}`

   - **POST /api/products**:
     - Method: POST
     - URL: `{{baseUrl}}/products`
     - Body: `{"name": "Laptop", "price": 999.99, "category": "Electronics", "variants": [{"id": "v1", "size": "15-inch", "color": "Silver", "stock": 10}]}`
     - Send: Expect `201` with product details

   - **GET /api/products**:
     - Method: GET
     - URL: `{{baseUrl}}/products`
     - Send: Expect `200` with product array

   - **GET /api/products/:id**:
     - Method: GET
     - URL: `{{baseUrl}}/products/1`
     - Send: Expect `200` or `404`

   - **PUT /api/products/:id**:
     - Method: PUT
     - URL: `{{baseUrl}}/products/1`
     - Body: Same as POST
     - Send: Expect `200` or `404`

   - **DELETE /api/products/:id**:
     - Method: DELETE
     - URL: `{{baseUrl}}/products/1`
     - Send: Expect `204` or `404`

   - **GET /api/products/search**:
     - Method: GET
     - URL: `{{baseUrl}}/products/search?q=laptop&category=Electronics`
     - Send: Expect `200` with filtered results

   - **PATCH /api/products/:id/variants/:variantId/stock**:
     - Method: PATCH
     - URL: `{{baseUrl}}/products/1/variants/v1/stock`
     - Body: `{"stock": 5}`
     - Send: Expect `200` or `404`

   - **GET /api/reports/low-stock**:
     - Method: GET
     - URL: `{{baseUrl}}/reports/low-stock?threshold=10`
     - Send: Expect `200` with low-stock items

4. **Save and Export**:
   - Save each request in the collection.
   - Export: Collection > “…” > Export > Save as `ProductCatalogAPI.postman_collection.json`.

---

### Additional Notes

- **Copying the Database**: Use `docker cp` as shown whenever you need to inspect or back up the database.
- **Troubleshooting**:
  - If endpoints fail, check container logs for errors.
  - Ensure SQLite CLI is installed (`brew install sqlite` on macOS if `sqlite3` is missing).
- **Submission**: Push to GitHub with `push-to-repo.sh`.
