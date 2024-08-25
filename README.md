Here is the `README.md` content that you can directly copy and paste:

```markdown
# CRM Backend

This is a simple Customer Relationship Management (CRM) system backend built using Node.js, Express, and MongoDB. The system includes user authentication, customer management, ticket tracking, and interaction logging.

## Features

- User Registration and Login with JWT-based authentication
- CRUD operations for Customers
- Ticket management (create, update, view, and delete tickets)
- Interaction tracking between users and customers

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB (local or Atlas)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/crm-backend.git
   cd crm-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file in the root of the project with the following variables:**

   ```plaintext
   MONGO_URI=<Your MongoDB Connection String>
   JWT_SECRET=<Your JWT Secret>
   PORT=5000
   ```

   - Replace `<Your MongoDB Connection String>` with your actual MongoDB connection string.
   - Replace `<Your JWT Secret>` with a strong secret key for JWT.

4. **Start the server:**

   ```bash
   npm start
   ```

   The server will start on `http://localhost:5000`.

## API Endpoints

### Authentication

- **Register a new user:**

  ```plaintext
  POST /api/auth/register
  ```

  Request body:

  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "yourpassword",
    "role": "admin"
  }
  ```

- **Login a user:**

  ```plaintext
  POST /api/auth/login
  ```

  Request body:

  ```json
  {
    "email": "johndoe@example.com",
    "password": "yourpassword"
  }
  ```

- **Get the logged-in user:**

  ```plaintext
  GET /api/auth/user
  ```

  (Requires JWT token in the Authorization header)

### Customers

- **Get all customers:**

  ```plaintext
  GET /api/customers
  ```

  (Requires JWT token)

- **Create a new customer:**

  ```plaintext
  POST /api/customers
  ```

  Request body:

  ```json
  {
    "name": "Customer Name",
    "email": "customer@example.com",
    "phone": "123-456-7890",
    "address": "123 Main St, City, Country"
  }
  ```

  (Requires JWT token)

- **Update a customer:**

  ```plaintext
  PUT /api/customers/:id
  ```

  (Requires JWT token)

- **Delete a customer:**

  ```plaintext
  DELETE /api/customers/:id
  ```

  (Requires JWT token)

### Tickets

- **Get all tickets:**

  ```plaintext
  GET /api/tickets
  ```

  (Requires JWT token)

- **Create a new ticket:**

  ```plaintext
  POST /api/tickets
  ```

  Request body:

  ```json
  {
    "title": "Ticket Title",
    "description": "Detailed description of the issue",
    "status": "open",
    "priority": "high",
    "assignedTo": "user_id",
    "customerId": "customer_id"
  }
  ```

  (Requires JWT token)

- **Update a ticket:**

  ```plaintext
  PUT /api/tickets/:id
  ```

  (Requires JWT token)

- **Delete a ticket:**

  ```plaintext
  DELETE /api/tickets/:id
  ```

  (Requires JWT token)

### Interactions

- **Get all interactions:**

  ```plaintext
  GET /api/interactions
  ```

  (Requires JWT token)

- **Create a new interaction:**

  ```plaintext
  POST /api/interactions
  ```

  Request body:

  ```json
  {
    "customerId": "customer_id",
    "userId": "user_id",
    "type": "call",
    "description": "Discussion about the latest product update",
    "date": "2024-08-24T10:00:00Z"
  }
  ```

  (Requires JWT token)

- **Update an interaction:**

  ```plaintext
  PUT /api/interactions/:id
  ```

  (Requires JWT token)

- **Delete an interaction:**

  ```plaintext
  DELETE /api/interactions/:id
  ```

  (Requires JWT token)

## Running Tests

You can create test scripts to validate the functionality of the APIs using tools like Postman or automated testing libraries like Mocha and Chai. Test each endpoint by sending the appropriate requests and verifying the responses.

