# Teebay

Teebay is a containerized fullstack application that provides functionality for users to buy, rent, and sell products in multiple categories including electronics and furniture. It is developed using React, Apollo Client, Express.js, GraphQL, Prisma, and PostgreSQL.

## Backend Setup

1. Navigate to the Project Root Directory

    cd ./Teebay

2. Configure the docker-compose.yml File

    - Replace yourpassword in the docker-compose.yml file with a password of your choice.
    - Replace yourjwtsecret in the docker-compose.yml file with a secret of your choice.

3. Start the Backend Services

    Run the following command to start the backend services in detached mode:

    docker compose up -d

## Frontend Setup

1. Navigate to the Frontend Directory

    cd ./frontend

2. Create an .env File

    Create an .env file in the root of the frontend directory and add the following line:

    VITE_GRAPHQL_URL=http://localhost:4000/graphql

3. Start the Frontend Services

    Go back to the root directory and run the following command to start the frontend:

    cd ..
    docker compose up -d

## Accessing the Application

Once both the backend and frontend services are up and running, you can access the application by navigating to the appropriate frontend URL (http://localhost:3000).

## Notes

- Ensure that Docker is installed and running on your system before starting the setup.
- If you encounter any issues, check the logs using:

    docker compose logs

- Stop the services when they are no longer needed:

    docker compose down
