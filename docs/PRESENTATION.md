# Digital Wallet API - Complete Project Presentation

*(Note for Imran: Whenever you see `![Insert Screenshot...]`, take a screenshot on your computer and put it there!)*

````carousel
# Digital Wallet API
### Final Project Presentation

**Team Members:**
- **Augustine**: Product Owner & Scrum Master
- **Emmanuel**: Team Member (QA Specialist)
- **Imran**: Team Member (Backend Developer & Architect)

**Technology Stack:**
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB & Mongoose
- **Testing:** Cucumber.js & Supertest (BDD Framework)
- **Documentation:** Swagger UI

---
<!-- slide -->
# Part 1: Project Management & Agile 
> [!NOTE]
> *Presented by Augustine (Product Owner)*

We managed this project using the Agile Scrum methodology. Our workflow was tracked using a Kanban board in **Trello**.

![Insert Screenshot of your Trello Board here](link-to-your-image.png)

**How we organized the work:**
- We divided the project into **Sprints** (Core Auth, Wallet Logic, Admin Features, QA).
- We used a **TO-DO, IN PROGRESS, DONE** column structure.
- We assigned **Story Points** to tasks based on complexity and volume of work, rather than guessing hours.

---
<!-- slide -->
# Requirements & User Stories
> [!TIP]
> *Presented by Augustine (Product Owner)*

Before writing code, we strictly defined what the system must do. 

**Key Functional Requirements (FR):**
- **FR-01:** System must securely register users and auto-provision a wallet.
- **FR-02:** System must handle P2P money transfers and Agent Cash-ins.
- **FR-03:** System must integrate a public API (RapidAPI).

**User Story Example:**
> **As a** new user  
> **I want** a digital wallet to be automatically created upon registration  
> **So that** I can immediately start making transactions  

---
<!-- slide -->
# Part 2: QA & Automated Testing
> [!IMPORTANT]
> *Presented by Emmanuel (QA Specialist)*

To prove the code works, we used **Behavior-Driven Development (BDD)**. We wrote our tests in plain English using the Gherkin syntax (Given/When/Then) so the Acceptance Criteria is perfectly clear.

**Example Feature File (`wallet.feature`):**
```gherkin
Given a new user with phone "01799999999" and password "Pass@123"
When the user registers
Then the response status should be 201
And a wallet should be automatically provisioned with 50 credits
```

---
<!-- slide -->
# BDD Test Results (End-to-End)
> [!IMPORTANT]
> *Presented by Emmanuel (QA Specialist)*

We built an automated testing suite using `Cucumber.js` and `Supertest`. The tests spin up a temporary database, hit the live API endpoints, and verify the data.

**Live Test Output:**
```bash
> npm run test:e2e

Running BDD Scenarios...
✅ Scenario: A user can register and receive a wallet automatically
✅ Scenario: A user can view live currency exchange rates

2 hooks (2 passed)
2 scenarios (2 passed)
10 steps (10 passed)
0m 1.171s (0m 1.156s executing your code)
```
*Result: 100% of our Acceptance Criteria passed successfully.*

---
<!-- slide -->
# Part 3: Architecture & Development
> [!NOTE]
> *Presented by Imran (Backend Developer)*

We built a highly scalable architecture using **Express & MongoDB**. 

**Non-Functional Requirements Achieved:**
1. **Statelessness:** The server stores zero sessions. All authentication is handled securely via **JWT (JSON Web Tokens)**.
2. **Performance:** Read-only data endpoints return `Cache-Control: public, max-age=300` headers.
3. **Maturity:** The API strictly adheres to **REST Level 3 (HATEOAS)**.

Let's look at the outputs of our Core Features.

---
<!-- slide -->
# Feature Output 1: Registration & Wallet
> [!NOTE]
> *Presented by Imran (Backend Developer)*

When a user registers, a Mongoose `post-save` hook automatically provisions their wallet. Notice the **HATEOAS `links` array** at the bottom, which dynamically tells the client what they can do next!

**API Response (`POST /api/v1/users/register`):**
```json
{
  "statusCode": 201,
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "64f1a2b3c4...",
    "fullname": "Test User",
    "phone": "01799999999",
    "role": "USER"
  }
}
```
*(Database automatically created Wallet with balance: 50)*

---
<!-- slide -->
# Feature Output 2: Fetching the Wallet
> [!NOTE]
> *Presented by Imran (Backend Developer)*

When a user views their wallet, REST Level 3 guides them to their next available actions.

**API Response (`GET /api/v1/wallets/me`):**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "User Wallet retrieved successfully",
  "data": {
    "balance": 50,
    "owner": "64f1a2b3c4..."
  },
  "links": [
    { "href": "/api/v1/wallets/add-money", "rel": "add-money", "type": "POST" },
    { "href": "/api/v1/wallets/withdraw-money", "rel": "withdraw-money", "type": "POST" },
    { "href": "/api/v1/wallets/send-money", "rel": "send-money", "type": "POST" }
  ]
}
```

---
<!-- slide -->
# Feature Output 3: External RapidAPI
> [!NOTE]
> *Presented by Imran (Backend Developer)*

To fulfill the external API integration requirement, we connected to the **RapidAPI Hub**. Our endpoint fetches live currency exchange rates (USD to BDT) securely.

**API Response (`GET /api/v1/external/currency-rates`):**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Exchange rate fetched successfully",
  "data": {
    "from": "USD",
    "to": "BDT",
    "rate": 109.85,
    "last_updated": "2023-10-12T10:00:00Z"
  }
}
```

---
<!-- slide -->
# API Documentation (Swagger)
> [!TIP]
> *Presented by Imran (Backend Developer)*

All of these endpoints are fully documented and interactive using **Swagger UI**.

![Insert Screenshot of your Swagger UI running on localhost:5000/api-docs](link-to-swagger-image.png)

This allows front-end developers, QA testers, and clients to explore the API without needing to look at the source code.

---
<!-- slide -->
# Conclusion

**Summary of Achievements:**
- ✅ **Agile Methodology:** Tracked via Trello & GitHub Branches.
- ✅ **Documentation:** FR, NFR, and BDD User Stories.
- ✅ **Quality Assurance:** Automated E2E testing with Cucumber.
- ✅ **Development:** Robust REST Level 3 Node.js/MongoDB backend.
- ✅ **Integration:** Connected to RapidAPI Hub & documented via Swagger.

Thank you! Are there any questions?
````
