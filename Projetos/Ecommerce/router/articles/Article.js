const Sequelize = require('sequelize');
const db = require('../../database/database');
const Category = require('../categories/Category');



const Article = db.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article); // UMA Categoria tem muitos artigos

Article.belongsTo(Category); // UM Artigo pertence a uma categoria

// Article.sync({force: true});

module.exports = Article;
