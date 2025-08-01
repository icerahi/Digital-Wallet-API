# Digital Wallet API

This is a secure, modular, and role-based backend API for a digital wallet system, similar to Bkash or Nagad. It is built with Express.js and Mongoose.

## Project Overview

This project implements a digital wallet system where users can register, manage wallets, and perform core financial operations such as adding money, withdrawing, and sending money. The system includes authentication, role-based authorization, wallet management logic, and transactional logic, all within a modular code architecture.

## Features

*   **User Authentication:** Secure user registration and login with JWT (JSON Web Token) authentication. Passwords are hashed using bcrypt. The system supports three distinct roles: `user`, `agent`, and `admin`.

*   **Wallet Management:** Every `user` and `agent` is automatically provided with a digital wallet upon registration, initialized with a balance of ৳50. Wallets can be blocked or unblocked by administrators, preventing any transactions on a blocked wallet.

*   **User Capabilities:**
    *   **Add Money (Top-Up):** Users can add funds to their own wallets.
    *   **Withdraw Money:** Users can withdraw funds from their own wallets.
    *   **Send Money:** Users can transfer funds to other users.
    *   **Transaction History:** Users can view a complete history of their transactions.

*   **Agent Capabilities:**
    *   **Cash-In:** Agents can add funds to any user's wallet.
    *   **Cash-Out:** Agents can withdraw funds from any user's wallet.

*   **Administrator Capabilities:**
    *   **System-Wide Visibility:** Admins have a comprehensive view of all users, agents, wallets, and transactions within the system.
    *   **User and Wallet Control:** Admins can block or unblock user wallets and approve or suspend agent accounts.

*   **Transaction Integrity:** All financial operations are recorded as transactions, ensuring a complete and auditable trail of activities.

*   **Role-Based Access Control (RBAC):** The API enforces strict access control, ensuring that users, agents, and admins can only access the features and data relevant to their roles.

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
      "receiver": "<receiver-user-id>",
      "amount": 50
    }
    ```

*   **`POST /api/v1/wallets/cash-in`**

    Allows an `agent` to add money to a user's wallet.

    **Request Body:**

    ```json
    {
      "receiver": "<user-id>",
      "amount": 100
    }
    ```

*   **`POST /api/v1/wallets/cash-out`**

    Allows an `agent` to withdraw money from a user's wallet.

    **Request Body:**

    ```json
    {
      "sender": "<user-id>",
      "amount": 50
    }
    ```

*   **`GET /api/v1/wallets/all-wallets`**

    Retrieves all wallets in the system. (Admin only)

*   **`PATCH /api/v1/wallets/block/:id`**

    Blocks a user's wallet. (Admin only)

*   **`PATCH /api/v1/wallets/unblock/:id`**

    Unblocks a user's wallet. (Admin only)

*   **`GET /api/v1/wallets/:id`**

    Retrieves a single wallet by its ID. (Admin only)

### Transaction Module

*   **`GET /api/v1/transactions/me`**

    Retrieves the transaction history of the currently authenticated `user` or `agent`.

*   **`GET /api/v1/transactions/all`**

    Retrieves all transactions in the system. (Admin only)

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
*   `MONGO_URI`: The connection string for the MongoDB database.
*   `JWT_SECRET`: Secret key for signing JWTs.
*   `JWT_EXPIRES_IN`: Expiration time for JWTs.
*   `REFRESH_TOKEN_SECRET`: Secret key for signing refresh tokens.
*   `REFRESH_TOKEN_EXPIRES_IN`: Expiration time for refresh tokens.
*   `BCRYPT_SALT_ROUNDS`: The number of salt rounds for bcrypt.
*   `SUPER_ADMIN_EMAIL`: The email for the super admin user.
*   `SUPER_ADMIN_PASSWORD`: The password for the super admin user.

## Project Structure

```
src/
├── modules/
│   ├── auth/
│   ├── user/
│   ├── wallet/
│   └── transaction/
├── middlewares/
├── config/
├── utils/
├── app.ts
```

## Technologies Used

*   **Node.js**
*   **Express.js**
*   **TypeScript**
*   **MongoDB**
*   **Mongoose**
*   **JWT (JSON Web Tokens)**
*   **Zod**
*   **ESLint**
