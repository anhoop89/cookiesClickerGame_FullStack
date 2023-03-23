---NECESSARY--- to setup backend database.

Local:

1. Copy and configure .env.example to .env

Docker:

> docker build -t clickers/backend .

> docker run -p 8080:8080 clickers/backend

Docker-Compose:
From root (not /backend)

> docker-compose up

Migration process:

> pnpm migration:run

Seed process:
> After running migration, execute `pnpm seed`

Updating your local version of clickers after Pulling changes from the Github repo:
> pnpm gitSync
  
