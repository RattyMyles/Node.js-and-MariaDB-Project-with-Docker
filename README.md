# Node.js Express Docker Template
This template provides a basic setup for building a Node.js web application using the Express.js framework, and containerized with Docker. It includes a Dockerfile for building a Docker image and a Docker Compose configuration for easy deployment.

## Features
- **Node.js & Express.js: A minimal setup for creating a web server using Node.js with the Express.js framework.
- **Dockerized: Utilizes Docker for containerization, enabling consistent and reproducible environments across different systems.
- **Docker Compose: Includes a Docker Compose configuration for orchestrating multiple containers, simplifying the deployment process.

## Prerequisites
- Ensure Docker is installed.
- Confirm Docker Compose is installed.

## Application Structure
- **app/server.js**: The central application file orchestrating the Express setup.
- **app/db.js**: The configuration hub for the database along with connection pool setup.
- **Dockerfile**: A tailored Dockerfile facilitating containerization.
- **docker-compose.yml**: Docker Compose configuration streamlining multi-container orchestration.
- **demo.sql**: Preconfigured SQL commands executed during boot-up for table and user creation.

## Diagram

![Node.js and MariaDB](https://github.com/RattyMyles/Node.js-and-MariaDB-Project-with-Docker/assets/9049829/5491e299-dfcd-4778-896b-41892efcfc2c)

## Docker Compose Setup
**Version:** The Docker Compose file format version, set to "3."

**Services:**
- **Node Service (`node`):**
  - **Image:** Docker image sourced from `rattymyles/docker-express-api` repository with the `latest` tag.
  - **Container Name:** Defined as `express-api` for the Node.js container.
  - **Ports:** Mapping host port 8080 to container port 8080.
  - **Environment:** Configured environment variables, communicated to the Node.js application in `db.js`, defining MariaDB connection details.
  - **Networks:** Connection to a custom bridge network named `docker-service`.
  - **Depends On:** Ensures that the `node` service starts only after the `mariadb` service is up and running.

- **MariaDB Service (`mariadb`):**
  - **Image:** Utilizes the official MariaDB image from the repository with the `latest` tag.
  - **Container Name:** Set as `docker-mariadb` for the MariaDB container.
  - **Ports:** Maps host port 3306 to container port 3306.
  - **Environment:** Configuration of the root password for MariaDB.
  - **Networks:** Connection to the custom bridge network named `docker-service`.
  - **Volumes:** Mounts two volumes:
    - `maria-data:/data/db`: Persists MariaDB data on the host machine.
    - `./demo.sql:/docker-entrypoint-initdb.d/demo.sql`: Copies the `demo.sql` file to the MariaDB container, executing SQL commands during initialization.

**Networks:**
- Defines a custom bridge network named `docker-service` facilitating seamless communication between the `node` and `mariadb` services.

**Volumes:**
- `maria-data:` Creates a named volume ensuring persistence for MariaDB data on the host machine.

This Docker Compose configuration seamlessly sets up a Node.js application, a MariaDB database, and all necessary connections and configurations for a cohesive and efficient runtime environment.

## Getting Started

1. Clone this repository:

    ```bash
    git clone https://github.com/RattyMyles/Node.js-and-MariaDB-Project-with-Docker.git
    cd Node.js-and-MariaDB-Project-with-Docker
    ```

2. Navigate to the `app` folder containing the Dockerfile. Build a container to package the Node.js files:

    ```bash
    docker build -t rattymyles/docker-express-api .
    ```

3. Once built, return to the parent directory and run the `docker-compose.yml` file:

    ```bash
    docker compose up
    ```
    or run it in detached mode:
   ```
   docker compose up -d
   ```
   Detached Mode: Containers run in the background, and the terminal becomes available for further commands without being attached to the container logs.

## API Endpoints Testing

### GET /tasks
Fetches all tasks from the database.

```bash
curl localhost:8080/tasks
```

### POST /tasks
Creates a new task. Requires a JSON payload with a `description` property.

```bash
curl -X POST -d "description=HelloWorld" localhost:8080/tasks
```


## Tear down
Once you are finished, you can stop the containers:
```
docker compose down
```
If you wish to delete the volume data to start fresh:
```
docker compose down -v
```

## Feedback
Please do get in touch for any feedback or anything. I'll respond :)
