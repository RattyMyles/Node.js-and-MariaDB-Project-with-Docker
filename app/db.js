require('dotenv').config(); // Load environment variables from .env file

var mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Expose the ability to create new connections
module.exports = {
  pool: pool
};
