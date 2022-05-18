const express = require('express');

const server = express();

const port = process.env.PORT || 8181;

server.get('/', (req, res) => {
    console.log("OK");
    res.send('Bem vindo!');
});

server.get('/canal/youtube', (req, res) => {
    let { canal } = req.query;

    res.send(canal);
    
});

server.listen(port, (error)  => {
    if (error) {
        console.log("Erro: " + error);
    } else {
        console.log('Server running in port ' + port);
    }
    
})