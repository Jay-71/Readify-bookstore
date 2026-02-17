# Readify Bookstore API

A production-structured RESTful Bookstore API built using Node.js and Express. This project demonstrates correct REST design principles, OpenAPI documentation, automated API testing, CI/CD automation, structured logging, and basic monitoring.

---

## Project Overview

This project was developed incrementally to simulate a real backend modernization process. The objective was to transform a minimal API into a structured, testable, and deployable backend service.

Core goals achieved:

* REST-compliant resource design
* Consistent HTTP status code usage
* OpenAPI 3.0 documentation
* Automated Postman testing
* Continuous Integration (CI)
* Continuous Delivery (CD)
* Structured logging
* Basic monitoring endpoints

---

## Architecture Summary

* Runtime: Node.js
* Framework: Express.js
* Data Store: In-memory (array-based)
* Documentation: OpenAPI + Swagger UI
* Testing: Postman + Newman
* CI/CD: GitHub Actions
* Deployment: Render
* Logging: Winston (structured JSON)
* Monitoring: Health + Metrics endpoints

---

## Development Phases

### Phase 1 — Core REST API

Implemented a minimal Express server with in-memory storage.

Endpoints:

* GET /books → List all books
* POST /books → Create a book
* GET /books/:id → Retrieve a book
* PUT /books/:id → Update a book
* DELETE /books/:id → Delete a book
* GET /authors → List unique authors

Books are stored in memory using a simple array. Authors are dynamically derived from books to avoid maintaining a separate author store.

---

### Phase 2 — OpenAPI Documentation

Integrated OpenAPI 3.0 specification via `openapi.yaml`.

Interactive documentation available at:

```
http://localhost:3000/docs
```

Documentation includes:

* Endpoint definitions
* Request/response schemas
* Required fields
* HTTP status codes
* Error responses

---

### Phase 3 — Automated Testing (Postman)

Created a Postman collection covering:

* Full CRUD lifecycle (Create → Retrieve → Update → Delete)
* Validation error handling
* Status code verification

Collection exported as:

```
postman_collection.json
```

Newman CLI added for automation:

```
npm install --save-dev newman
```

Package.json scripts:

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

GitHub Actions workflow:

```
.github/workflows/ci.yml
```

Pipeline stages:

1. Checkout repository
2. Install dependencies
3. Start server
4. Execute Postman tests using Newman
5. Fail build if any test fails

Triggers:

* Push to `main`
* Pull requests targeting `main`

---

### Phase 5 — Continuous Delivery (CD)

Deployment automated using Render deploy hook.

Deployment runs only if:

* All CI tests pass
* Commit is pushed to `main`

Secure deployment configured via GitHub Secrets.

---

### Phase 6 — Structured Logging

Integrated Winston for structured JSON logging.

Features:

* Timestamped log entries
* Request lifecycle logging
* Error logging
* Console and file output (`app.log`)

Each request logs:

* HTTP method
* Request URL
* Status code
* Response time

---

### Phase 7 — Basic Monitoring

Added internal monitoring endpoints.

#### Health Check

```
GET /health
```

Returns:

* Service status
* Uptime
* Timestamp

#### Metrics Endpoint

```
GET /metrics
```

Returns:

* Total request count
* Uptime (seconds)
* Memory usage
* CPU usage

Provides lightweight observability without external monitoring tools.

---

## Live Deployment

Base URL:

```
https://readify-bookstore-deh9.onrender.com
```

Swagger Documentation:

```
https://readify-bookstore-deh9.onrender.com/docs
```

Health Check:

```
https://readify-bookstore-deh9.onrender.com/health
```

Metrics Endpoint:

```
https://readify-bookstore-deh9.onrender.com/metrics
```

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

### Health Check

```
curl http://localhost:3000/health
```

### Metrics

```
curl http://localhost:3000/metrics
```

---

## CI/CD Pipeline Overview

The GitHub Actions pipeline performs:

* Dependency installation
* Server startup
* Automated Postman test execution
* Conditional deployment to Render

This ensures:

* Regression prevention
* Build reliability
* Automated delivery

---

## Logging

Structured logging implemented using Winston.

Log outputs:

* Console
* `app.log` file

Logs are formatted as JSON for compatibility with log aggregation systems.

---

## Current System Characteristics

* RESTful design with consistent URI structure
* Automated API validation
* Documented contract via OpenAPI
* Continuous integration and deployment
* Structured request logging
* Basic operational monitoring

---


