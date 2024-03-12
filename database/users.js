const Sequielize = require("sequelize");
const connection = require("./database");
//"Pergunta", seria a tabelas.
const userDB = connection.define("userDB",{
    user:{type: Sequielize.STRING, allowNull: false},
    password:{type: Sequielize.STRING, allowNull: false},
    checkpoint:{type: Sequielize.INTEGER, allowNull: false}
});
//Sicronizar o codigo com o banco. E o force diz q ele não ira forcçar caso a tabela já existe. 
userDB.sync({force: false}).then(()=>{console.log("Banco de usuarios sincronizado!!!!!!")}).catch();

module.exports = userDB;