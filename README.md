# Interactive Campus Mapping System for CMU

### How to run it
- clone the repo, open a terminal, and cd into it
- run the following commands to build the docker containers
    - $ docker-compose build
        - builds the containers
    - $ docker-compse up
        - runs the containers
- Here are the default ports for the containers (this can be changed in docker-compose and dockerfiles)
    - frontend: 3000
    - backend: 9000
    - mongo-express: 8081
    - tip: you can build and run an individual container by adding their name after the "$ docker-compose" x command (i.e. $ docker-compose up backend)
- You have to initialize the MongoDB too
    1) After building the containers and running them connect to mongo-express (localhost:8081 in browser)
    2) Go into a bash terminal for the mongo container, these are ways to do this
        - Enter $ docker exect -it <name of container> /bin/bash (names can be gotten through $ docker ps)
        - Enter docker-desktop, click on the 3 dots to the right of the mongo container, click 'open terminal'
    3) Enter 'mongosh' to start the mongo shell
    4) Enter 'use admin'
    5) Enter 'db.auth('root','example')
        - For production, recommened to use a different password and username
    6) Enter db.createUser({user: "devUser", pwd: "test", roles: [{role: "readWrite", db: "dev"}]})
        - Same here, just make sure that the backend and middleware are able to access the DB
    7) Exit the terminal, restart the container and everything should be ready to go
