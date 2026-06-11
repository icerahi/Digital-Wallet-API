# Digital Wallet API - Complete Technical Showcase

*(Note for Imran: Whenever you see `[Visual: ...]`, take a screenshot on your computer and put it there!)*

````carousel
# Digital Wallet API
### Complete Technical Showcase
Advanced RESTful Architecture & BDD Quality Assurance
MD IMRAN HASAN | 2026-06-10

> [!TIP]
> **AI Note:** Enhance this title slide to sound highly academic and professional. CRITICAL DESIGN INSTRUCTION: Use a clean, crisp, white or light-colored background. DO NOT use a black or dark background anywhere in this presentation.

---
<!-- slide -->
# Agile Scrum Team Structure

- **Augustine (Product Owner & Scrum Master):** Managed Product Backlog, Sprints, and Agile workflows.
- **Emmanuel (QA Specialist):** Engineered the BDD testing framework and automated all Acceptance Criteria.
- **Imran (Backend Developer):** Designed database schemas, core API architecture, and Swagger documentation.

> [!TIP]
> **AI Note:** Enhance the descriptions of these roles to emphasize cross-functional collaboration and strict adherence to Scrum principles. Keep background light.

---
<!-- slide -->
# Managing Sprints with Trello

*[Visual: Insert Screenshot of your Trello Board]*

We divided the project into 6 Sprints. Tasks were tracked using a Kanban system (TO DO, IN PROGRESS, DONE). Tasks were prioritized based on technical complexity and assigned directly to the responsible team member.

> [!TIP]
> **AI Note:** Expand on the benefits of visual Kanban boards for tracking project velocity and ensuring no requirements are missed during the sprint.

---
<!-- slide -->
# Collaborative Development via GitHub

*[Visual: Insert Screenshot of your GitHub repository's "Branches" or "Commit History" page showing the different feature branches]*

- **Repository:** Project hosted securely on GitHub.
- **Isolation:** We utilized strict feature branches to isolate our work (e.g., `feature/api-architecture`, `feature/bdd-testing`).
- **Collaboration:** Each team member committed their own code under their respective roles to avoid conflicts.
- **Integration:** Code was reviewed and merged safely into the `master` branch only after passing QA criteria.

> [!TIP]
> **AI Note:** Emphasize how this branching strategy prevented code conflicts, maintained an unbroken master branch, and allowed the QA specialist to test features in isolation before production.

---
<!-- slide -->
# Functional Requirements (FR)

- **FR-01 (RBAC):** System supports three roles: USER, AGENT, and ADMIN.
- **FR-02 (Provisioning):** Secure registration with automatic digital wallet creation.
- **FR-03 (Transactions):** P2P Send Money (User to User) and Cash-In/Cash-Out (Agent to User).
- **FR-04 (External Data):** Live currency exchange data via RapidAPI proxy.

> [!TIP]
> **AI Note:** Enhance this slide by emphasizing how Role-Based Access Control (RBAC) secures the financial ecosystem.

---
<!-- slide -->
# Non-Functional Requirements (NFR)

- **NFR-01 (Security):** 100% Stateless server using JWT. Bcrypt password hashing.
- **NFR-02 (Architecture):** Conform to Richardson Maturity Model REST Level 3 (HATEOAS).
- **NFR-03 (Performance):** Implement `Cache-Control` strategies for read-only routes.

> [!TIP]
> **AI Note:** Expand on why statelessness and REST Level 3 are critical for building scalable, enterprise-grade APIs.

---
<!-- slide -->
# User Story 1 - Registration & Auto-Provisioning

**Story:** "As a new user, I want a digital wallet to be automatically created upon registration, so that I can immediately start making transactions."

**Acceptance Criteria:** 
- GIVEN valid registration details
- WHEN the user submits the request
- THEN response status is 201 Created AND a wallet with 50 credits is created in the DB.

> [!TIP]
> **AI Note:** Format the Given/When/Then text to look like a strict technical contract between the Product Owner and the Developer.

---
<!-- slide -->
# User Story 2 - P2P Transactions

**Story:** "As a User, I want to securely send money to my friends, so that we can share expenses."

**Acceptance Criteria:**
- GIVEN the user has sufficient balance
- WHEN the user triggers `/send-money`
- THEN the sender's balance decreases, the recipient's increases, AND an immutable transaction log is saved.

> [!TIP]
> **AI Note:** Enhance the explanation of this user story to highlight the importance of ACID compliance in financial transactions.

---
<!-- slide -->
# User Story 3 - Agent Cash-In

**Story:** "As an Agent, I want to cash-in money to a User's wallet, so that they can convert physical cash to digital credits."

**Acceptance Criteria:**
- GIVEN the logged-in user has the role of 'AGENT'
- WHEN they trigger the cash-in endpoint
- THEN the user's digital wallet balance increases successfully.

> [!TIP]
> **AI Note:** Emphasize how Role-Based Access Control (RBAC) ensures a normal user cannot trigger this Agent-only feature.

---
<!-- slide -->
# Behavior-Driven Development (BDD)

The QA Specialist implemented BDD to ensure the API met the Acceptance Criteria automatically. We utilized **Cucumber.js** for Gherkin syntax parsing, **Supertest** for HTTP execution, and **Chai** for assertions.

> [!TIP]
> **AI Note:** Explain how BDD bridges the gap between business requirements (English) and technical testing (Code).

---
<!-- slide -->
# Writing Executable Specifications

```gherkin
Feature: User Authentication & Wallet
Scenario: A user receives a wallet automatically
  Given a new user with phone "01799999999" and password "Pass@123"
  When the user registers
  Then the response status should be 201
```

> [!TIP]
> **AI Note:** Enhance the slide to highlight the clarity of Gherkin syntax and how it acts as living documentation. Ensure any code blocks have a light background theme.

---
<!-- slide -->
# Connecting English to Code (Step Definitions)

*[Visual: Insert Screenshot of your api.steps.ts file]*

Supertest spins up a temporary database, hits the live API routing logic, and verifies the database state to ensure the Gherkin scenarios are perfectly accurate.

> [!TIP]
> **AI Note:** Add speaker notes explaining how automated API testing prevents regression bugs during Agile sprints.

---
<!-- slide -->
# Exhaustive E2E Test Results

*[Visual: Insert Screenshot of the terminal showing green checkmarks after running npm run test:e2e]*

- ✅ Scenario: User registration and wallet creation
- ✅ Scenario: Secure JWT login
- ✅ Scenario: Wallet balance retrieval
- ✅ Scenario: RapidAPI currency exchange fetching

**Result:** 4 Scenarios passed, 18 Steps passed. 100% QA Success.

> [!TIP]
> **AI Note:** Make the test results look like a victorious milestone, proving the system is robust and ready for production.

---
<!-- slide -->
# Backend Technology Stack

- **Node.js & Express:** Scalable, event-driven web server.
- **TypeScript:** Strict type safety for financial data.
- **MongoDB & Mongoose:** Flexible NoSQL persistence with strict schemas.

> [!TIP]
> **AI Note:** Write a compelling bullet point for each technology explaining why it was chosen (e.g., TypeScript for type safety in financial apps).

---
<!-- slide -->
# MongoDB Schema Relationships

- **User Model:** Secures passwords via Bcrypt.
- **Wallet Model:** Uses `ownerID: Ref<User>` to strictly link wallets to identities.
- **Transaction Model:** Uses `sender: Ref<Wallet>` and `recipient: Ref<Wallet>` to create an immutable financial ledger.

> [!TIP]
> **AI Note:** Enhance the explanation of NoSQL relational references and why an immutable transaction ledger is crucial for a wallet app.

---
<!-- slide -->
# Securing the API (Stateless JWT)

*[Visual: Insert Screenshot of Postman showing Authorization: Bearer <token>]*

The server achieves complete statelessness (NFR-01). Users receive encrypted Access and Refresh tokens upon login, which are mathematically verified on every subsequent request via custom Express middleware.

> [!TIP]
> **AI Note:** Expand on the scalability benefits of stateless JWT authentication compared to traditional session cookies.

---
<!-- slide -->
# Performance Caching Middleware

```typescript
res.set('Cache-Control', 'public, max-age=300');
```

To fulfill performance criteria (NFR-03), we created middleware that injects high-performance `Cache-Control` headers into read-only GET requests, reducing database I/O load.

> [!TIP]
> **AI Note:** Explain how caching saves server resources during high-traffic spikes.

---
<!-- slide -->
# Achieving REST Level 3

The API strictly adheres to Hypermedia as the Engine of Application State (HATEOAS). Responses dynamically provide relational URLs (`links` array) for full discoverability, guiding the client to the next allowed actions.

> [!TIP]
> **AI Note:** Explain the Richardson Maturity Model and why Level 3 is the ultimate standard for professional API design.

---
<!-- slide -->
# Feature Showcase: Registration & Provisioning

```json
{
  "data": { "fullname": "Test User", "role": "USER" },
  "links": [ { "rel": "login", "href": "/api/v1/auth/login", "type": "POST" } ]
}
```
Mongoose `post-save` hooks orchestrate the wallet creation automatically.

> [!TIP]
> **AI Note:** Point out that the HATEOAS link dynamically tells the newly registered user to navigate to the login route. Use a light theme for code blocks.

---
<!-- slide -->
# Feature Showcase: Wallet Retrieval

```json
{
  "data": { "balance": 50, "owner": "64f1a..." },
  "links": [
    { "rel": "send-money", "href": "/api/v1/wallets/send-money" },
    { "rel": "transaction-history", "href": "/api/v1/transactions" }
  ]
}
```

> [!TIP]
> **AI Note:** Emphasize how a frontend app can just read the links array to automatically generate UI buttons for the user.

---
<!-- slide -->
# Feature Showcase: Secure P2P Transfers

```json
{ "data": { "transactionId": "TXN-77291", "amount": 25, "newBalance": 25 } }
```
Logic validates sufficient balance, prevents self-transfers, and updates both wallets atomically.

> [!TIP]
> **AI Note:** Enhance the speaker notes to explain atomic database updates preventing lost money during server crashes.

---
<!-- slide -->
# Feature Showcase: Admin Privileges

Admins have exclusive endpoints to monitor the system, such as `GET /api/v1/admin/users`. RBAC middleware ensures standard users and agents receive a 403 Forbidden error if they attempt to access this.

> [!TIP]
> **AI Note:** Highlight the security architecture of the Admin role.

---
<!-- slide -->
# RapidAPI Integration

```json
{ "data": { "from": "USD", "to": "BDT", "rate": 109.85 } }
```
To fulfill the external API requirement, the backend acts as a secure proxy, using Axios to fetch live conversion rates from the RapidAPI Hub without exposing the secret API keys to the frontend.

> [!TIP]
> **AI Note:** Explain the security benefit of proxying third-party APIs through the backend rather than calling them directly from the frontend.

---
<!-- slide -->
# Interactive OpenAPI Documentation

*[Visual: Insert Screenshot of http://localhost:5000/api-docs showing Swagger UI]*

The entire system is documented using Swagger UI. By parsing JSDoc comments, we generated an interactive OpenAPI specification that allows front-end developers to test endpoints directly in the browser.

> [!TIP]
> **AI Note:** Enhance the slide by explaining how Swagger serves as a live contract between Backend and Frontend teams.

---
<!-- slide -->
# Final Project Summary

- ✅ Full Agile Scrum Lifecycle managed via Trello & GitHub.
- ✅ Advanced User Stories & 100% BDD Automation Pass Rate.
- ✅ Node.js, MongoDB, Stateless JWT, Caching, & Error Handling.
- ✅ REST Level 3 (HATEOAS) & Complex RBAC Logic (User/Agent/Admin).
- ✅ RapidAPI Integration & Swagger OpenAPI Docs.

> [!TIP]
> **AI Note:** Write a powerful, professional closing statement summarizing that the team successfully built an enterprise-grade financial API.
````
