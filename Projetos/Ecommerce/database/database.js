const Sequelize = require('sequelize');
const connection = new Sequelize('ecommerce', 'root', '1234', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

module.exports = connection;
