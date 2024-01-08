# Node.js and MariaDB Project with Docker
This project demonstrates a simple Node.js application using the Express framework and MariaDB for handling GET and POST requests related to tasks. 
Additionally, it includes Docker and Docker Compose configuration for containerisation. 
I'll be explaining each stage and how to deploy if you'd just want to use this as a demo. 

## Prerequisites
- Docker installed
- Docker Compose installed


## Application Structure
app/server.js: Main application file with Express setup.
app/db.js: Database configuration and connection pool setup.
app/Dockerfile: Dockerfile for containerisation.
docker-compose.yml: Docker Compose configuration.
demo.sql: preset sql commands on boot up to create a table and user.


## Diagram

![nodejsmariadb](https://github.com/RattyMyles/Node.js-and-MariaDB-Project-with-Docker/assets/9049829/5491e299-dfcd-4778-896b-41892efcfc2c)






## API Endpoints
### GET /tasks
Fetches all tasks from the database.
```
curl localhost:8080/tasks
```
### POST /tasks
Creates a new task. Requires a JSON payload with a description property.
```
curl -X POST -d "descriptption=HelloWorld" localhost:8080/tasks
```
