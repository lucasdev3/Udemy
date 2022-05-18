const express = require('express');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');
const server = express();

const port = process.env.PORT || 3001;

server.set('view engine', 'ejs');
server.use(express.static(__dirname + ('/public')));
server.use(express.json());
server.use(express.urlencoded({extended: false}));


//Database

connection.authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((error) => {
        console.log("Erro de conexão com DB: " + error);
    })


// ROTAS GET

server.get('/', (req, res) => {

    Pergunta.findAll({
        raw: true, 
        order:[
            ['id', 'DESC']
        ]
    })
        .then((results) => {
            console.log(results);
            return res.status(200).render('index', {results});
        })
        .catch((error) => {
            console.log(error);
        })  
});


server.get('/perguntar', (req, res) => {
    res.status(200).render('perguntar');
});

server.get('/pergunta/:id', (req, res) => {
    let { id } = req.params;

    Pergunta.findOne({
        where: { id: id },
        raw: true
    })
        .then((pergunta) => {
            if(pergunta) {
                console.log(pergunta)

                Resposta.findAll({
                    raw: true,
                    where: {perguntaId: pergunta.id}
                })
                    .then((resposta) => {
                        if(resposta) {
                            console.log(resposta)
                            return res.render('pergunta', { pergunta: pergunta, resposta: resposta });
                        } else {
                            return res.redirect('/');
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
          
            }else {
                return res.redirect('/');
            }
        })
        .catch((error) => {
            console.log("Erro: " + error)
        })
});

// ROTAS POST

server.post('/cadastrar-pergunta', (req, res) => {
    const { titulo, descricao } = req.body;
    console.log(titulo, descricao);

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    })
        .then((results) => {
            console.log("Pergunta registrada: " + results);
            return res.redirect('/');
        })
        .catch((error) => {
            console.log("Erro ao registrar pergunta no banco de dados: " + error);
            return res.redirect('/perguntar')
        })
})

server.post('/cadastrar-resposta/:id', (req, res) => {
    const { id } = req.params;

    const { descricao } = req.body;

    console.log(id, descricao);

    Resposta.create({
        perguntaId: id,
        corpo: descricao
    })
        .then((response) => {
            console.log("Resposta cadastrada")
            return res.redirect('/pergunta/' + id);
        })
        .catch((error) => {
            console.log(error)
        })

    

})


server.listen(port, (error) => {
    if(error) {
        console.log("Error: " + error );
    } else {
        console.log("Server is running in port " + port);
    }
});