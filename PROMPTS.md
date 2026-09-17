# AI Assistance

AI tools were used as a development assistant during this technical assessment.

The architecture, technology choices, API contract, business rules,
testing strategy, and final implementation decisions were defined and
reviewed by the developer.

AI assistance was used primarily for architecture review, implementation
support, edge-case identification, test planning, documentation review,
and final quality validation.

---

## Prompt 01 - Architecture Review

> I am designing a full-stack calculator using a monorepo architecture.
>
> My proposed stack is:
> - React + TypeScript + Vite for the frontend
> - FastAPI + Python 3.12 for the backend
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

## Prompt 02 - Requirements Review

> Review the following full-stack calculator architecture against the
> technical assessment requirements.
>
> The solution contains:
> - React + TypeScript frontend
> - FastAPI backend
> - REST communication
> - CalculatorService business layer
> - frontend and backend validation
> - frontend and backend tests
> - responsive user interface
>
> Verify whether the design satisfies all functional, non-functional,
> testing, documentation, and delivery requirements.
>
> Identify missing requirements without adding unnecessary complexity.

---

## Prompt 03 - API Contract Review

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

## Prompt 04 - Backend Test Review

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

## Prompt 05 - Calculator Service Implementation

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

## Prompt 06 - Pydantic Schema Implementation

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

## Prompt 07 - FastAPI Route Implementation

> Implement the FastAPI route for:
>
> POST /api/v1/calculations
>
> The route must:
> 1. Receive the previously defined Pydantic request model.
> 2. Delegate all mathematical logic to CalculatorService.
> 3. Return the defined response model.
> 4. Avoid embedding mathematical business logic in the controller.
> 5. Map domain exceptions to the agreed API error format.
>
> Keep the router thin and focused only on HTTP concerns.

---

## Prompt 08 - Error Handling Review

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
> - Unsupported operation -> 422
> - Unexpected exception -> 500 INTERNAL_SERVER_ERROR
>
> Review this error-handling strategy and suggest the simplest FastAPI
> implementation that avoids leaking stack traces or internal details
> to the client.

---

## Prompt 09 - Backend Code Review

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
> [paste relevant code]

---

## Prompt 10 - Frontend State Design Review

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

## Prompt 11 - React API Client

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

## Prompt 12 - Frontend Test Review

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

## Prompt 13 - API Client Test Review

> I want to test the frontend API service independently from React.
>
> The calculator API client should be tested for:
> - POST request method
> - Content-Type header
> - correct endpoint
> - serialized request body
> - successful JSON response
> - backend error response
> - network failure
>
> Review this test plan and identify whether any important behavior is
> missing.

---

## Prompt 14 - README Documentation Review

> I have completed the implementation of a full-stack calculator using
> React, TypeScript, FastAPI, Pytest, Vitest, and React Testing Library.
>
> Create or review a README for the repository with the following goals:
>
> - A reviewer should be able to clone and run the project without
>   additional guidance.
> - Document backend and frontend setup separately.
> - Include Python 3.12 environment setup.
> - Include npm installation and frontend startup steps.
> - Document VITE_API_URL using .env.example.
> - Include API request and response examples.
> - Include error-response examples.
> - Explain how to run backend and frontend tests.
> - Explain how to run the production frontend build.
> - Document the architecture and important design decisions.
> - Explain why no database or external state-management library was used.
> - Mention AI assistance and reference PROMPTS.md.
>
> Keep the documentation concise, reproducible, and aligned with the
> actual repository structure. Do not document files, scripts, or
> features that do not exist in the repository.

---

## Prompt 15 - Repository Structure Review

> Review the current Git repository structure for a full-stack technical
> assessment.
>
> Check for:
> - accidentally committed virtual environments
> - node_modules
> - build artifacts
> - temporary files
> - unnecessary root-level package files
> - missing .env.example
> - duplicate README files
> - generated framework files that are no longer required
>
> Recommend only cleanup changes that improve the clarity or
> reproducibility of the repository.

---

## Prompt 16 - Final Requirements Audit

> Perform a final audit of the completed project against the technical
> assessment requirements.
>
> Verify:
> - React frontend
> - backend REST API
> - addition
> - subtraction
> - multiplication
> - division
> - frontend input validation
> - frontend error handling
> - responsive design
> - backend validation
> - division-by-zero handling
> - JSON responses
> - clean separation of responsibilities
> - backend unit tests
> - backend API tests
> - frontend tests
> - setup documentation
> - API examples
> - design rationale
> - documented AI usage
>
> Identify only missing requirements, regressions, or inconsistencies.
> Do not suggest additional features unless they directly improve
> compliance with the assessment.

---

## Prompt 17 - Final Code Quality Review

> Review the completed project as if you were a technical evaluator.
>
> Focus on:
> - correctness
> - readability
> - maintainability
> - naming consistency
> - unnecessary duplication
> - separation between UI, HTTP and business logic
> - test quality
> - documentation consistency
>
> Flag concrete issues only.
>
> Do not recommend architectural expansion, additional infrastructure,
> or new dependencies unless a current implementation problem requires it.

---

## Prompt 18 - Optional Feature Extension Review

> The required calculator functionality is already complete and tested.
>
> I am considering adding the optional operations:
> - exponentiation
> - square root
> - percentage
>
> Review how these operations can be added while preserving the existing
> architecture:
>
> Operation enum
> -> CalculatorService
> -> backend tests
> -> API contract
> -> frontend types
> -> UI
> -> frontend tests
>
> Avoid introducing special-case architecture or unnecessary
> abstractions.