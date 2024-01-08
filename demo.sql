-- Check if the database exists
CREATE DATABASE IF NOT EXISTS todo;
USE todo;

-- Check if the table exists
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(200),
    completed BOOLEAN DEFAULT false
);

CREATE USER IF NOT EXISTS 'app_user'@'%' IDENTIFIED BY 'Password123!';
GRANT ALL PRIVILEGES ON todo.* TO 'app_user'@'%';
FLUSH PRIVILEGES;
