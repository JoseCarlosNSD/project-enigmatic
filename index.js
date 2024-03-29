
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const auth = require("./public/scripts/auth")

const Respostas = require("./database/respostas");
const Users = require("./database/users")
const connection = require("./database/database")





app.use(express.static('public'));

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
    var erro = false;
    res.render("./auth/login", {erro});
})
app.post("/login-save", (req, res)=>{
    var usuario = req.body.userLogin;
    var senha = req.body.passwordLogin;
    var erro = false;

    Users.findOne({

        where:{
            user: usuario,
            password: senha,
        }
    })
    .then((dadoRetornado)=>{
        
        if(dadoRetornado){
            app.locals.user = dadoRetornado.id;
            var checkPoint = dadoRetornado.checkpoint;

            res.redirect(`/project-enigmatic/${app.locals.user}/${checkPoint}`)    
        }
        else{
            erro = true
            res.render("./auth/login", {erro})
        }
    })
    .catch();
    
})
app.get("/signin", (req, res)=>{
    var erroP = false;
    var erroU = false;
    var alreadyExists = false;
    res.render("./auth/signin", {erroP, erroU, alreadyExists});   
})
app.post("/signin-save", (req, res)=>{
    var usuario = req.body.user;
    var senha = req.body.password;
    var erroP = false;
    var erroU = false;
    var alreadyExists = false;

    if(usuario.length < 4){
        erroU = true
        res.render("./auth/signin", {erroP, erroU, alreadyExists})   
    }
    else{
        if(senha.length < 8){
            erroP = true
            res.render("./auth/signin", {erroP, erroU, alreadyExists})
        }
        else{
             Users.findOne({
                where: {user: usuario}
                })
                .then((dadoRetornado)=>{
                    
                    if(dadoRetornado && dadoRetornado.user === usuario){
                        alreadyExists = true;
                        res.render("./auth/signin", {erroP, erroU, alreadyExists});
                    }
                else{
                    Users.create({
                        user: usuario,
                        password: senha,
                        checkpoint: 1,
                    })
                    .then(()=>{res.render("./auth/signin-confirmed")})
                    .catch();
                    }
                })  
                .catch()  
        }       
    }


    
       
    

  
})


app.get("/project-enigmatic/:user/?:checkpoint", (req, res)=>{
    const checkPoint = req.params.checkpoint
    const user = req.params.user
    Users.findOne({
        where: {id: user}
    })
    .then((returnedUser)=>{
        if(returnedUser.checkpoint < checkPoint || user != app.locals.user){
            res.send("Você nao pode fazer isso")
        }
        else{
            Respostas.findOne({
                where:{
                    id: checkPoint, 
                }
            })
            .then((pergunta)=>{
                res.render(`./levels/${checkPoint}`, {pergunta, returnedUser} )
            })
        }
    })
    

    
       
    

})
app.post("/v/:user/?:checkpoint", (req, res)=>{

    const respostas = req.body.resposta;
    const checkPoint = req.params.checkpoint
    const check_point = req.params.checkpoint
    const user = req.params.user;
    var next = parseInt(check_point) + 1;
    


    Respostas.findOne({
        where: {id: checkPoint}
    })
    .then((resp)=>{
        
        if(resp.answers === respostas){
            Users.update(
                {checkpoint: next},
                {where: {id: user},}
            )
            res.redirect(`/project-enigmatic/${user}/${next}`);
        }
        else{
            res.send("ERRADO")
        }
        
    })
    .catch()
})
  



app.listen(5100, ()=>{console.log("SERVER RUNNING...")})