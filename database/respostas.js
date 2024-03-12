const Sequielize = require("sequelize");
const connection = require("./database");
//"Pergunta", seria a tabelas.
const EnigmaticDB = connection.define("enigmatic_db",{
    asks:{type: Sequielize.STRING, allowNull: true},
    answers:{type: Sequielize.STRING, allowNull: false},
});
//Sicronizar o codigo com o banco. E o force diz q ele não ira forcçar caso a tabela já existe. 
EnigmaticDB.sync({force: false}).then(()=>{console.log("Banco de dados sincronizado!!!!!!")}).catch();

module.exports = EnigmaticDB;