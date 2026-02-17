# Readify Bookstore API

A production-structured RESTful Bookstore API built using Node.js and Express. The project demonstrates proper REST design, OpenAPI documentation, automated testing, CI/CD deployment, and structured logging.

---

## Project Overview

This project was developed incrementally to simulate a real backend modernization effort. The goal was to transform a basic API into a production-ready service with:

* REST-compliant endpoints
* Proper HTTP status codes
* OpenAPI documentation
* Automated API testing
* CI/CD pipeline
* Deployment automation
* Structured logging

---

## Development Phases

### Phase 1 — Core REST API

Implemented a minimal Express server with in-memory storage.

Endpoints:

* GET /books → List books
* POST /books → Create book
* GET /books/:id → Retrieve book
* PUT /books/:id → Update book
* DELETE /books/:id → Delete book
* GET /authors → List unique authors

Books are stored in memory using a simple array. Authors are dynamically extracted from books to avoid maintaining separate storage.

---

### Phase 2 — OpenAPI Documentation

Added OpenAPI 3.0 specification (`openapi.yaml`) and Swagger UI.

Interactive documentation available at:

```
http://localhost:3000/docs
```

The documentation includes:

* Endpoint definitions
* Request/response schemas
* HTTP status codes
* Validation requirements

---

### Phase 3 — Automated Testing (Postman)

Created a Postman collection covering:

* Full CRUD flow (Create → Retrieve → Update → Delete)
* Validation error handling
* Status code verification

Exported collection as:

```
postman_collection.json
```

Installed Newman CLI for automation:

```
npm install --save-dev newman
```

Added test script:

```json
"scripts": {
  "start": "node server.js",
  "test": "newman run postman_collection.json"
}
```

Run tests locally:

```
npm test
```

---

### Phase 4 — Continuous Integration (CI)

Implemented GitHub Actions pipeline:

```
.github/workflows/ci.yml
```

Pipeline stages:

1. Install dependencies
2. Start server
3. Run automated Postman tests
4. Fail build if tests fail

Triggered on:

* Push to main branch
* Pull requests targeting main

---

### Phase 5 — Continuous Delivery (CD)

Added deployment stage using Render deploy hook.

Deployment executes only if:

* All tests pass
* Push is to main branch

Secure deployment handled via GitHub Secrets.

---

### Phase 6 — Structured Logging

Integrated Winston logging.

Features:

* JSON structured logs
* Timestamped entries
* Request lifecycle logging
* Error logging
* Console and file output (`app.log`)

Each request logs:

* HTTP method
* URL
* Status code
* Response time

---

## Installation

Clone repository:

```
git clone <repository-url>
cd readify-bookstore
```

Install dependencies:

```
npm install
```

Start server:

```
npm start
```

Server runs at:

```
http://localhost:3000
```

---

## API Usage Examples

### Create Book

```
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Clean Code","author":"Robert Martin"}'
```

### List Books

```
curl http://localhost:3000/books
```

### Get Book by ID

```
curl http://localhost:3000/books/1
```

### Update Book

```
curl -X PUT http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title","author":"Updated Author"}'
```

### Delete Book

```
curl -X DELETE http://localhost:3000/books/1
```

### List Authors

```
curl http://localhost:3000/authors
```

---

## Testing

Execute automated tests:

```
npm test
```

Test coverage includes:

* Create → Retrieve → Update → Delete flow
* Validation error handling
* Status code verification

---

## CI/CD Pipeline

The GitHub Actions pipeline performs:

* Dependency installation
* Server startup
* Automated Postman test execution
* Deployment (if tests pass and branch is main)

Ensures regression prevention and reliable deployment.

---

## Logging

Structured logging implemented using Winston.

Log outputs:

* Console
* app.log file

Logs contain structured JSON entries for request tracking and debugging.

---

## Current Architecture

* Node.js + Express
* In-memory data store
* RESTful API design
* OpenAPI documentation
* Postman automated tests
* GitHub Actions CI/CD
* Render deployment
* Structured logging

---
