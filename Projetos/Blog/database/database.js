const Sequelize = require('sequelize');
const connection = new Sequelize('ecommerce', 'root', '', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    timezone: '-03:00',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = connection;
