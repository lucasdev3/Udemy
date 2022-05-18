var http = require('http')


http.createServer((req, res) => {

    res.end('<p>Bem vindo ao site</p>')


}).listen(8181);