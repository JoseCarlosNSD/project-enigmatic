const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const Respostas = require("./database/respostas");
const Users = require("./database/users")
const connection = require("./database/database")

connection.authenticate().then(()=>{
    console.log("Banco de dados conectado!")
})
.catch((erro)=>{
    console.log(erro)
})

//configurações body-parser ==> Permite extrair dados do body
app.use(bodyParser.urlencoded({extended: false}))//Apenas instancia do body-parser.
app.use(bodyParser.json())//???

app.set('view engine', 'ejs'); //Define o EJS como view engine
app.use(express.static('public'));//Permite usar arqivos estáticos ex.: paginas.css

app.get("/", (req, res) =>{
    res.render("./auth/project-enigmatic");
})
app.get("/login", (req, res)=>{
    res.render("./auth/login");
})
app.get("/signin", (req, res)=>{
    res.render("./auth/signin");   
})
app.post("/signin-save", (req, res)=>{
    var usuario = req.body.user;
    var senha = req.body.password;

    Users.findOne({
        where: {user: usuario}
    }).then((dadoRetornado)=>{
        if(dadoRetornado){
            res.send("usuário já existe");
        }
        else{
            Users.create({
                user: usuario,
                password: senha,
                checkpoint: 1,
            }).then(()=>{res.send("Usuário Criado")})
            .catch();
        }
    })  
    .catch() 
})
app.post("/login-save", (req, res)=>{
    var usuario = req.body.userLogin;
    var senha = req.body.passwordLogin;

    Users.findOne({
        where:{
            user: usuario,
            password: senha,
        }
    })
    .then((dadoRetornado)=>{
        if(dadoRetornado){
            var checkPoint = dadoRetornado.checkpoint;
            var id = dadoRetornado.id
            res.redirect(`/project-enigmatic/${id}/${checkPoint}`)
        
            
        }
        else{
            res.send("Usuário não erncontrado!")
        }
    })
    .catch();
    
})
app.get("/project-enigmatic/:user/:checkpoint", (req, res)=>{
    const checkPoint = req.params.checkpoint
    const user = req.params.user

    
        Respostas.findOne({
            where:{
                id: checkPoint, 
            }
        })
        .then((pergunta)=>{
            res.render(`./levels/${checkPoint}`, {pergunta, user} )
        })
    

})
app.post("/v/:user/?:checkpoint", (req, res)=>{

    const resposta = req.body.resposta;
    const checkPoint = req.params.checkpoint
    const user = req.params.user
    var next = parseInt(checkPoint);
    


    Respostas.findOne({
        where: {id: checkPoint}
    })
    .then((resp)=>{
        if(resp.answers === resposta){
            res.send("resposta correta")
            Users.update(
                {checkpoint: next + 1},
                {where: {id: user},}
            )
        }
        else{
            res.send("ERRADO")
        }
      
    })
    .catch()
})
  



app.listen(5100, ()=>{console.log("SERVER RUNNING...")})