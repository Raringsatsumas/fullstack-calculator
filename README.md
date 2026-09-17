# Full-Stack Calculator

A full-stack calculator application built with **React, TypeScript, and FastAPI**.

The application allows users to perform basic arithmetic operations through a responsive React interface. Mathematical operations are processed by a backend REST API, keeping the presentation layer separated from the business logic.

The solution was intentionally designed to remain simple, maintainable, testable, and aligned with the requirements of the technical assessment.

---

## Features

The calculator currently supports:

- Addition
- Subtraction
- Multiplication
- Division
- Decimal numbers
- Negative results
- Division-by-zero validation
- Backend input validation
- Frontend error handling
- Responsive interface
- REST API communication
- Unit and integration tests

Optional operations such as exponentiation, square root, and percentage can be added following the same architecture.

---

# Architecture

The application is organized as a monorepo containing two independent applications:

```text
                    User
                      |
                      v
              React + TypeScript
                      |
                      | REST / JSON
                      v
                  FastAPI
                      |
                      v
             CalculatorService
```

The responsibilities are separated as follows:

```text
Frontend
|
|-- User interface
|-- User interaction
|-- Basic client-side validation
|-- Error presentation
|-- API communication
|
Backend
|
|-- Request validation
|-- REST API
|-- Business rules
|-- Mathematical operations
|-- Domain errors
|-- JSON responses
```

The frontend does not perform the final calculation. It sends the operands and selected operation to the backend API, which performs the calculation and returns the result.

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Fetch API
- Vitest
- React Testing Library
- Testing Library User Event
- OxLint

## Backend

- Python 3.12
- FastAPI
- Pydantic
- Uvicorn
- Pytest
- HTTPX

---

# Project Structure

```text
fullstack-calculator/
|
|-- backend/
|   |
|   |-- app/
|   |   |
|   |   |-- api/
|   |   |   `-- calculations.py
|   |   |
|   |   |-- core/
|   |   |   |-- exceptions.py
|   |   |   `-- exception_handlers.py
|   |   |
|   |   |-- schemas/
|   |   |   |-- calculation.py
|   |   |   `-- error.py
|   |   |
|   |   |-- services/
|   |   |   `-- calculator_service.py
|   |   |
|   |   `-- main.py
|   |
|   |-- tests/
|   |   |
|   |   |-- integration/
|   |   |   |-- test_health.py
|   |   |   `-- test_calculations_api.py
|   |   |
|   |   `-- unit/
|   |       `-- test_calculator_service.py
|   |
|   `-- requirements.txt
|
|-- frontend/
|   |
|   |-- src/
|   |   |
|   |   |-- components/
|   |   |   `-- Calculator/
|   |   |       |-- Calculator.tsx
|   |   |       |-- Calculator.css
|   |   |       |
|   |   |       `-- __tests__/
|   |   |           `-- Calculator.test.tsx
|   |   |
|   |   |-- services/
|   |   |   |-- calculatorApi.ts
|   |   |   |
|   |   |   `-- __tests__/
|   |   |       `-- calculatorApi.test.ts
|   |   |
|   |   |-- test/
|   |   |   `-- setup.ts
|   |   |
|   |   |-- types/
|   |   |   `-- calculator.ts
|   |   |
|   |   |-- App.tsx
|   |   |-- App.css
|   |   |-- index.css
|   |   `-- main.tsx
|   |
|   |-- .env.example
|   |-- package.json
|   `-- vite.config.ts
|
|-- .gitignore
|-- PROMPTS.md
`-- README.md
```

---

# Requirements

Before running the application, make sure the following tools are installed:

```text
Python 3.12+
Node.js
npm
Git
```

You can verify your installed versions with:

```bash
python --version
node --version
npm --version
git --version
```

The backend was developed using **Python 3.12**.

---

# Getting Started

## 1. Clone the repository

Clone the repository and navigate into the project directory:

```bash
git clone <repository-url>
cd fullstack-calculator
```

Replace `<repository-url>` with the URL of this repository.

---

# Backend Setup

## 2. Create the Python virtual environment

From the project root:

```bash
python -m venv .venv
```

If multiple Python versions are installed on Windows, Python 3.12 can be explicitly selected with:

```powershell
py -3.12 -m venv .venv
```

---

## 3. Activate the virtual environment

### Windows PowerShell

```powershell
.\.venv\Scripts\Activate.ps1
```

After activation, the terminal should display something similar to:

```text
(.venv) PS ...\fullstack-calculator>
```

Verify the Python version:

```powershell
python --version
```

Expected:

```text
Python 3.12.x
```

---

## 4. Install backend dependencies

From the project root:

```powershell
python -m pip install -r backend\requirements.txt
```

Alternatively:

```bash
pip install -r backend/requirements.txt
```

---

## 5. Start the backend

Navigate to the backend directory:

```powershell
cd backend
```

Start FastAPI with Uvicorn:

```powershell
python -m uvicorn app.main:app --reload
```

The API will be available at:

```text
http://localhost:8000
```

---

## 6. Verify the backend

Open:

```text
http://localhost:8000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

---

## 7. Open the API documentation

FastAPI automatically generates interactive OpenAPI documentation.

Swagger UI:

```text
http://localhost:8000/docs
```

From this page, the calculator API can be tested without running the React frontend.

---

# Frontend Setup

Keep the backend running and open a second terminal.

## 8. Navigate to the frontend

From the project root:

```powershell
cd frontend
```

---

## 9. Install frontend dependencies

```powershell
npm install
```

---

## 10. Configure the frontend environment

The frontend uses an environment variable to determine the backend URL.

An example file is provided:

```text
frontend/.env.example
```

Create:

```text
frontend/.env
```

with:

```env
VITE_API_URL=http://localhost:8000
```

The `.env` file is intentionally excluded from Git.

The `.env.example` file is included in the repository as documentation of the required environment variables.

---

## 11. Start the frontend

Run:

```powershell
npm run dev
```

Vite will display an address similar to:

```text
http://localhost:5173
```

Open it in the browser.

---

# Running the Complete Application

Two processes must be running simultaneously.

## Terminal 1 — Backend

```powershell
cd fullstack-calculator

.\.venv\Scripts\Activate.ps1

cd backend

python -m uvicorn app.main:app --reload
```

Backend:

```text
http://localhost:8000
```

## Terminal 2 — Frontend

```powershell
cd fullstack-calculator\frontend

npm run dev
```

Frontend:

```text
http://localhost:5173
```

The communication flow is:

```text
Browser
   |
   v
React
   |
   | POST /api/v1/calculations
   v
FastAPI
   |
   v
CalculatorService
   |
   v
JSON response
   |
   v
React display
```

---

# API Documentation

## Calculate

Performs a mathematical operation.

### Endpoint

```http
POST /api/v1/calculations
```

### Content Type

```http
Content-Type: application/json
```

---

# Supported Operations

The currently supported operation values are:

```text
add
subtract
multiply
divide
```

---

# Addition Example

## Request

```json
{
  "operation": "add",
  "a": 10,
  "b": 5
}
```

## Response

HTTP:

```text
200 OK
```

Body:

```json
{
  "operation": "add",
  "result": 15
}
```

---

# Subtraction Example

## Request

```json
{
  "operation": "subtract",
  "a": 10,
  "b": 3
}
```

## Response

```json
{
  "operation": "subtract",
  "result": 7
}
```

---

# Multiplication Example

## Request

```json
{
  "operation": "multiply",
  "a": 4,
  "b": 5
}
```

## Response

```json
{
  "operation": "multiply",
  "result": 20
}
```

---

# Division Example

## Request

```json
{
  "operation": "divide",
  "a": 10,
  "b": 4
}
```

## Response

```json
{
  "operation": "divide",
  "result": 2.5
}
```

---

# Error Handling

The API uses a consistent JSON error structure:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message."
  }
}
```

This allows the frontend to handle backend errors consistently.

---

# Division by Zero

## Request

```json
{
  "operation": "divide",
  "a": 10,
  "b": 0
}
```

## Response

HTTP:

```text
400 Bad Request
```

Body:

```json
{
  "error": {
    "code": "DIVISION_BY_ZERO",
    "message": "Division by zero is not allowed."
  }
}
```

---

# Invalid Input

Example:

```json
{
  "operation": "add",
  "a": "invalid-number",
  "b": 5
}
```

Response:

```text
422 Unprocessable Entity
```

Example body:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid or missing fields."
  }
}
```

---

# HTTP Status Codes

| Status | Meaning |
|---|---|
| `200 OK` | Calculation completed successfully |
| `400 Bad Request` | The mathematical operation is invalid, such as division by zero |
| `422 Unprocessable Entity` | The request contains invalid or missing data |
| `500 Internal Server Error` | An unexpected backend error occurred |

---

# Backend Testing

Backend tests are implemented using **Pytest**.

The tests are divided into two categories:

```text
Unit tests
    |
    `-- CalculatorService business logic

Integration tests
    |
    `-- FastAPI endpoints, validation and JSON responses
```

## Run backend tests

Activate the virtual environment and navigate to:

```powershell
cd backend
```

Run:

```powershell
python -m pytest
```

For verbose output:

```powershell
python -m pytest -v
```

The backend test suite covers scenarios including:

- Addition
- Subtraction
- Multiplication
- Division
- Decimal operands
- Negative operands
- Multiplication by zero
- Division by zero
- Missing operands
- Invalid input
- HTTP responses
- Health endpoint

---

# Frontend Testing

Frontend tests are implemented using:

```text
Vitest
React Testing Library
Testing Library User Event
JSDOM
```

Navigate to:

```powershell
cd frontend
```

Run the complete test suite once:

```powershell
npm run test:run
```

Run tests in watch mode:

```powershell
npm test
```

The frontend tests cover:

- Calculator rendering
- Number input
- Decimal input
- Operation selection
- API invocation
- Correct operands sent to the backend
- Backend result rendering
- Backend error rendering
- Calculator reset behavior
- API POST configuration
- API success responses
- API error responses
- Network errors

---

# Production Build

To verify that the React application compiles correctly for production:

```powershell
cd frontend
npm run build
```

A successful build generates:

```text
frontend/dist/
```

The `dist` directory is intentionally excluded from version control because it can be recreated from the source code.

---

# Linting

The frontend uses OxLint.

Run:

```powershell
cd frontend
npm run lint
```

Linting helps detect common code-quality issues before submission.

---

# Design Decisions

## Monorepo

The frontend and backend are stored in the same Git repository.

This makes the assessment easier to clone, review, test, and execute while still maintaining a clear separation between the two applications.

---

## React + TypeScript

React was selected for the frontend because it is explicitly required by the assessment.

TypeScript provides additional type safety for application state and API contracts.

For example, calculator operations are represented using explicit types instead of arbitrary strings.

---

## FastAPI

FastAPI was selected for the backend because it provides:

- Request validation through Pydantic
- Native JSON support
- OpenAPI documentation
- Clear REST endpoint implementation
- Lightweight application structure
- Good test integration

---

## Single Calculation Endpoint

Instead of creating separate endpoints such as:

```text
/add
/subtract
/multiply
/divide
```

the application exposes a single resource:

```http
POST /api/v1/calculations
```

The requested mathematical operation is provided in the request body.

This keeps the API contract consistent and avoids duplicated routing logic.

It also makes adding future calculator operations straightforward.

---

## Business Logic Separated from HTTP

Mathematical operations are implemented in:

```text
CalculatorService
```

and not directly inside the FastAPI route.

The route is responsible for HTTP concerns, while the service is responsible for calculator behavior.

This makes the business logic easier to test without requiring HTTP requests.

---

## Domain-Specific Exceptions

Errors such as division by zero are represented using domain-specific exceptions.

Example:

```text
DivisionByZeroError
```

The backend exception handlers translate these exceptions into HTTP responses.

This prevents the business layer from depending on FastAPI or HTTP status codes.

---

## Consistent Error Responses

All controlled API errors use the same structure:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

This makes error handling predictable for the frontend.

---

## Separate Frontend API Layer

HTTP communication is implemented inside:

```text
src/services/calculatorApi.ts
```

instead of directly inside the React component.

This separates:

```text
UI logic
from
HTTP communication
```

and allows both layers to be tested independently.

---

## Validation on Both Layers

The frontend provides immediate feedback and prevents invalid user interactions when possible.

The backend still performs authoritative validation because API clients cannot be trusted to always originate from the provided frontend.

---

## No Database

The application does not require persistent data.

Adding a database would introduce unnecessary infrastructure and complexity without solving a requirement of the assessment.

---

## No External State Management

The calculator has a small and localized state.

React state is sufficient, so libraries such as Redux were intentionally not introduced.

This keeps the solution easier to understand and maintain.

---

# Environment Variables

The frontend currently uses:

```env
VITE_API_URL=http://localhost:8000
```

A template is available in:

```text
frontend/.env.example
```

Environment-specific `.env` files are not committed to the repository.

---

# AI Assistance

AI tools were used as a development assistant during the technical assessment.

They were used primarily for:

- Reviewing architecture decisions
- Reviewing the API contract
- Identifying test scenarios and edge cases
- Supporting implementation
- Reviewing error handling
- Reviewing code structure

The architecture, technology selection, API contract, implementation, tests, and final code were reviewed and validated during development.

The prompts used during development are documented in:

```text
PROMPTS.md
```

---

# Assumptions

The implementation was designed under the following assumptions:

1. The calculator operates using real numeric values.
2. Basic arithmetic operations are the primary scope of the assessment.
3. Calculations do not need to be persisted.
4. Authentication and authorization are outside the scope of the challenge.
5. The backend is the authoritative source for mathematical validation.
6. The frontend and backend are expected to run locally on separate ports during development.

---

# Future Improvements

Possible extensions include:

- Exponentiation
- Square root
- Percentage calculations
- Keyboard input
- Calculation history
- Dockerized frontend and backend
- Continuous Integration workflow
- Improved accessibility
- Extended responsive behavior
- Additional API contract tests

These were intentionally left outside the initial implementation to prioritize the assessment requirements and maintain a focused solution.

---

# Quick Verification

After setup, the project can be verified with the following commands.

## Backend

```powershell
cd backend
python -m pytest
python -m uvicorn app.main:app --reload
```

Then verify:

```text
http://localhost:8000/health
http://localhost:8000/docs
```

## Frontend

In another terminal:

```powershell
cd frontend
npm run test:run
npm run build
npm run dev
```

Then open:

```text
http://localhost:5173
```

Test the following manually:

```text
10 + 5 = 15

10 - 3 = 7

5 × 4 = 20

10 ÷ 4 = 2.5

10 ÷ 0
→ Division by zero is not allowed.
```

---

# Summary

This implementation focuses on the key priorities of the assessment:

```text
Correctness
Clarity
Maintainability
Testability
Separation of responsibilities
```

The result is a small full-stack application where the frontend, API layer, business logic, validation, and tests remain clearly separated while avoiding unnecessary architectural complexity.