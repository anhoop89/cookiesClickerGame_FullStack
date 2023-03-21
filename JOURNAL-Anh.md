# Anh Ho - CS 465P Full Stack Web Development - Winter 2023

>Although I tend to work independently on most projects, I decided to work in a team for the final project to enhance my teamwork skills and learn from my colleague. I reached out to Nicholas, who frequently attended our lectures, and thankfully he agreed to team up with me.

>We had some calls over Discord before finalizing the project topic. We considered several options but found it challenging to visualize their implementation. After discussing various possibilities, Nicholas proposed developing a web-based clicker game, and he shared some reference sites that helped me understand the concept. Ultimately, we agreed to proceed with this idea.

>Since this is a team project, we have been collaborating on the codebase throughout the development process, and our git history shows the effectiveness of our teamwork. 

>I based our codebase on the doggr file after completing HW2 and created "main," "anhho," and "nicholas" branches, which allowed us to work on our own branches and merge our code when ready.

# Regarding the backend and database, I was responsible for:

> Testing all the routes, server, and database to ensure they were implemented correctly and working properly. Additionally, I made some changes to the server to address and fix CORS/preflight issues.

# On the frontend, my duties included: 

> Creating the user interface and a tab for testing purposes. 
> >I developed the "home," "info," and "about" tabs, using the "info" tab to test GET/POST/PUT/DELETE requests by communicating with the backend through the API. 
> >Additionally, I converted the game, which Nicholas initially developed using HTML, CSS, and JS, into TypeScript using React. I also implemented timer for the game, updated some game effects using CSS and TailwindCSS.
> Set up Auth0 for an user authentication, such as login and logout buttons.
# We encountered several major challenges during this project

>**CORS and preflight issues:** We discovered that only GET requests were working, while POST, DELETE, and PUT requests were failing. It took us several days to diagnose the problem, but we eventually found a solution: to use an option request. This option request sends a preflight request to the server, asking for permission to perform a POST, DELETE, or PUT request. Once the server responds with permission, the frontend can then send the actual request. By using option requests, we were able to bypass the CORS and preflight issues and get the other request methods working.

> **Not loading data for the game properly:** To load the user's game data upon successful login, we utilized the useEffect hook to send a Get request to the database. While it was able to load the data without any issue, the clickers and upgrades did not update during gameplay, and kept showing the same clickers/upgrades from the old gamedata even though console.log confirmed that they were working properly. After testing by consolog.log, we suspected that the useEffect hook was constantly reloading the data each time the game was played, which prevented the clickers and upgrades from updating. To resolve this issue, we came up with a solution of implementing an if/else statement within the hook to ensure that the data is loaded only once.

> **docker-compose.yaml file issues:** 
> The frontend dockerfile: While I was able to successfully build and run the frontend using nginx, I noticed that the images implemented by the <img> tag in the return of the function component could not load for some reason. Strangely, the images appeared as expected when the frontend was run locally, but not on the nginx server.
After some investigation, we discovered that images posted through CSS worked without any issues. Therefore, we decided to create a class name for CSS and added the images from there. This solution proved successful, and the images were able to load properly when we accessed the website through localhost:88
> The backend dockerfile: We spent a few days struggling with the backend Dockerfile issue that prevented us from running our final code using 'docker compose up'. After conducting tests, we discovered that the problem originated from the Dockerfile attempting to 'RUN pnpm migration:run' before the database was ready.

> Since we were unable to find a solution, we reached out to the class Discord for help. Fortunately, Kelsey had experienced the same issue and was able to provide some helpful resources. After discussing the problem with her, we were able to identify a solution.

> To resolve the issue, we created a .sh file that checked the health of the database and ensured that it was up and running before initiating migration and seeding. This approach proved successful, and we were finally able to run the final code using 'docker compose up'. Despite a few days on the challenge, we were grateful to have found a solution with the help of Kelsey and the class Discord community.

# Outside of the frontend/backend/database: 
> Clearning the code.

> Testing each components again.

> Formatting TailwindCSS/CSS.

> Adding some animation, color, style. 

> Commenting for code. 


Throughout this project, I encountered several minor issues as a newcomer to full-stack development. However, I was eager to take on challenges and learn from the experience. I want to express my gratitude to my colleague Nicholas for speaking his mind about our project. Even though we were frustrated with the bugs we encountered, we may raise our voices a bit but still dealt with each other in a professional and respectful manner to resolve the issues and achieve a successful outcome.

One thing I appreciate most about our team is our time management. Whenever we assign tasks to each other, we make a conscious effort to be responsible and complete them on time, unless we are dealing with particularly frustrating bugs. At the end of each day, we update each other on our progress by leaving a message in our Discord group chat.

**Outside of the class:**
While the project achieved our initial goals, there is still potential for improvement and additional functionality, as the current state of the tabs feels lacking in features. I intend to continue working on these enhancements after completing the current version of the project.

Despite these challenges, we were able to successfully build a functional and visually appealing web-based clicker game. This project provided us with a valuable opportunity to apply and expand our knowledge in these areas, and we feel more confident in our ability to design and develop software applications. 

Thank you for the term! 
~Anh Ho