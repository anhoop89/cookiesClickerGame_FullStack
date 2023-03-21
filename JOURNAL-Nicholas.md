Nicholas Nguyen - CS 465P Full Stack Web Development - Winter 2023

After having that first meeting with Instructor Casey and pitching the ideas I had,
    I felt more confident about how I wanted to tackle the project. Additionally, 
    it was super fortunate that Anh also reached out to me around the same time and 
    asked if I wanted to work with him for the project.

Because of the reinforcement of the meeting and having a partner I could bounce ideas
    off of, I was able to get a basic structure/layout of the project in my mind and then
    pitch the full project to Anh. After the pitch where Anh accepted the idea of our
    project, I created a basic structure of a toolbar, a few pages, and the game design
    through the use of HTML, CSS, and JS that I had learned from the Web Development class.
    The game functions I created initially was the framework that was used in the final
    project's submission. 

From what was being taught in class and the homeworks, Anh and I agreed it would be better to use
    doggr as our project's framework and adjusting the code from there to fit what we needed.

On the backend/database side of things, I was responsible for:     
    - the creation of the routes that would be used to communicate from frontend->backend->database
        and vice-versa
    - the creation of the migrations and seeding for the database tables
        - creating the database structure and communication for storing:
            - user information
            - game information
            - user submitted comments 

On the frontend side of things, I was responsible for:
    - the creation and communication of the game's core functionality (Play tab)
        - including proper coding for clicks, auto-clicker, and GET/POST/PUT of game data to backend
    - the creation of the user's output and design of their settings (Settings tab)
    - the creation and communication of the users suggestions functionality (Contact tab)
    - the creation of the basic layout for users to learn more about us and the project (About tab)
    - the CSS related to the previously mentioned tabs

Outside of the core frontend/backend/database work that I did, I also helped:
    - clean up unused code
    - added comments to functions and other things that were ambiguous
    - tested functionalities working together as they were added in or removed from the project 

With how Anh and I were working on this project, not only were we responsible for the parts that we 
    had picked up, but we also went back and forth during the entire development process to ensure that 
    the code written on both our ends were meshing properly. Lots of time spent over Discord having 
    screensharing calls and messages that went into the testing processes and making small code 
    changes back and forth where only one or the other of us needed to make a change and submit the
    change to our repos. These will be more obvious when looking at the git commits near the
    end of the project, as I had issues with building the project on my computer, and the changes and
    issues we had were more effective working on potential solutions through one computer rather than two
    and trying to figure out which parts would've worked or didn't.

Some of the biggest issues that we ran into during this project (as well as end solution/result) were:
    - creation of migrations that added additional lines of SQL when unnecessary
        - even at this point, we don't know exactly why a new migration would lead to creating a
            new table and throwing an error, instead of checking for the existing table first. 
        - However, the solution to deleting those specific lines of SQL in the migrations files lead 
            to a successful creation/implementation for our project.
    - getting and referencing the proper user tokens that were being passed back and forth in both
        the frontend and backend
        - during the process of creating the database tables and creating the relations between them
            (specifically User and GameData relationship), because of how it was modified from a 
            Many-to-One relation to One-to-One, the process had GameData referenced as an array. There
            are points in our frontend code where we weren't able to call GameData from a User object
            unless we called it through an array, and it slowed down our development until we realized
            that. 
        - Unfortunately, we were so far in the process and with not enough time left, instead
            of going back and fixing the relation to not need to call the reference through an array, 
            we left it as is and had the frontend work a little 'harder' to find the information it 
            needed
    - changes to the game's core functionality when changing upgrades to become an autoclicker
        - the original game functionality had users playing with two potential upgrades where the first
            upgrade increased a click's worth by 1 and the second upgrade increased a click's worth by 5.
            The second upgrade was a placeholder until we could get to the actual development of the
            frontend. Changing the second upgrade's functionality to an autoclicker happened near the
            tailend of the frontend development process. Most of everything else was already functioning
            properly and we had all the CSS ready to go. The autoclicker change set us back a couple days
            as it only functioned in specific scenarios (i.e. only when a user logged in and only when
            they had already had the upgrade purchased).
        - The issues came down to:
            - when the autoclicker function itself was being called (whether it was on page load,
                button click, etc.)
            - what checks we had to ensure the autoclicker was only called once to ensure that the
                autoclicker was not constantly calling itself and creating an exponential increase of
                autoclickers
            - and the check to see if a user was authorized
                - in this scenario, we had forgotten to allow a user to play the game without logging in
                    and so if the page did not find an authorized user on the page, it would output
                    nothing for the game functionalities
        - Solutions included doing a small revamp of how the Play tab operated, and how the functions for
            gameplay was working (including creating helper functions that did checks on whether an 
            upgrade was purchased and changing an autoclick flag if having the autoclicker on was allowed)
    - CSS issues when trying to push out a full build of the project
        - CSS is the bane of all frontend developers (or so I'm  told) and I agree with this statement
    - docker-compose.yaml not producing the expected results for backend communication/migration/seeding
        - By far the biggest issue was not being able to properly run our final code as Instructor Casey
            said he would (using 'docker compose up') and getting everything to run.
        - After testing, the issue was narrowed down to the backend Dockerfile attempting to
            'RUN pnpm migration:run' before the database was ready
            - this was figured out because outside of using the Dockerfile, the project would fully
                run when running the code line-by-line as well as commenting out the problematic code
                line (as well as seeding) inside of the Dockerfile.
        - A solution would most likely not have been found, HOWEVER, Kelsey had run into the exact same
            issue (as found on the class Discord). After reaching out to her and talking over the issue,
            Kelsey sent over a few websites that she thought would help fix our issue as she used them 
            to fix hers.
        - The solution to this problem was to create a .sh file to more or less make a health check on 
            the database and to ensure it was up and running prior to migration and seeding.
    - The last issue (that I personally ran into) was that my computer was having some kind of issue that
            prevented me from properly using the 'pnpm' command.
        - This set back a lot of our final testing and it led to Anh and I having quite a lot of late 
            nights working on his VSCode through Discord Screensharing.
        - I was able to borrow a laptop to work through a solution for the backend Dockerfile not working,
            however, even that part of the code was needed to be sent through Discord and having Anh test
            it on his end to ensure that it was working properly.
                - Anh, if you end up reading this, sorry again dude.

Outside of all that, future plans for this project:
    - Come back in a few months and create a few more functionalities for the game
    - Fully implement the project into a working website like doggr was and have it available for the masses

Thanks for the term!
~Nicholas Nguyen
