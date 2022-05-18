const express  = require('express');
const server = express();

const port = process.env.PORT || 3001;

server.set('view engine', 'ejs');

// Public Static

server.use(express.static(__dirname + "/public"));

// URL Encoded formulario
server.use(express.urlencoded({extends: false}));
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).render('index');
});

server.listen(port, () => {
    console.log("Server is running on port " + port);
});