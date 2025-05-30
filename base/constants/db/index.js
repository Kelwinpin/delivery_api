const dotenv = require('dotenv');
dotenv.config();

const db = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  dialect: 'postgres',
  logging: false,
};

module.exports = db;