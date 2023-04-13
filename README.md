<div style="text-align:center">
  <img src="https://iili.io/Hv5YVgn.png" alt="Image Title" width="500"/>
</div>

## CS465P - Full Stack Web Development - Final Project - Web Based Clicker Game

Portland State University - Winter 2023

Students: Anh Ho && Nicholas Nguyen 

Instructor: Casey Bailey

Our project has been done in the main branch. 

# CLICKERS SETUP
(All commands are with respect to the ** ROOT directory ** of the project)


```
> 1. Clone repository 
```
** Since we got an issue with pnpm migration:run in the backend dockerfile, we need to run the backend and create the database manually** 
```
> 2. Copy and configure .env file:   ( cp backend/.env.example backend/.env )  

> 3. Install dependencies:           ( cd backend/ && pnpm install ) 

> 4. Start the whole project:        ( docker compose up )

 ** WAIT until you see the line "backend | [04:14:49.570] INFO: Server listening at http://0.0.0.0:8080 ", 

then you need to open a new termial and run the next step (5). **

> 5. Reset prior Typeorm setup, run migration tables and seed the data into the database:    ( cd backend/ && pnpm gitSync )
```

## When you are done all the steps above, the project should be starting at: http://localhost:88/

# This is a fullstack application including: 
## Front End: 
```
HTML/CSS
Typescript 
React.JS 
TailwindCSS
Nginx
```
## Back End: 
```
Typescript
NodeSJ / Pnpm 
Fastify
CORS
```
## Datebase: 
```
TypeORM
```
## Test: 
```
Vitest
```


## A short introduction about our final product: https://youtu.be/gXjTtAHfMvM
### Other project proposal videos: 

1. https://youtu.be/FGvck7D2wQw 
2. https://youtu.be/ESU7fl71CxM
