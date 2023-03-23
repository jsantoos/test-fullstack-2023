const { Sequelize } = require('sequelize');
require('dotenv').config({ path: 'C:\\Users\\msn-j\\Starti\\v1\\.env'});

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  dialectOptions: {
    connectTimeout: 60000, // 60 segundos
  },
});

module.exports = sequelize;
