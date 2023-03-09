# CLICKERS SETUP
(All commands are with respect to the root directory of the project)

> Clone repository
> Copy and configure .env file (cp backend/.env.example backend/.env)
> Install dependencies (cd backend/ && pnpm install)
> Start database (docker compose up postgres)
> Reset prior Typeorm setup (cd backend/ && pnpm typeorm:drop)
> Migrate database (cd backend/ && pnpm migration:run)
> Seed Database (cd backend/ && pnpm seed)
> Test backend ( cd backend/ && pnpm test)
> Start backend (cd backend/ && pnpm dev)

### Auto-generating migration file from current Models

This is ONLY NEEDED during our initial development in-class!
Once you clone the repository with the migrations already in it,
you ONLY do the above!
> pnpm typeorm:drop
> pnpm migration:generate ./src/db/migrations/initialize.ts
