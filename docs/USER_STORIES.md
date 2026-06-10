# User Stories & Acceptance Criteria

This document outlines the core behavior of the Digital Wallet API using Behavior-Driven Development (BDD) format. These stories map directly to our Cucumber automated tests.

---

## User Story 1: Wallet Provisioning

**As a** new user  
**I want** a digital wallet to be automatically created upon registration  
**So that** I can immediately start sending and receiving money

### Acceptance Criteria:
- **Given** I am an unregistered user
- **When** I submit a valid registration payload (name, phone, password, role)
- **Then** the system should return a 201 Created status
- **And** the system should automatically create a wallet linked to my account
- **And** the wallet should have an initial balance of 50 credits

---

## User Story 2: Secure Authentication

**As a** registered user  
**I want** to log in securely with my credentials  
**So that** I can access my wallet and perform transactions

### Acceptance Criteria:
- **Given** I am a registered user with a valid phone and password
- **When** I submit my credentials to the `/api/v1/auth/login` endpoint
- **Then** the system should authenticate me
- **And** return a valid JWT Access Token and Refresh Token

---

## User Story 3: RESTful API Maturity (HATEOAS)

**As a** client application developer  
**I want** API responses to include hypermedia links  
**So that** I can dynamically discover next possible actions (REST Level 3)

### Acceptance Criteria:
- **Given** I am an authenticated user
- **When** I fetch my wallet details from `/api/v1/wallets/me`
- **Then** the JSON response should contain a `links` array
- **And** the links should include references to `add-money`, `withdraw-money`, and `send-money` actions.

---

## User Story 4: External API Integration

**As a** user  
**I want** to view live currency exchange rates  
**So that** I know the value of my wallet balance in other currencies

### Acceptance Criteria:
- **Given** I am a user of the Digital Wallet
- **When** I request `/api/v1/external/currency-rates`
- **Then** the backend should securely fetch data from the RapidAPI hub
- **And** return the current exchange rates to me
