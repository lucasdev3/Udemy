const Sequelize = require('sequelize');
const connection = new Sequelize('u202105582_ecommerce', 'u202105582_ecommerce', 'Friend@21', {
    host: '194.195.84.103',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = connection;
