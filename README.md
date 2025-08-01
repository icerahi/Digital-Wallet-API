# Digital Wallet API

Welcome to the Digital Wallet API, a secure and modular backend system built with Express.js and Mongoose. This API empowers you to build a robust digital wallet application, similar to popular services like Bkash or Nagad, with features for users, agents, and administrators.

## Project Overview

This project provides a comprehensive and well-structured foundation for a digital wallet system. It includes a secure authentication system, role-based access control, and a complete set of features for managing wallets and processing transactions. The modular architecture makes it easy to understand, maintain, and extend.

## Features

### Core System

- **Secure Authentication**: JWT-based authentication with bcrypt password hashing and refresh token rotation
- **Role-Based Access Control**: Granular permissions for users, agents, and administrators
- **Automatic Wallet Creation**: Instant wallet creation with 50 credit initial balance upon registration
- **Transaction Integrity**: A complete system for tracking all financial operations, including adding money, withdrawing money, sending money, cash-ins, and cash-outs.

### User Capabilities

- **Add Money:**: Add funds to personal wallet (extensible, e.g., from `Bank`, `Credit Card` etc).
- **Withdraw Money**: Transfer funds from wallet to external accounts (extensible e.g., to `ATM` or `Wallat to Bank` )
- \*\*Send Money: Send money to other users via phone number
- **Transaction History**: Detailed financial records with filtering and pagination

### Agent Services

- **Cash-In**: Agents can add money to a user's wallet by specifying the user's phone number.
- **Cash-Out**: Agents can withdraw money from a user's wallet by specifying the user's phone number.

### Administrative Controls

- **System Oversight**: Complete visibility into all users, agents, wallets and transactions
- **Account Management**: Block/unblock wallets, approve as agent, remove as agent
- **Financial Monitoring**: Filter and sort users, wallets, and transactions based on various criteria.
- **Transaction Oversight**: Review and update transaction status

## API Endpoints

### Authentication:

| Method | Endpoint                     | Description         | Access Level  |
| ------ | ---------------------------- | ------------------- | ------------- |
| POST   | `/api/v1/auth/login`         | Authenticate user   | Public        |
| POST   | `/api/v1/auth/logout`        | Logout current user | Authenticated |
| POST   | `/api/v1/auth/refresh-token` | Refresh JWT token   | Authenticated |

Login Request Body:

```json
{
  "phone": "01700000000",
  "password": "Password@123"
}
```

### User Management:

| Method | Endpoint                          | Description             | Access Level | Query Parameters                         |
| ------ | --------------------------------- | ----------------------- | ------------ | ---------------------------------------- |
| POST   | `/api/v1/users/register`          | Register new user/agent | Public       | -                                        |
| GET    | `/api/v1/users/all-users`         | Get all users           | Admin        | `role`, `phone`, `sort`, `page`, `limit` |
| GET    | `/api/v1/users/:id`               | Get user by ID          | Admin        | -                                        |
| PATCH  | `/api/v1/users/approve-agent/:id` | Approve as agent        | Admin        | -                                        |
| PATCH  | `/api/v1/users/suspend-agent/:id` | Remove as agent         | Admin        | -                                        |

Registration Request Body:

```json
{
  "fullname": "Imran",
  "phone": "01700000000",
  "password": "Password@123",
  "role": "AGENT"
}
```

### Wallet Operations:

| Method | Endpoint                         | Description                      | Access Level | Query Parameters                 |
| ------ | -------------------------------- | -------------------------------- | ------------ | -------------------------------- |
| GET    | `/api/v1/wallets/me`             | Get own wallet                   | User/Agent   | -                                |
| POST   | `/api/v1/wallets/add-money`      | Add money to own wallet          | User/Agent   | -                                |
| POST   | `/api/v1/wallets/withdraw-money` | Withdraw from own wallet         | User         | -                                |
| POST   | `/api/v1/wallets/send-money`     | Send money to another user       | User         | -                                |
| POST   | `/api/v1/wallets/cash-in`        | Agent adds money to user wallet  | Agent        | -                                |
| POST   | `/api/v1/wallets/cash-out`       | Agent withdraws from user wallet | Agent        | -                                |
| GET    | `/api/v1/wallets/all`            | Get all wallets                  | Admin        | `phone`, `sort`, `page`, `limit` |
| PATCH  | `/api/v1/wallets/block/:id`      | Block wallet                     | Admin        | -                                |
| PATCH  | `/api/v1/wallets/unblock/:id`    | Unblock wallet                   | Admin        | -                                |
| GET    | `/api/v1/wallets/:id`            | Get wallet by ID                 | Admin        | -                                |

Add Money/Withdraw Money Request body:

```json
{
  "amount": 50
}
```

Send Money/Cash-In Request body:

```json
{
  "receiver": "01XXXXXXXXX",
  "amount": 50
}
```

Cash-Out Request body:

```json
{
  "sender": "01XXXXXXXXX",
  "amount": 50
}
```

### Transaction Management

| Method | Endpoint                   | Description                 | Access Level | Query Parameters                                      |
| ------ | -------------------------- | --------------------------- | ------------ | ----------------------------------------------------- |
| GET    | `/api/v1/transactions/me`  | Get own transaction history | User/Agent   | `type`, `sort`, `page`, `limit`                       |
| GET    | `/api/v1/transactions/all` | Get all transactions        | Admin        | `type`, `sender`, `receiver`, `sort`, `page`, `limit` |
| GET    | `/api/v1/transactions/:id` | Get transaction by ID       | Admin        | -                                                     |
| PATCH  | `/api/v1/transactions/:id` | Update transaction status   | Admin        | -                                                     |

Transaction Status Update Request Body:

```json
{
  "status": "REVERSED"
}
```

## Project Structure

```
src/
├── app.ts                # Express app configuration
├── server.ts             # Server initialization
├── config/               # Environment variables and configuration
│   └── env.ts
├── helpers/              # Custom error handling and utility functions
│   └── AppError.ts
├── interfaces/           # Global TypeScript interfaces and type definitions
│   ├── error.types.ts
│   └── index.d.ts
├── middlewares/          #  middleware functions
│   ├── checkAuth.ts
│   ├── globalErrorHandler.ts
│   ├── notFound.ts
│   └── validateRequest.ts
├── modules/              # Core application modules
│   ├── auth/             # Authentication and authorization
│   ├── transaction/      # Transaction management
│   ├── user/             # User management
│   └── wallet/           # Wallet management
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

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/icerahi/Digital-Wallet-API.git
   cd Digital-Wallet-API
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and configure the required variables (see [Environment Variables](#environment-variables)).

## Running the Application

- **Development Mode:**

  ```bash
  npm run dev
  ```

- **Production Mode:**
  ```bash
  npm run build
  npm start
  ```

## Environment Variables

| Variable                    | Description                  | Default       |
| --------------------------- | ---------------------------- | ------------- |
| `PORT`                      | Server port                  | `5000`        |
| `DB_URL`                    | MongoDB connection string    | Required      |
| `NODE_ENV`                  | Application environment      | `development` |
| `BCRYPT_SALT_ROUND`         | Bcrypt salt rounds           | `12`          |
| `JWT_ACCESS_TOKEN_SECRET`   | JWT access token secret      | Required      |
| `JWT_ACCESS_TOKEN_EXPIRES`  | JWT access token expiration  | `15m`         |
| `JWT_REFRESH_TOKEN_SECRET`  | JWT refresh token secret     | Required      |
| `JWT_REFRESH_TOKEN_EXPIRES` | JWT refresh token expiration | `7d`          |
| `SUPER_ADMIN_PHONE`         | Super admin phone number     | Required      |
| `SUPER_ADMIN_PASSWORD`      | Super admin password         | Required      |

## Technologies Used

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Validation**: Zod
- **Code Quality**: ESLint
- **Architecture**: Modular, MVC pattern

This API is designed with security best practices, including input sanitization and secure token handling. The modular architecture allows for easy extension and maintenance. So, Contributions and issues are welcome via the project repository.
