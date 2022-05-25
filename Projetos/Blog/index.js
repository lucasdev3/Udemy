const express  = require('express');
const db = require('./database/database');
const server = express();
const homeControllers = require('./router/home/homeControllers');
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

server.use(homeControllers);

server.listen(port, () => {
    console.log("Server is running on port " + port);
});