# Digital Wallet API

Welcome to the Digital Wallet API, a secure and modular backend system built with Express.js and Mongoose. This API empowers you to build a robust digital wallet application, similar to popular services like Bkash or Nagad, with features for users, agents, and administrators.

## Project Overview

This project provides a comprehensive and well-structured foundation for a digital wallet system. It includes a secure authentication system, role-based access control, and a complete set of features for managing wallets and processing transactions. The modular architecture makes it easy to understand, maintain, and extend.

## Features

### Core Features

*   **Secure Authentication:** A robust authentication system using JSON Web Tokens (JWT) and bcrypt for password hashing. The system supports three user roles: `user`, `agent`, and `admin`.
*   **Role-Based Access Control (RBAC):** A flexible RBAC system that restricts access to specific endpoints based on user roles, ensuring that users can only perform actions they are authorized to.
*   **Automatic Wallet Creation:** Every `user` and `agent` automatically receives a digital wallet with an initial balance of ৳50 upon registration.
*   **Comprehensive Transaction System:** A complete system for tracking all financial operations, including adding money, withdrawing money, sending money, cash-ins, and cash-outs.

### User Features

*   **Add Money:** Users can easily top-up their wallets.
*   **Withdraw Money:** Users can withdraw funds from their wallets.
*   **Send Money:** Users can send money to other users by specifying the recipient's phone number.
*   **Transaction History:** Users have access to a detailed history of all their transactions, with support for filtering by transaction type, sorting, and pagination.

### Agent Features

*   **Cash-In:** Agents can add money to a user's wallet by specifying the user's phone number.
*   **Cash-Out:** Agents can withdraw money from a user's wallet by specifying the user's phone number.

### Admin Features

*   **Complete System Oversight:** Administrators have a bird's-eye view of the entire system, with access to all users, agents, wallets, and transactions.
*   **User and Wallet Management:** Admins can block or unblock user wallets, and approve or suspend agent accounts.
*   **Advanced Filtering and Sorting:** Admins can filter and sort users, wallets, and transactions based on various criteria.

## API Endpoints

### Auth Module

*   **`POST /api/v1/auth/login`**

    Authenticates a user, agent, or admin and returns a JWT token.

    **Request Body:**

    ```json
    {
      "phone": "01700000000",
      "password": "Password@123"
    }
    ```

*   **`POST /api/v1/auth/logout`**

    Logs out the currently authenticated user.

*   **`POST /api/v1/auth/refresh-token`**

    Refreshes an expired JWT token.

### User Module

*   **`POST /api/v1/users/register`**

    Registers a new `user` or `agent`.

    **Request Body:**

    ```json
    {
      "fullname": "John Doe",
      "phone": "01700000000",
      "password": "Password@123",
      "role": "user"
    }
    ```

*   **`GET /api/v1/users/all-users`**

    Retrieves a list of all users. (Admin only)

    **Query Parameters:**

    *   `role`: Filter by user role (`user` or `agent`).
    *   `phone`: Filter by phone number.
    *   `sort`: Sort by a specific field (e.g., `createdAt`, `-createdAt`).
    *   `page`: The page number for pagination.
    *   `limit`: The number of items per page.

*   **`GET /api/v1/users/:id`**

    Retrieves a single user by their ID. (Admin only)

*   **`PATCH /api/v1/users/approve-agent/:id`**

    Approves an agent. (Admin only)

*   **`PATCH /api/v1/users/suspend-agent/:id`**

    Suspends an agent. (Admin only)

### Wallet Module

*   **`GET /api/v1/wallets/me`**

    Retrieves the wallet of the currently authenticated `user` or `agent`.

*   **`POST /api/v1/wallets/add-money`**

    Adds money to the user's own wallet.

    **Request Body:**

    ```json
    {
      "amount": 100
    }
    ```

*   **`POST /api/v1/wallets/withdraw-money`**

    Withdraws money from the user's own wallet.

    **Request Body:**

    ```json
    {
      "amount": 50
    }
    ```

*   **`POST /api/v1/wallets/send-money`**

    Sends money from the user's wallet to another user.

    **Request Body:**

    ```json
    {
      "receiver": "<receiver-phone-number>",
      "amount": 50
    }
    ```

*   **`POST /api/v1/wallets/cash-in`**

    Allows an `agent` to add money to a user's wallet.

    **Request Body:**

    ```json
    {
      "receiver": "<user-phone-number>",
      "amount": 100
    }
    ```

*   **`POST /api/v1/wallets/cash-out`**

    Allows an `agent` to withdraw money from a user's wallet.

    **Request Body:**

    ```json
    {
      "sender": "<user-phone-number>",
      "amount": 50
    }
    ```

*   **`GET /api/v1/wallets/all-wallets`**

    Retrieves all wallets in the system. (Admin only)

    **Query Parameters:**

    *   `phone`: Filter by the owner's phone number.
    *   `sort`: Sort by a specific field (e.g., `createdAt`, `-createdAt`).
    *   `page`: The page number for pagination.
    *   `limit`: The number of items per page.

*   **`PATCH /api/v1/wallets/block/:id`**

    Blocks a user's wallet. (Admin only)

*   **`PATCH /api/v1/wallets/unblock/:id`**

    Unblocks a user's wallet. (Admin only)

*   **`GET /api/v1/wallets/:id`**

    Retrieves a single wallet by its ID. (Admin only)

### Transaction Module

*   **`GET /api/v1/transactions/me`**

    Retrieves the transaction history of the currently authenticated `user` or `agent`.

    **Query Parameters:**

    *   `type`: Filter by transaction type (e.g., `ADD_MONEY`, `SEND_MONEY`).
    *   `sort`: Sort by a specific field (e.g., `createdAt`, `-createdAt`).
    *   `page`: The page number for pagination.
    *   `limit`: The number of items per page.

*   **`GET /api/v1/transactions/all`**

    Retrieves all transactions in the system. (Admin only)

    **Query Parameters:**

    *   `type`: Filter by transaction type.
    *   `sender`: Filter by the sender's phone number.
    *   `receiver`: Filter by the receiver's phone number.
    *   `sort`: Sort by a specific field.
    *   `page`: The page number for pagination.
    *   `limit`: The number of items per page.

*   **`GET /api/v1/transactions/:id`**

    Retrieves a single transaction by its ID. (Admin only)

*   **`PATCH /api/v1/transactions/:id`**

    Updates the status of a transaction. (Admin only)

    **Request Body:**

    ```json
    {
      "status": "completed"
    }
    ```

## Project Structure

The project follows a modular architecture to ensure a clean and scalable codebase:

```
src/
├── app.ts                # Express app configuration
├── server.ts             # Server initialization
├── config/               # Environment variables and configuration
│   └── env.ts
├── helpers/              # Custom error handling and utility functions
│   └── AppError.ts
├── interfaces/           # TypeScript interfaces and type definitions
│   ├── error.types.ts
│   └── index.d.ts
├── middlewares/          # Express middleware for authentication, validation, etc.
│   ├── checkAuth.ts
│   ├── globalErrorHandler.ts
│   ├── notFound.ts
│   └── validateRequest.ts
├── modules/              # Core application modules
│   ├── auth/             # Authentication and authorization
│   │   ├── auth.controller.ts
│   │   ├── auth.route.ts
│   │   ├── auth.service.ts
│   │   └── auth.validation.ts
│   ├── transaction/      # Transaction management
│   │   ├── transaction.controller.ts
│   │   ├── transaction.interface.ts
│   │   ├── transaction.model.ts
│   │   ├── transaction.route.ts
│   │   ├── transaction.service.ts
│   │   └── transaction.validation.ts
│   ├── user/             # User management
│   │   ├── user.controller.ts
│   │   ├── user.interface.ts
│   │   ├── user.model.ts
│   │   ├── user.route.ts
│   │   ├── user.service.ts
│   │   └── user.validation.ts
│   └── wallet/           # Wallet management
│       ├── wallet.controller.ts
│       ├── wallet.interface.ts
│       ├── wallet.model.ts
│       ├── wallet.route.ts
│       ├── wallet.Services.ts
│       └── wallet.validation.ts
├── routes/               # API routes
│   └── index.ts
└── utils/                # Utility functions
    ├── catchAsync.ts
    ├── createUserToken.ts
    ├── jwt.ts
    ├── seedSuperAdmin.ts
    ├── sendResponse.ts
    └── setCookie.ts
```

## Installation and Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/icerahi/Digital-Wallet-API.git
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory and add the necessary environment variables (see `src/config/env.ts`).

## Running the Application

*   **Development Mode:**

    ```bash
    npm run dev
    ```

*   **Production Mode:**

    ```bash
    npm run build
    npm start
    ```

## Environment Variables

*   `PORT`: The port to run the server on.
*   `DB_URL`: The connection string for the MongoDB database.
*   `NODE_ENV`: The application environment (`development` or `production`).
*   `BCRYPT_SALT_ROUND`: The number of salt rounds for bcrypt.
*   `JWT_ACCESS_TOKEN_SECRET`: Secret key for signing JWTs.
*   `JWT_ACCESS_TOKEN_EXPIRES`: Expiration time for JWTs.
*   `JWT_REFRESH_TOKEN_SECRET`: Secret key for signing refresh tokens.
*   `JWT_REFRESH_TOKEN_EXPIRES`: Expiration time for refresh tokens.
*   `SUPER_ADMIN_PHONE`: The phone number for the super admin user.
*   `SUPER_ADMIN_PASSWORD`: The password for the super admin user.

## Technologies Used

*   **Node.js**
*   **Express.js**
*   **TypeScript**
*   **MongoDB**
*   **Mongoose**
*   **JWT (JSON Web Tokens)**
*   **Zod**
*   **ESLint**