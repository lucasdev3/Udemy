const Sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false})
    .then((results) => {
        console.log("Tabela criada");
    })
    .catch((error) => {
        console.log("Erro na model Pergunta: " + error);
    })
    
module.exports = Pergunta;