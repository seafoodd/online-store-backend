const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASSWORD, // Database password
  {
    dialect: 'postgres', // Database dialect
    host: process.env.DB_HOST, // Database host
    port: process.env.DB_PORT, // Database port
  }
);
