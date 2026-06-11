# Complete Trello Board (Digital Wallet API)

Here is the exhaustive, complete list of Trello cards that covers the *entire* lifecycle of building your Digital Wallet API, from initial planning to final testing. Copy these into your Trello board.

## List: TO DO / BACKLOG

*(Move these to "In Progress" or "Done" depending on what you want to show the teacher as currently active vs finished).*

### Sprint 1: Planning & Architecture
**Card 1: Define Agile Requirements & User Stories**
- **Description:** Draft the Functional Requirements, Non-Functional Requirements, and User Stories using the `As a... I want to... So that...` format.
- **Assigned to:** Augustine (Product Owner)

**Card 2: Database Schema Design**
- **Description:** Design the MongoDB schemas for User, Wallet, and Transaction models.
- **Assigned to:** Imran (Backend Developer)

**Card 3: Setup Node.js/Express Project**
- **Description:** Initialize GitHub repository, set up TypeScript, ESLint, and Mongoose connection.
- **Assigned to:** Imran (Backend Developer)

### Sprint 2: Core Authentication
**Card 4: Implement User Registration**
- **Description:** Create the `/api/v1/users/register` endpoint. Hash passwords using bcrypt.
- **Assigned to:** Imran (Backend Developer)

**Card 5: Auto-Provision Digital Wallet**
- **Description:** Add a Mongoose post-save hook to automatically create a wallet with 50 credits when a new user registers.
- **Assigned to:** Imran (Backend Developer)

**Card 6: Implement JWT Login**
- **Description:** Create the `/api/v1/auth/login` endpoint. Issue Access and Refresh tokens.
- **Assigned to:** Imran (Backend Developer)

### Sprint 3: Wallet Transactions (Core Business Logic)
**Card 7: Add Money Feature**
- **Description:** Create `/api/v1/wallets/add-money` for users to top-up their wallets.
- **Assigned to:** Imran (Backend Developer)

**Card 8: Send Money Feature (P2P)**
- **Description:** Create `/api/v1/wallets/send-money`. Ensure logic prevents sending money to oneself and checks for sufficient balance.
- **Assigned to:** Imran (Backend Developer)

**Card 9: Withdraw Money Feature**
- **Description:** Create `/api/v1/wallets/withdraw-money` endpoint to deduct funds.
- **Assigned to:** Imran (Backend Developer)

### Sprint 4: Agent & Admin Features
**Card 10: Agent Cash-In / Cash-Out**
- **Description:** Implement logic for Agents to Cash-In to users and users to Cash-Out from agents.
- **Assigned to:** Imran (Backend Developer)

**Card 11: Admin User Management**
- **Description:** Implement routes for Admins to view all users, approve Agents, and suspend Agents.
- **Assigned to:** Imran (Backend Developer)

**Card 12: Admin Wallet Management**
- **Description:** Implement routes for Admins to block and unblock user wallets.
- **Assigned to:** Imran (Backend Developer)

**Card 13: Transaction Logging System**
- **Description:** Ensure every financial action creates an immutable log in the Transactions collection. Create endpoints to view history.
- **Assigned to:** Imran (Backend Developer)

### Sprint 5: API Compliance & Third-Party Integration
**Card 14: REST Level 3 Compliance (HATEOAS)**
- **Description:** Update the API response utility to include a `links` array so clients know what actions they can take next. 
- **Assigned to:** Imran (Backend Developer)

**Card 15: Implement Caching (Performance)**
- **Description:** Implement a `Cache-Control` middleware for read-only (GET) routes.
- **Assigned to:** Imran (Backend Developer)

**Card 16: External RapidAPI Integration**
- **Description:** Integrate a live Currency Exchange API from RapidAPI Hub and create a new endpoint `/api/v1/external/currency-rates`.
- **Assigned to:** Imran (Backend Developer)

### Sprint 6: Quality Assurance & Documentation
**Card 17: BDD Acceptance Testing Framework Setup**
- **Description:** Install Cucumber.js, Supertest, and Chai. Write `.feature` files using Gherkin syntax (Given/When/Then).
- **Assigned to:** Emmanuel (QA Specialist)

**Card 18: Write & Execute Automated E2E Tests**
- **Description:** Implement the step definitions for Authentication, Wallet Provisioning, and External API. Run `npm run test:e2e` to verify.
- **Assigned to:** Emmanuel (QA Specialist)

**Card 19: Swagger API Documentation**
- **Description:** Install `swagger-jsdoc` and `swagger-ui-express`. Document all core endpoints for interactive exploration.
- **Assigned to:** Imran (Backend Developer)

**Card 20: Final Review & Project Presentation Prep**
- **Description:** Ensure all branches are merged to `master`. Review Agile docs, run tests, and rehearse the presentation script.
- **Assigned to:** Augustine (Product Owner)
