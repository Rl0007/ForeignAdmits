# ForeignAdmits Backend Service

This backend service is designed for the ForeignAdmits platform, facilitating study-abroad financial services. It enables students to apply for loans across multiple universities and select from various banks to manage their loans.

## Project Architecture

### Database Design

The database is structured to support many-to-many relationships using MongoDB and Mongoose. The core entities include:

- **Students**: Individuals applying for loans.
- **Universities**: Institutions where students apply.
- **Banks**: Financial institutions providing loans.

#### Many-to-Many Relationships

1. **Student-University**: A student can apply to multiple universities, and each university can have multiple student applicants.
2. **Student-University-Bank**: For each student-university pair, multiple banks can be associated to facilitate the loan process.

### Middleware and Cascade Operations

The application leverages Mongoose middleware to ensure data integrity and maintain relational consistency:

- **Cascade Deletion**: Middleware is implemented to automatically delete associated records in `StudentUniversity` and `StudentUniversityBank` collections when a student, university, or bank is removed. This prevents orphaned records and maintains database consistency.

### Uniqueness and Existence Checks

To ensure data integrity and prevent duplication, the application includes comprehensive checks:

- **Uniqueness**: Before creating or updating entities like students, universities, and banks, the system checks for existing records with the same identifiers (e.g., email for students, name for universities and banks).
- **Existence**: Before establishing relationships (e.g., student-university, student-university-bank), the application verifies that all referenced entities exist in the database.

## API Overview

The API is built using Express.js, providing RESTful endpoints for managing the core entities and their relationships:

### Endpoints

#### Student Routes

- `GET /students`: Retrieve all students.
- `GET /students/:id`: Retrieve a student by ID.
- `POST /students`: Create a new student.
  - **Body**: `{ "name": "John Doe", "email": "john.doe@example.com" }`
- `PUT /students/:id`: Update a student by ID.
  - **Body**: `{ "name": "John Doe", "email": "john.doe@example.com" }`
- `DELETE /students/:id`: Delete a student by ID.

#### University Routes

- `GET /universities`: Retrieve all universities.
- `POST /universities`: Create a new university.
  - **Body**: `{ "name": "Harvard University" }`
- `PUT /universities/:id`: Update a university by ID.
  - **Body**: `{ "name": "Harvard University" }`
- `DELETE /universities/:id`: Delete a university by ID.

#### Bank Routes

- `GET /banks`: Retrieve all banks.
- `POST /banks`: Create a new bank.
  - **Body**: `{ "name": "IDBI Bank" }`
- `PUT /banks/:id`: Update a bank by ID.
  - **Body**: `{ "name": "IDBI Bank" }`
- `DELETE /banks/:id`: Delete a bank by ID.

#### Student-University Routes

- `GET /student-universities`: Retrieve all student-university relationships.
- `POST /student-universities`: Create a new student-university relationship.
  - **Body**: `{ "studentId": "<studentId>", "universityId": "<universityId>" }`
- `PUT /student-universities/:id`: Update a student-university relationship by ID.
  - **Body**: `{ "studentId": "<studentId>", "universityId": "<universityId>" }`
- `DELETE /student-universities/:id`: Delete a student-university relationship by ID.

#### Student-University-Bank Routes

- `GET /student-university-banks`: Retrieve all student-university-bank relationships.
- `POST /student-university-banks`: Create a new student-university-bank relationship.
  - **Body**: `{ "studentUniversity": "<studentUniversityId>", "bank": "<bankId>", "loanAmount": 10000, "status": "Pending" }`
  - Note: The `status` field is an enum with values `Pending`, `Approved`, or `Rejected`.
- `PUT /student-university-banks/:id`: Update a student-university-bank relationship by ID.
  - **Body**: `{ "studentUniversity": "<studentUniversityId>", "bank": "<bankId>", "loanAmount": 10000, "status": "Approved" }`
  - Note: The `status` field is an enum with values `Pending`, `Approved`, or `Rejected`.
- `DELETE /student-university-banks/:id`: Delete a student-university-bank relationship by ID.

## Getting Started

### Prerequisites
- Node.js (LTS version)
- MongoDB (Atlas or any cloud variant)

### Setup

1. **Clone the repository**
   ```bash
   git clone git@github.com:Rl0007/ForeignAdmits.git
   cd ForeignAdmits
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Copy the `.sample_env` file to `.env`.
   - Update the `MONGODB_URI` in the `.env` file with your MongoDB connection string.

   ```bash
   cp .sample_env .env
   # Edit .env to add your MongoDB URI
   ```

4. **Run the Application**
   ```bash
   npm start
   ```
   The server will start on the port specified in your `.env` file or default to `3000`.


