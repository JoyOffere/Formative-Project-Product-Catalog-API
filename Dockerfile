FROM node:18-alpine

WORKDIR /app

# Install git and build tools for sqlite3
RUN apk add --no-cache git python3 make g++

# Create directory for SQLite database
RUN mkdir -p /app/db

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Rebuild sqlite3 to ensure compatibility with Alpine
RUN npm rebuild sqlite3

# Copy the rest of the project files
COPY . .

# Build the TypeScript project
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]