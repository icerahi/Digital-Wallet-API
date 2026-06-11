#!/bin/bash

# Create branch for API Architecture
git checkout -b feature/api-architecture
git add src/ package.json package-lock.json .env
git commit -m "feat: implement REST Level 3, caching, Swagger, and RapidAPI integration"
git checkout master
git merge feature/api-architecture

# Create branch for Agile Documentation
git checkout -b feature/agile-docs
git add docs/
git commit -m "docs: add Agile requirements, user stories, roles, and presentation"
git checkout master
git merge feature/agile-docs

# Create branch for BDD Testing
git checkout -b feature/bdd-testing
git add features/ cucumber.js
git commit -m "test: add automated BDD End-to-End tests using Cucumber"
git checkout master
git merge feature/bdd-testing

echo "Branching and merging completed successfully!"
