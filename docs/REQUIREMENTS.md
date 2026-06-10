# Requirements Specification

## Functional Requirements (FR)

| ID | Requirement | Acceptance Criteria |
|---|---|---|
| **FR-01** | The system shall accept user and agent registration. | Validated request creates a secure user/agent profile and returns success. |
| **FR-02** | The system shall authenticate users via JWT. | Correct phone and password return an access and refresh token. |
| **FR-03** | The system shall automatically provision a wallet on registration. | A new user account receives a wallet with an initial balance of 50 credits. |
| **FR-04** | The system shall allow users to send money to other users. | Deducts amount from sender and adds to receiver; transaction is logged. |
| **FR-05** | The system shall allow agents to cash-in to user wallets. | Agent balance is deducted, user balance increases; logged as CASH_IN. |
| **FR-06** | The system shall allow admins to view all transactions. | A paginated list of all system transactions is returned to the admin. |
| **FR-07** | The system shall integrate a public RapidAPI service. | An endpoint fetches live data (e.g., currency rates) from RapidAPI. |

---

## Non-Functional Requirements (NFR)

| ID | Requirement | Acceptance Criteria |
|---|---|---|
| **NFR-01** | **Statelessness**: The RESTful API shall be stateless. | JWT is used for all authentication without server-side session storage. |
| **NFR-02** | **Maturity**: The API shall conform to REST Level 3 (HATEOAS). | API responses include `links` array with relational URLs for next actions. |
| **NFR-03** | **Performance (Caching)**: Read-only endpoints shall be cacheable. | `GET` requests return `Cache-Control` headers. |
| **NFR-04** | **Security**: Passwords must be hashed before storage. | Database stores only bcrypt-hashed passwords. |
| **NFR-05** | **Documentation**: The API must be documented using Swagger. | `/api-docs` endpoint serves interactive Swagger UI documentation. |
| **NFR-06** | **Maintainability**: The project must use Agile practices. | Requirements, user stories, and Trello are used to manage tasks. |
