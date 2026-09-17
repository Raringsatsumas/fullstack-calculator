# AI Assistance


## Prompt 01 - Architecture Review

> I am designing a full-stack calculator using a monorepo architecture.
>
> My proposed stack is:
> - React + TypeScript + Vite for the frontend
> - FastAPI + Python for the backend
> - REST communication between both layers
> - Pytest for backend testing
> - Vitest and React Testing Library for frontend testing
>
> I want to keep the solution intentionally simple because the challenge
> prioritizes correctness, clarity, and maintainability.
>
> The backend will contain a routing layer, Pydantic schemas, a calculator
> service for business logic, and centralized exception handling.
>
> Review this architecture and point out any unnecessary complexity,
> missing responsibility, or maintainability concern. Do not redesign the
> solution unless there is a concrete technical reason.

---

## Prompt 02 - API Contract Review

> I have designed the calculator API around a single resource:
>
> POST /api/v1/calculations
>
> Request:
>
> {
>   "operation": "add",
>   "a": 10,
>   "b": 5
> }
>
> Successful response:
>
> {
>   "operation": "add",
>   "result": 15
> }
>
> I plan to support add, subtract, multiply and divide as required
> operations, with power, square root and percentage as optional
> extensions.
>
> Business-rule errors such as division by zero will return HTTP 400,
> request validation errors will return HTTP 422, and unexpected server
> errors will return HTTP 500.
>
> All controlled errors should follow:
>
> {
>   "error": {
>     "code": "ERROR_CODE",
>     "message": "Human readable message"
>   }
> }
>
> Review this API contract for consistency, REST semantics, edge cases,
> and ease of consumption from the React frontend.

---

## Prompt 03 - Backend Test Review

> Before implementing the calculator service, I want to define its test
> cases.
>
> I currently plan to cover:
> - integer operations
> - decimal operands
> - negative operands
> - multiplication by zero
> - division producing decimals
> - division by zero
> - missing operands
> - invalid operand types
> - unsupported operations
>
> Unit tests should focus on CalculatorService business logic.
> API tests should focus on HTTP status codes, validation and JSON
> response contracts.
>
> Review this test plan and identify important edge cases that I may have
> missed. Avoid adding tests that do not provide meaningful coverage.

---

## Prompt 04 - Calculator Service Implementation

> Implement the CalculatorService based on the following design.
>
> Requirements:
> - Business logic must remain independent from FastAPI.
> - Support add, subtract, multiply and divide.
> - Accept positive, negative and decimal numbers.
> - Division by zero must raise a domain-specific exception.
> - Do not return HTTP responses from the service layer.
> - Keep the implementation small, readable and easy to extend.
>
> The service will later be consumed by a FastAPI router.
>
> Provide the implementation and briefly explain any design decision
> that is not obvious from the code.

---

## Prompt 05 - Pydantic Schema Implementation

> I need Pydantic models for the following API contract:
>
> POST /api/v1/calculations
>
> Request fields:
> - operation
> - a
> - optional b
>
> Response fields:
> - operation
> - result
>
> The operation should be represented using an enum rather than an
> unrestricted string.
>
> Operand a is always required.
> Operand b is required for binary operations but may be absent for
> future unary operations such as square root.
>
> Create the schemas while keeping API validation separate from
> calculator business logic.

---

## Prompt 06 - FastAPI Route Implementation

> Implement the FastAPI route for:
>
> POST /api/v1/calculations
>
> The route must:
> - Receive the previously defined Pydantic request model.
> - Delegate all mathematical logic to CalculatorService.
> - Return the defined response model.
> - Avoid embedding mathematical business logic in the controller.
> - Map domain exceptions to the agreed API error format.
>
> Keep the router thin and focused only on HTTP concerns.

---

## Prompt 07 - Error Handling Review

> I want all controlled API errors to expose a consistent response:
>
> {
>   "error": {
>     "code": "ERROR_CODE",
>     "message": "Human readable message"
>   }
> }
>
> Current error mapping:
>
> - Division by zero -> 400 DIVISION_BY_ZERO
> - Invalid mathematical domain -> 400
> - Invalid request -> 422 VALIDATION_ERROR
> - Unsupported operation -> 422 INVALID_OPERATION
> - Unexpected exception -> 500 INTERNAL_SERVER_ERROR
>
> Review this error-handling strategy and suggest the simplest FastAPI
> implementation that avoids leaking stack traces or internal details
> to the client.

---

## Prompt 08 - Backend Code Review

> Review the following FastAPI backend as if it were submitted for a
> technical assessment.
>
> Focus only on:
> - separation of responsibilities
> - readability
> - unnecessary complexity
> - input validation
> - error handling
> - testability
>
> Do not suggest new frameworks or architectural patterns unless they
> solve a concrete problem in the existing implementation.
>
---

## Prompt 09 - Frontend State Design Review

> I am implementing the React calculator without Redux or an external
> state-management library.
>
> My proposed component state is:
> - display value
> - first operand
> - selected operation
> - waiting-for-second-operand state
> - loading state
> - API error
>
> The frontend will not perform the final mathematical calculation.
> Pressing "=" will call POST /api/v1/calculations and display the result
> returned by the backend.
>
> Review this state model and identify whether any state is redundant or
> missing.

---

## Prompt 10 - React API Client

> Implement a small TypeScript API client for the calculator.
>
> Requirements:
> - Base URL must come from VITE_API_URL.
> - Call POST /api/v1/calculations.
> - Use typed request and response interfaces.
> - Detect non-2xx responses.
> - Parse the agreed API error structure.
> - Do not mix API communication with React rendering logic.
>
> Keep the implementation minimal and dependency-free.

---

## Prompt 11 - Frontend Test Review

> I plan to test the React calculator with Vitest and React Testing
> Library.
>
> Important behaviors:
> - calculator renders correctly
> - number input updates the display
> - selecting an operation updates calculator state
> - pressing "=" calls the backend API
> - successful API responses are displayed
> - backend errors are displayed to the user
> - reset clears the calculator state
>
> Review these test cases and identify any important user behavior that
> should be covered without over-testing implementation details.

---

## Prompt 12 - Final Assessment Review

> Review this project against the technical assessment requirements.
>
> Check:
> - React frontend
> - backend REST microservice
> - required arithmetic operations
> - frontend validation and error handling
> - backend validation and edge cases
> - JSON responses
> - responsive design
> - frontend and backend tests
> - setup documentation
> - API examples
> - design rationale
>
> Identify missing requirements, inconsistencies, or unnecessary
> complexity.
>
> Do not propose additional features unless a requirement is currently
> unmet.