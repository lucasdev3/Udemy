const express  = require('express');

const db = require('./database/database');

const categoriesController = require('./router/categories/CategoriesController');
const articlesController = require('./router/articles/ArticlesController');

const Article = require('./router/articles/Article');
const Category = require('./router/categories/Category');

const server = express();

const port = process.env.PORT || 3001;

// VIEWS

server.set('view engine', 'ejs');

// Public Static

server.use(express.static(__dirname + "/public"));

// URL Encoded formulario
server.use(express.urlencoded({extended: false}));
server.use(express.json());


// DB

db.authenticate()
    .then(() => {
        console.log('Conexão feita com suceso!');
    })
    .catch((error) => {
        console.log(error);
    })


server.use('/', categoriesController);
server.use('/', articlesController);


server.get('/', (req, res) => {
    res.status(200).render('index');
});

server.listen(port, () => {
    console.log("Server is running on port " + port);
});