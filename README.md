# Node.js and MariaDB Project with Docker

Explore a meticulously crafted Node.js application leveraging the Express framework, seamlessly integrated with MariaDB to adeptly handle both GET and POST requests related to tasks. Elevating the development experience, the inclusion of Docker and Docker Compose configurations ensures a fluid containerization process.

## Prerequisites
- Docker installation is required.
- Ensure Docker Compose is installed.

## Application Structure
- **app/server.js**: Central application file orchestrating the Express setup.
- **app/db.js**: Configuration hub for the database along with connection pool setup.
- **app/Dockerfile**: Tailored Dockerfile facilitating containerization.
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
