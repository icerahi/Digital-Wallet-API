# 💼 Digital Wallet API

Welcome to the Digital Wallet API, secure and modular backend system built with **Node.js**, **Express.js**, and **Mongoose**, inspired by services like **Bkash** and **Nagad**. This API enables the creation of a robust digital wallet solution with support for **users**, **agents**, and **administrators**.

---

## 🚀 Overview

This API provides a scalable foundation for a digital wallet system. It includes:

- Secure authentication & authorization
- Role-based access control
- Wallet creation and management
- Transaction tracking and processing
- Modular, maintainable architecture with TypeScript

---

## ✨ Features

### 🔐 Core System

- **JWT Authentication** with access & refresh tokens
- **Password Security** via bcrypt hashing
- **Role-Based Access Control**: User, Agent, Admin
- **Auto Wallet Creation**: Wallet initialized with 50 credits upon registration
- **Transaction Logging**: Full traceability for all operations

### 👤 User Features

- **User Profile Management**: Get user details, update profile, and change password
- **Add Money**: Top-up wallet (e.g., from bank or card)
- **Withdraw Money**: Transfer to external accounts (e.g., ATM, bank)
- **Send Money**: Transfer funds to another user via phone number
- **View Transactions**: Paginated, filterable history (including by date range)

### 🧾 Agent Features

- **Cash-In**: Add funds to a user’s wallet
- **Cash-Out**: Withdraw from a user’s wallet

### 🛠️ Admin Features

- **Full Visibility**: Monitor users, agents, wallets, and transactions
- **Account Control**: Block/unblock wallets, approve/suspend agents
- **Financial Monitoring**: Filter and sort transactions, wallets, users
- **Transaction Oversight**: Review and update statuses

---

## 📚 API Reference

### 🔑 Authentication

| Method | Endpoint                     | Description       | Access        |
| ------ | ---------------------------- | ----------------- | ------------- |
| POST   | `/api/v1/auth/login`         | Login             | Public        |
| POST   | `/api/v1/auth/logout`        | Logout            | Authenticated |
| POST   | `/api/v1/auth/refresh-token` | Refresh JWT token | Authenticated |

**Login Request:**

```json
{
  "phone": "01700000000",
  "password": "Password@123"
}
```

---

### 👥 User Management

| Method | Endpoint                          | Description             | Access        | Query Parameters                         |
| ------ | --------------------------------- | ----------------------- | ------------- | ---------------------------------------- |
| POST   | `/api/v1/users/register`          | Register new user/agent | Public        | -                                        |
| GET    | `/api/v1/users/me`                | Get own user profile    | Authenticated | -                                        |
| PATCH  | `/api/v1/users/update`            | Update own user profile | Authenticated | -                                        |
| PATCH  | `/api/v1/users/change-password`   | Change own password     | Authenticated | -                                        |
| GET    | `/api/v1/users/all-users`         | Get all users           | Admin         | `role`, `phone`, `sort`, `page`, `limit` |
| GET    | `/api/v1/users/:id`               | Get user by ID          | Admin         | -                                        |
| PATCH  | `/api/v1/users/approve-agent/:id` | Approve agent role      | Admin         | -                                        |
| PATCH  | `/api/v1/users/suspend-agent/:id` | Revoke agent role       | Admin         | -                                        |

**Registration Request:**

```json
{
  "fullname": "Imran",
  "phone": "01700000000",
  "password": "Password@123",
  "role": "AGENT"
}
```

---

### 💳 Wallet Operations

| Method | Endpoint                         | Description                      | Access     | Query Parameters                             |
| ------ | -------------------------------- | -------------------------------- | ---------- | -------------------------------------------- |
| GET    | `/api/v1/wallets/me`             | View own wallet                  | User/Agent | -                                            |
| POST   | `/api/v1/wallets/add-money`      | Add funds to own wallet          | User/Agent | -                                            |
| POST   | `/api/v1/wallets/withdraw-money` | Withdraw from own wallet         | User       | -                                            |
| POST   | `/api/v1/wallets/send-money`     | Send money to another user       | User       | -                                            |
| POST   | `/api/v1/wallets/cash-in`        | Agent adds money to user wallet  | Agent      | -                                            |
| POST   | `/api/v1/wallets/cash-out`       | Agent withdraws from user wallet | Agent      | -                                            |
| GET    | `/api/v1/wallets/all`            | Get all wallets                  | Admin      | `isBlocked`,`phone`, `sort`, `page`, `limit` |
| PATCH  | `/api/v1/wallets/block/:id`      | Block a wallet                   | Admin      | -                                            |
| PATCH  | `/api/v1/wallets/unblock/:id`    | Unblock a wallet                 | Admin      | -                                            |
| GET    | `/api/v1/wallets/:id`            | Get wallet by ID                 | Admin      | -                                            |

**Add/Withdraw Request:**

```json
{ "amount": 50 }
```

**Send/Cash-In Request:**

```json
{
  "receiver": "01XXXXXXXXX",
  "amount": 50
}
```

**Cash-Out Request:**

```json
{
  "sender": "01XXXXXXXXX",
  "amount": 50
}
```

---

### 📈 Transaction Management

| Method | Endpoint                   | Description               | Access     | Query Parameters                                            |
| ------ | -------------------------- | ------------------------- | ---------- | ----------------------------------------------------------- |
| GET    | `/api/v1/transactions/me`  | Get own transaction logs  | User/Agent | `type`, `from`, `to`, `sort`, `page`, `limit`               |
| GET    | `/api/v1/transactions/all` | Get all transactions      | Admin      | `type`, `sender`, `receiver`, `from`, `to`, `sort`, `page`, `limit` |
| GET    | `/api/v1/transactions/:id` | Get transaction by ID     | Admin      | -                                                           |
| PATCH  | `/api/v1/transactions/:id` | Update transaction status | Admin      | -                                                           |

**Status Update Request:**

```json
{ "status": "REVERSED" }
```

---

## 🧱 Project Structure

```
src/
├── app.ts                 # Express app configuration
├── server.ts              # Server bootstrap
├── config/                # Env and config
├── helpers/               # Custom errors/utilities
├── interfaces/            # TypeScript types/interfaces
├── middlewares/           # Middleware functions
├── modules/               # Core features (auth, user, wallet, transaction)
├── routes/                # API route definitions
└── utils/                 # Utility functions (token, response, etc.)
```

---

## ⚙️ Setup & Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/icerahi/Digital-Wallet-API.git
   cd Digital-Wallet-API
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory and add the required variables.

---

## 🏃 Running the App

- **Development**:

  ```bash
  npm run dev
  ```

- **Production**:

  ```bash
  npm run build
  npm start
  ```

---

## 🧪 Environment Variables

| Variable                    | Description                  | Default       |
| --------------------------- | ---------------------------- | ------------- |
| `PORT`                      | Server port                  | `5000`        |
| `DB_URL`                    | MongoDB connection string    | Required      |
| `NODE_ENV`                  | Environment (e.g., `dev`)    | `development` |
| `FRONTEND_URL`              | Frontend URL for CORS        | Required      |
| `BCRYPT_SALT_ROUND`         | Salt rounds for bcrypt       | `12`          |
| `JWT_ACCESS_TOKEN_SECRET`   | Access token secret key      | Required      |
| `JWT_ACCESS_TOKEN_EXPIRES`  | Access token expiry duration | `15m`         |
| `JWT_REFRESH_TOKEN_SECRET`  | Refresh token secret key     | Required      |
| `JWT_REFRESH_TOKEN_EXPIRES` | Refresh token expiry         | `7d`          |
| `SUPER_ADMIN_PHONE`         | Default admin phone          | Required      |
| `SUPER_ADMIN_PASSWORD`      | Default admin password       | Required      |

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT, bcrypt
- **Validation**: Zod
- **Dev Tools**: ESLint, Nodemon
- **Architecture**: Modular MVC
