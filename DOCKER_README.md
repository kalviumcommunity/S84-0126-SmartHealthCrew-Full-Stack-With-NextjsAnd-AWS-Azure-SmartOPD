# Docker & Compose Setup for Local Development

This project uses Docker and Docker Compose to containerize the entire application stack, ensuring a consistent local development environment.

## 📄 Dockerfile Explained

The `Dockerfile` defines how the Next.js application is built and run inside a container:

-   **Base Image**: Uses `node:20-alpine` for a lightweight Node.js environment.
-   **Dependencies**: Copies `package.json` and runs `npm install`.
-   **Prisma Generation**: Runs `npx prisma generate` to create the Prisma Client binaries required for database interaction.
-   **Build**: Runs `npm run build` to create the production build of the Next.js app.
-   **Execution**: Starts the app using `npm run start`.

## 🐙 Docker Compose Services

The `docker-compose.yml` orchestrates three services:

1.  **app** (`nextjs_app`):
    -   Builds from the current directory.
    -   Exposes port `3000`.
    -   Connects to the database and redis via `DATABASE_URL` and `REDIS_URL` environment variables.
    -   Depends on `db` and `redis` services to ensure they start first.

2.  **db** (`postgres_db`):
    -   Uses `postgres:15-alpine`.
    -   Persists data using the `db_data` volume.
    -   Exposes port `5432` for local inspection if needed.

3.  **redis** (`redis_cache`):
    -   Uses `redis:7-alpine`.
    -   Exposes port `6379`.

## 🚀 Running the Stack

To start everything:
```bash
docker-compose up --build
```

Verify the services:
-   **App**: [http://localhost:3000](http://localhost:3000)
-   **PostgreSQL**: Port `5432`
-   **Redis**: Port `6379`

## ⚠️ Notes & Troubleshooting
-   **Database Usage**: The `DATABASE_URL` in `docker-compose.yml` is set to use the local containerized Postgres (`postgres://postgres:password@db:5432/smartopd`). This overrides the `.env` file when running via Docker Compose.
-   **Prisma Migration**: On the first run, you might need to run migrations to set up the database schema. You can do this by running `npx prisma migrate dev` locally (pointing to localhost:5432) or by executing it inside the container:
    ```bash
    docker exec -it nextjs_app npx prisma migrate deploy
    ```
-   **Port Conflicts**: If you have local Postgres or Redis running, stop them or change the ports in `docker-compose.yml` (e.g., `"5433:5432"`).
