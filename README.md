# Full-Stack Calculator

A full-stack calculator application built as a technical assessment using **React + TypeScript** for the frontend and **FastAPI + Python** for the backend.

The frontend communicates with the backend exclusively through a REST API. Mathematical operations are handled by the backend rather than being calculated directly in the React application.

The project focuses on correctness, maintainability, separation of responsibilities, validation, error handling, automated testing, and clear documentation.

---

## Features

The calculator supports the required operations:

- Addition
- Subtraction
- Multiplication
- Division

It also includes the optional advanced operations:

- Exponentiation
- Square root
- Percentage

Additional behavior includes:

- Positive and negative numbers
- Decimal numbers
- Direct negative-number input
- Division-by-zero validation
- Negative square-root validation
- Backend API error handling
- Loading state while calculations are processed
- Responsive interface
- Automated frontend and backend tests
- Test coverage reporting

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Vitest
- React Testing Library
- JSDOM
- OxLint

### Backend

- Python 3.12
- FastAPI
- Pydantic
- Pytest

### Communication

- REST API
- JSON request and response payloads

---

## Architecture

The application uses a simple client-server architecture:

```text
┌─────────────────────┐
│                     │
│   React Frontend    │
│                     │
│  UI + State         │
│  API Client         │
│                     │
└──────────┬──────────┘
           │
           │ HTTP / JSON
           │
           ▼
┌─────────────────────┐
│                     │
│   FastAPI Backend   │
│                     │
│  Router             │
│  Validation         │
│  CalculatorService  │
│  Exception Handling │
│                     │
└─────────────────────┘
```

The frontend does not perform the final mathematical calculation.

When the user performs an operation, the React application sends the operands and operation to the backend API. The backend validates the request, executes the business logic, and returns the result as JSON.

---

## Project Structure

```text
fullstack-calculator/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── calculations.py
│   │   │
│   │   ├── core/
│   │   │   ├── exception_handlers.py
│   │   │   └── exceptions.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── calculation.py
│   │   │   └── error.py
│   │   │
│   │   ├── services/
│   │   │   └── calculator_service.py
│   │   │
│   │   └── main.py
│   │
│   ├── tests/
│   │   ├── integration/
│   │   │   ├── test_calculations_api.py
│   │   │   └── test_health.py
│   │   │
│   │   └── unit/
│   │       └── test_calculator_service.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── components/
│   │   │   └── Calculator/
│   │   │       ├── __tests__/
│   │   │       │   └── Calculator.test.tsx
│   │   │       ├── Calculator.css
│   │   │       └── Calculator.tsx
│   │   │
│   │   ├── services/
│   │   │   ├── __tests__/
│   │   │   │   └── calculatorApi.test.ts
│   │   │   └── calculatorApi.ts
│   │   │
│   │   ├── test/
│   │   │   └── setup.ts
│   │   │
│   │   ├── types/
│   │   │   └── calculator.ts
│   │   │
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   │
│   ├── .env.example
│   ├── .oxlintrc.json
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
├── .gitignore
├── PROMPTS.md
└── README.md
```

---

# Getting Started

## Prerequisites

Make sure the following tools are installed:

- Python 3.12+
- Node.js
- npm
- Git

Verify the installations with:

```bash
python --version
node --version
npm --version
git --version
```

---

# 1. Clone the Repository

```bash
git clone https://github.com/Raringsatsumas/fullstack-calculator.git
cd fullstack-calculator
```

Replace `<repository-url>` with the URL of this repository.

---

# 2. Backend Setup

The backend is located in:

```text
backend/
```

## Create a Python virtual environment

From the project root:

```bash
python -m venv .venv
```

### Windows PowerShell

Activate it using:

```powershell
.\.venv\Scripts\Activate.ps1
```

### macOS / Linux

```bash
source .venv/bin/activate
```

---

## Install Backend Dependencies

From the project root:

```bash
pip install -r backend/requirements.txt
```

Then enter the backend directory:

```bash
cd backend
```

---

## Start the Backend

```bash
python -m uvicorn app.main:app --reload
```

The backend will be available at:

```text
http://localhost:8000
```

---

## Health Check

Open:

```text
http://localhost:8000/health
```

The endpoint can be used to verify that the API is running.

---

## Interactive API Documentation

FastAPI automatically provides Swagger documentation at:

```text
http://localhost:8000/docs
```

The calculator API can be tested directly from this interface.

---

# 3. Frontend Setup

Open a second terminal and enter the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

For a reproducible installation using the existing lock file, you can also use:

```bash
npm ci
```

---

## Environment Configuration

The frontend uses an environment variable to define the backend API URL.

An example file is included:

```text
frontend/.env.example
```

Create a local `.env` file from it.

### Windows PowerShell

```powershell
Copy-Item .env.example .env
```

### macOS / Linux

```bash
cp .env.example .env
```

The configuration should contain:

```env
VITE_API_URL=http://localhost:8000
```

The `.env` file is intentionally excluded from version control.

---

## Start the Frontend

```bash
npm run dev
```

Vite will display the local application URL, normally:

```text
http://localhost:5173
```

The frontend requires the FastAPI backend to be running for calculations to work.

---

# Running the Complete Application

Use two terminals.

## Terminal 1 — Backend

From the project root:

```bash
cd backend
python -m uvicorn app.main:app --reload
```

Backend:

```text
http://localhost:8000
```

## Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# API

## Calculate

```http
POST /api/v1/calculations
```

The same endpoint is used for every supported mathematical operation.

---

## Request Format

Binary operations use:

```json
{
  "operation": "add",
  "a": 10,
  "b": 5
}
```

Unary operations such as square root only require operand `a`:

```json
{
  "operation": "sqrt",
  "a": 25
}
```

---

## Response Format

A successful request returns:

```json
{
  "operation": "add",
  "result": 15
}
```

---

# Supported Operations

| Operation | API value | Example | Result |
|---|---|---|---:|
| Addition | `add` | 10 + 5 | 15 |
| Subtraction | `subtract` | 10 - 5 | 5 |
| Multiplication | `multiply` | 10 × 5 | 50 |
| Division | `divide` | 10 ÷ 5 | 2 |
| Exponentiation | `power` | 2⁸ | 256 |
| Square root | `sqrt` | √25 | 5 |
| Percentage | `percentage` | 20% of 150 | 30 |

---

# API Examples

## Addition

Request:

```json
{
  "operation": "add",
  "a": 10,
  "b": 5
}
```

Response:

```json
{
  "operation": "add",
  "result": 15
}
```

---

## Subtraction

```json
{
  "operation": "subtract",
  "a": 10,
  "b": 3
}
```

Response:

```json
{
  "operation": "subtract",
  "result": 7
}
```

---

## Multiplication

```json
{
  "operation": "multiply",
  "a": 5,
  "b": 4
}
```

Response:

```json
{
  "operation": "multiply",
  "result": 20
}
```

---

## Division

```json
{
  "operation": "divide",
  "a": 10,
  "b": 4
}
```

Response:

```json
{
  "operation": "divide",
  "result": 2.5
}
```

---

## Exponentiation

```json
{
  "operation": "power",
  "a": 2,
  "b": 8
}
```

Response:

```json
{
  "operation": "power",
  "result": 256
}
```

---

## Square Root

Square root is a unary operation and therefore does not require operand `b`.

```json
{
  "operation": "sqrt",
  "a": 25
}
```

Response:

```json
{
  "operation": "sqrt",
  "result": 5
}
```

---

## Percentage

Percentage is interpreted as:

```text
a percent of b
```

The backend calculates it using:

```text
(a / 100) × b
```

For example:

```text
20% of 150 = 30
```

Request:

```json
{
  "operation": "percentage",
  "a": 20,
  "b": 150
}
```

Response:

```json
{
  "operation": "percentage",
  "result": 30
}
```

---

# Error Handling

Controlled API errors use a consistent structure:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  }
}
```

---

## Division by Zero

Request:

```json
{
  "operation": "divide",
  "a": 10,
  "b": 0
}
```

Response:

```json
{
  "error": {
    "code": "DIVISION_BY_ZERO",
    "message": "Division by zero is not allowed."
  }
}
```

HTTP status:

```text
400 Bad Request
```

---

## Negative Square Root

Request:

```json
{
  "operation": "sqrt",
  "a": -4
}
```

Response:

```json
{
  "error": {
    "code": "NEGATIVE_SQUARE_ROOT",
    "message": "Square root of a negative number is not supported."
  }
}
```

HTTP status:

```text
400 Bad Request
```

---

## Missing Operand

Binary operations require both operands.

Example:

```json
{
  "operation": "power",
  "a": 2
}
```

The API returns a validation/domain error indicating that operand `b` is required.

---

## Invalid Request

Invalid input types or unsupported operation values return:

```text
422 Unprocessable Entity
```

Validation errors are handled centrally by the backend.

---

# Backend Design

The backend separates HTTP concerns from mathematical business logic.

## API Layer

```text
backend/app/api/calculations.py
```

Responsible for receiving HTTP requests and returning responses.

The router does not contain mathematical logic.

---

## Schema Layer

```text
backend/app/schemas/calculation.py
```

Defines request and response models using Pydantic.

Operations are represented using an enum rather than unrestricted strings.

---

## Service Layer

```text
backend/app/services/calculator_service.py
```

Contains the calculator business logic.

The service is independent from FastAPI-specific HTTP behavior, which makes it easy to test directly.

---

## Domain Exceptions

```text
backend/app/core/exceptions.py
```

Defines calculator-specific exceptions such as:

```text
DivisionByZeroError
MissingOperandError
NegativeSquareRootError
```

---

## Exception Handlers

```text
backend/app/core/exception_handlers.py
```

Maps domain and validation errors to consistent HTTP responses.

This keeps exception formatting outside the business-logic layer.

---

# Frontend Design

The frontend separates rendering, calculator state, API communication, and shared types.

## Calculator Component

```text
frontend/src/components/Calculator/Calculator.tsx
```

Responsible for:

- Calculator state
- Numeric input
- Decimal input
- Negative-number input
- Operation selection
- Loading state
- Displaying backend results
- Displaying API errors

The component does not perform the final mathematical calculation.

---

## API Client

```text
frontend/src/services/calculatorApi.ts
```

Handles communication with:

```text
POST /api/v1/calculations
```

It is responsible for:

- Sending JSON requests
- Reading successful responses
- Parsing backend errors
- Handling network failures

Keeping API communication separate from the React component simplifies testing and maintenance.

---

## Shared Types

```text
frontend/src/types/calculator.ts
```

Defines TypeScript types for:

- Operations
- API requests
- API responses
- API errors

---

# Design Decisions

## Single Calculation Endpoint

All operations use:

```text
POST /api/v1/calculations
```

instead of creating a separate endpoint for every mathematical operation.

This keeps the API small and consistent while allowing new operations to be added through the `operation` field.

---

## Business Logic Outside the Router

Mathematical operations are implemented in `CalculatorService`.

This provides:

- Better separation of responsibilities
- Easier unit testing
- Smaller route handlers
- Easier extension of supported operations

---

## Centralized Error Handling

Domain exceptions are converted into HTTP responses through FastAPI exception handlers.

This avoids repeating error-response logic in individual routes.

---

## No Database

The calculator is stateless.

Each request contains all the information required to calculate a result, so introducing a database would add complexity without providing value for the requirements of this application.

---

## No External Frontend State Manager

The calculator has a small amount of local UI state.

React's built-in `useState` is sufficient, so Redux or another state-management library would add unnecessary complexity.

---

## Backend as the Source of Truth

The React application manages user interaction but delegates the mathematical operation to the API.

This preserves the requested full-stack architecture and avoids duplicating business logic between frontend and backend.

---

## Unary and Binary Operations

Most calculator operations are binary:

```text
a + b
a - b
a × b
a ÷ b
aᵇ
a% of b
```

Square root is unary:

```text
√a
```

For that reason, operand `b` is optional in the API request model but validated by the service when a binary operation requires it.

---

# Testing

The project contains automated tests for both the backend and frontend.

---

## Backend Tests

Backend tests use Pytest.

From:

```text
backend/
```

run:

```bash
python -m pytest
```

For verbose output:

```bash
python -m pytest -v
```

The backend test suite includes both unit and integration tests.

### Unit tests

```text
backend/tests/unit/test_calculator_service.py
```

These verify calculator business logic independently from HTTP.

Covered scenarios include:

- Addition
- Subtraction
- Multiplication
- Division
- Decimal operands
- Negative operands
- Division by zero
- Missing operands
- Exponentiation
- Square root
- Square root of zero
- Negative square root
- Percentage

### Integration tests

```text
backend/tests/integration/
```

These verify:

- API responses
- HTTP status codes
- Request validation
- Error response structures
- Health endpoint
- Required operations
- Advanced operations

---

## Backend Coverage

Backend coverage can be generated using `pytest-cov`.

Install it if it is not already available:

```bash
python -m pip install pytest-cov
```

Then run from the `backend` directory:

```bash
python -m pytest --cov=app --cov-report=term-missing
```

---

# Frontend Tests

Frontend tests use:

- Vitest
- React Testing Library
- JSDOM
- User Event

From:

```text
frontend/
```

run the test suite with:

```bash
npm run test:run
```

Interactive test mode:

```bash
npm run test
```

The frontend tests verify behaviors such as:

- Calculator controls render correctly
- Numeric input
- Decimal input
- Negative-number input
- Operation selection
- API requests
- Successful API responses
- Backend error messages
- Clear/reset behavior
- Exponentiation
- Square root
- Percentage
- API client behavior
- Network errors

---

# Frontend Test Coverage

Coverage can be generated with:

```bash
npm run test:coverage
```

Latest frontend coverage snapshot:

| Metric | Coverage |
|---|---:|
| Statements | 87.61% |
| Branches | 69.56% |
| Functions | 92.30% |
| Lines | 91.91% |

The API service reaches full statement and line coverage, while most uncovered branches are located in UI state and defensive error-handling paths.

Coverage artifacts are generated locally and are not required to be committed to the repository.

---

# Frontend Quality Checks

## Lint

Run:

```bash
npm run lint
```

The frontend uses OxLint.

---

## Production Build

Verify that the frontend can produce a production build with:

```bash
npm run build
```

The generated build output is placed in:

```text
frontend/dist/
```

The `dist` directory is intentionally excluded from version control.

---

# Available Frontend Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Type-checks and creates the production build |
| `npm run lint` | Runs OxLint |
| `npm run preview` | Serves the production build locally |
| `npm run test` | Runs Vitest in interactive/watch mode |
| `npm run test:run` | Runs all frontend tests once |
| `npm run test:coverage` | Runs tests and generates coverage |

---

# Manual Verification

Some useful scenarios for manually testing the complete application are:

```text
10 + 5 = 15

10 - 3 = 7

5 × 4 = 20

10 ÷ 4 = 2.5

2 xʸ 8 = 256

25 √ = 5

20 % 150 = 30

-2 + 5 = 3
```

Error scenarios:

```text
10 ÷ 0
→ Division by zero is not allowed.

√-4
→ Square root of a negative number is not supported.
```

---

# Environment Variables

The frontend currently uses:

```env
VITE_API_URL=http://localhost:8000
```

An example is included in:

```text
frontend/.env.example
```

Local `.env` files are excluded from Git.

---

# AI Assistance

AI tooling was used during development as an assistant for:

- Architecture review
- API contract review
- Implementation support
- Edge-case identification
- Testing strategy
- Code review
- Documentation review
- Final requirement validation

Architecture decisions, technology selection, API behavior, implementation decisions, and final code ownership remained with the developer.

The relevant prompts used during development are documented in:

```text
PROMPTS.md
```

---

# Possible Future Improvements

The application intentionally remains small and focused on the technical assessment requirements.

Possible future extensions could include:

- Docker configuration
- Docker Compose for frontend and backend
- Continuous Integration with GitHub Actions
- Automated lint/test/build checks on pull requests
- Keyboard input support
- Additional accessibility improvements
- Calculation history
- Scientific calculator operations
- Backend and frontend deployment configuration

These features were intentionally left outside the core implementation to avoid unnecessary complexity.

---

# Final Validation

Before submitting the project, the following commands can be used to verify the complete solution.

## Backend

```bash
cd backend
python -m pytest
```

Start the API:

```bash
python -m uvicorn app.main:app --reload
```

## Frontend

From another terminal:

```bash
cd frontend
npm run test:run
npm run lint
npm run build
npm run dev
```

The project is ready when:

```text
Backend tests        PASS
Frontend tests       PASS
Frontend lint        PASS
Frontend build       PASS
API                  RUNNING
Frontend             RUNNING
```

---

# Summary

This project implements a full-stack calculator with a React/TypeScript frontend and a FastAPI/Python backend.

The solution emphasizes:

- Clear separation between UI, HTTP, and business logic
- Backend-driven calculations
- Input validation
- Consistent error handling
- Unit and integration testing
- Frontend component and API-client testing
- Advanced calculator operations
- Responsive design
- Reproducible setup instructions
- Explicit documentation of AI assistance

The architecture was intentionally kept simple because the application is stateless and does not require additional infrastructure such as a database, external state-management library, or distributed services.