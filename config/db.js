const Sequelize = require('sequelize');
const dotenv = require('dotenv'); // Import dotenv

// Load environment variables from .env
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: '127.0.0.1',  // Your MySQL server host
  dialect: 'mysql',   // The dialect for MySQL
});


module.exports = sequelize