const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const auth = require("./public/scripts/auth");

const connection = require("./database/database");
const rotas = require("./rotas");  // Importa o arquivo de rotas

app.use(express.static('public'));

connection.authenticate().then(() => {
})
.catch((erro) => {
    console.log(erro);
});

// Configurações body-parser
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.set('view engine', 'ejs'); 
app.use(express.static('public'));

app.use("/", rotas);  // Usa o arquivo de rotas

app.listen(5100, () => { 
    console.log("SERVER RUNNING..."); 
});
