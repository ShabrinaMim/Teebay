Teebay Project Documentation
Introduction

Teebay is a full-stack web platform designed to simplify the process of buying, selling, and renting items across multiple categories, such as electronics and furniture. The system has been developed using modern, scalable technologies and follows clean architectural principles to ensure long-term maintainability and a seamless user experience.
Technology Stack
Backend Technologies

    Node.js v22 with Express

    Apollo GraphQL for API interactions

    Prisma ORM for PostgreSQL database communication

    PostgreSQL as the primary data store

    Zod for validating schemas

    Dataloader to optimize GraphQL data fetching

Frontend Technologies

    React (v18) with TypeScript

    Vite for high-speed development and bundling

    Tailwind CSS for responsive design

    Headless UI for accessible component primitives

User Authentication & Onboarding

The platform includes a user registration and login system with robust authentication. Upon signing up, passwords are securely hashed, and JWT tokens are generated. These tokens are then attached to all protected API requests. Both frontend and backend validations are enforced to ensure data integrity before processing user credentials.
Feature Implementation
Product Creation Flow

    The product creation process uses a multi-step form.

    Zustand is employed for state management across steps.

    Form inputs are validated using Zod.

    Business logic restricts actions like deleting already sold products.

Additionally, upon server startup, default product categories are seeded into the database using a dedicated startup service.
Buy / Sell / Rent Logic
Buying:

    Users can purchase available items if they aren't the item's owner.

Renting:

    The backend handles complex validation:

        Checks for valid start and end dates

        Confirms availability

        Ensures that already purchased items can't be rented

    All user errors (e.g., invalid dates) result in clear, actionable messages

Backend Design and Request Flow

The backend is built in TypeScript and follows a service-oriented structure. Here’s how it processes GraphQL requests:

    Request Handling:

        GraphQL requests are routed through resolvers.

        Input validation is handled by Zod.

        On success, service classes are triggered to perform business logic.

    Data Retrieval:

        Services may invoke Dataloader instances, which in turn query Repository classes.

        This design helps eliminate redundant database calls and supports batch fetching.

    Validation Layer:

        Zod schemas enforce strict rules on incoming data to prevent bad inputs from reaching business logic.

        Used in both the signup process and form submissions.

Frontend Design Patterns

The React frontend emphasizes performance and user feedback:

    Form Validation:

        Before any request is sent, user input is validated with Zod.

        Errors are displayed inline, preventing unnecessary backend calls.

    GraphQL Integration:

        Apollo Client manages queries and mutations.

        It handles caching and keeps UI state in sync with backend data.

Development Notes

Large Language Models such as ChatGPT and Claude were leveraged throughout development to accelerate schema design, bug resolution, and component logic.

Example: ChatGPT assisted in crafting password rules for Zod validation (e.g., minimum length, numeric characters).
Final Thoughts

Teebay is a modular, robust application built with industry-standard tools. It cleanly separates responsibilities between frontend and backend, ensures efficient database access, and maintains a responsive and user-friendly UI through Apollo and React.

The system is well-suited for future enhancements, including search, notifications, or real-time updates.