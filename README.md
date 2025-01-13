# Job Board API

A RESTful API for managing job postings built with Node.js, TypeScript, Express, and MySQL using Prisma ORM.

## Features

- Full CRUD operations for job postings
- Input validation using Zod
- TypeScript for type safety
- Swagger API documentation
- MySQL database with Prisma ORM
- Clean architecture with separation of concerns
- Dockerized application for easy deployment
- Docker Compose for orchestration

## Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn package manager
- Docker and Docker Compose (for containerized deployment)

## Setup Instructions

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd job-board-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/jobboard"
   PORT=7000
   ```
   Replace the database URL with your MySQL connection string.

4. **Initialize the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   The server will start on http://localhost:7000
   Swagger documentation will be available at http://localhost:7000/api-docs

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```
   This will:
   - Build the Docker image
   - Start the container with the API service
   - Expose port 7000
   - Set up environment variables
   - Enable automatic restart

2. **Environment Variables for Docker**
   Create a `.env` file with your database configuration:
   ```env
   DATABASE_URL=mysql://user:password@host:port/database?ssl-mode=REQUIRED
   PORT=7000
   ```

## API Endpoints

- POST /jobs - Create a new job posting
- GET /jobs - Retrieve all job postings
- GET /jobs/:id - Retrieve a specific job posting
- PUT /jobs/:id - Update a job posting
- DELETE /jobs/:id - Delete a job posting

## Project Structure

```
src/
├── controllers/     # Business logic
│   └── jobController.ts
├── routes/         # Route definitions
│   └── jobRoutes.ts
├── types/          # TypeScript types and schemas
│   └── job.ts
├── server.ts       # Application entry point
├── Dockerfile      # Docker configuration
├── docker-compose.yaml  # Docker Compose configuration
└── prisma/         # Database schema and migrations
    └── schema.prisma
```

## Design Decisions

1. **TypeScript & Type Safety**
   - Used TypeScript for better developer experience and type safety
   - Implemented Zod schemas for runtime validation
   - Strict TypeScript configuration for maximum type safety

2. **Database & ORM**
   - Chose MySQL for reliability and wide support
   - Used Prisma as ORM for:
     - Type-safe database queries
     - Easy schema management
     - Automatic migrations
     - Great TypeScript integration

3. **API Documentation**
   - Implemented Swagger/OpenAPI documentation
   - Detailed schema definitions and endpoint descriptions
   - Interactive API testing through Swagger UI

4. **Code Organization**
   - Separated concerns into controllers, routes, and types
   - Used class-based controllers for better organization
   - Centralized validation schemas
   - Clean and consistent error handling

5. **Containerization**
   - Dockerfile optimized for Node.js applications
   - Multi-stage build for smaller image size
   - Docker Compose for easy orchestration
   - Automatic database migrations on container startup

## Error Handling

The API uses standard HTTP status codes:
- 200 - Success
- 201 - Resource created
- 204 - Resource deleted
- 400 - Invalid input
- 404 - Resource not found
- 500 - Server error

## Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript project
- `npm start` - Run the built project
- `docker-compose up` - Start the containerized application
- `docker-compose down` - Stop and remove containers

## Future Improvements

1. Authentication & Authorization
   - Implement JWT authentication
   - Role-based access control
   - User management

2. Additional Features
   - Search and filtering
   - Pagination
   - Job categories and tags
   - Application tracking

3. Testing
   - Unit tests
   - Integration tests
   - API tests
   - Docker testing environments
