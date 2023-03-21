# Anh Ho - CS 465P Full Stack Web Development - Winter 2023

>Although I tend to work independently on most projects, I decided to work in a team for the final project to enhance my teamwork skills and learn from my colleague. I reached out to Nicholas, who frequently attended our lectures, and thankfully he agreed to team up with me.

>We had some calls over Discord before finalizing the project topic. We considered several options but found it challenging to visualize their implementation. After discussing various possibilities, Nicholas proposed developing a web-based clicker game, and he shared some reference sites that helped me understand the concept. Ultimately, we agreed to proceed with this idea.

>Since this is a team project, we have been collaborating on the codebase throughout the development process, and our git history shows the effectiveness of our teamwork. 

>I based our codebase on the doggr file after completing HW2 and created "main," "anhho," and "nicholas" branches, which allowed us to work on our own branches and merge our code when ready.

# Regarding the backend and database, I was responsible for:

> testing all the routes, server, and database to ensure they were implemented correctly and working properly. Additionally, I made some changes to the server to address and fix CORS/preflight issues.

# On the frontend, my duties included: 

> Creating the user interface and a tab for testing purposes. 
> >I developed the "home," "info," and "about" tabs, using the "info" tab to test GET/POST/PUT/DELETE requests by communicating with the backend through the API. 
> >Additionally, I converted the game, which Nicholas initially developed using HTML, CSS, and JS, into TypeScript using React. I also implemented timer for the game, updated some game effects using CSS and TailwindCSS.
> >Set up Auth0 for user authentication, such as login and logout buttons.
# We encountered several major challenges during this project

>CORS and preflight issues: We discovered that only GET requests were working, while POST, DELETE, and PUT requests were failing due to CORS and preflight issues. It took us several days to diagnose the problem, but we eventually found a solution: to use an option request. This option request sends a preflight request to the server, asking for permission to perform a POST, DELETE, or PUT request. Once the server responds with permission, the frontend can then send the actual request. By using option requests, we were able to bypass the CORS and preflight issues and get the other request methods working.

> ...

> ...

> NOT DONE YET!

>Despite these challenges, we were able to successfully build a web-based 
clicker game that was both functional and visually appealing. Overall, this project provided us with a valuable opportunity to apply and expand our knowledge in these areas, and we feel more confident in our ability to design and develop software applications.