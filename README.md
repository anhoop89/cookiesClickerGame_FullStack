CS465P - Full Stack Web Development - Final Project
Portland State University - Winter 2023
Students: Nicholas Nguyen & Anh Ho
Instructor: Casey Bailey

# CLICKERS SETUP
(All commands are with respect to the root directory of the project)
```
> Clone repository 
```
** Since we got an issue with pnpm migration:run in the backend dockerfile, we need to run the backend and create the database manually** 
```
> Copy and configure .env file ** ( cp backend/.env.example backend/.env ) **

> Install dependencies ** ( cd backend/ && pnpm install ) **

> Start the whole project ** ( docker compose up ) **

> Reset prior Typeorm setup, run migration tables and seed the data into the database ** ( cd backend/ && pnpm gitSync ) **
```

## When you are done all the steps above, the project should be starting at:
``
### http://localhost:88/
``

