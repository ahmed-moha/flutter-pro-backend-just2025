# Node.js & TypeScript Backend Project

This is a robust backend server built with Node.js, Express, and TypeScript. It provides a foundational structure for building scalable and maintainable REST APIs, complete with database integration, authentication, and environment management.

## Features

- **TypeScript:** For type safety and better developer experience.
- **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB Integration:** Uses Mongoose for elegant mongodb object modeling.
- **JWT Authentication:** Secure endpoints using JSON Web Tokens.
- **Environment Variables:** Manages configuration for different environments using `.env` files.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A MongoDB database instance (local or cloud-based like MongoDB Atlas)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

3.  **Create the environment file:**
    Create a new file named `.env` in the root of the project. You can do this by copying the example file if one exists:
    ```sh
    cp .env.example .env
    ```
    Then, populate it with your specific configuration details as described in the section below.

## Configuration (`.env` file)

This project uses a `.env` file to manage all environment variables. This file is critical for security and configuration, and it **should never be committed to version control**. Make sure your `.gitignore` file includes a line for `.env`.

Your `.env` file should be structured as follows. Fill in the values according to your setup.

```env
# Server Configuration
PORT=3400
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=[ YOUR MONGODB URL ]

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Bcrypt Configuration
BCRYPT_SALT_ROUNDS=10
```

### Environment Variables Explained

* **`PORT`**: The port on which the Express server will run. Defaults to `3400` if not specified.
* **`NODE_ENV`**: The runtime environment. Set to `development`, `production`, or `test`.
* **`MONGODB_URI`**: The connection string for your MongoDB database. The example shows a connection to a MongoDB Atlas cluster.
* **`JWT_SECRET`**: A secret, random string used to sign the JSON Web Tokens. **This must be changed to a secure, unique value for production environments.**
* **`JWT_EXPIRES_IN`**: The expiration time for the JWT. For example: `24h`, `7d`, `365d`.
* **`BCRYPT_SALT_ROUNDS`**: The cost factor for bcrypt when hashing passwords. A higher number is more secure but slower. `10` is a good default.

## Available Scripts

In the `package.json` file, you will find the following scripts:

-   **`npm run dev`**: Starts the server in development mode with hot-reloading using `ts-node-dev` or a similar tool.
-   **`npm run build`**: Compiles the TypeScript code into JavaScript in the `dist/` directory.
-   **`npm start`**: Starts the compiled JavaScript application from the `dist/` directory. Intended for production use.
-   **`npm run test`**: Runs the test suite.

## API Endpoints

* **POST /api/auth/register**: Register a new user.
* **POST /api/auth/login**: Login an existing user and receive a JWT.
* **GET /api/users**: Get a list of users (protected route).

---
*This README was generated on June 10, 2025.*
