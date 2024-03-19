
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
    res.render("./auth/login");
})
app.get("/signin", (req, res)=>{
    res.render("./auth/signin");   
})


app.post("/signin-save", (req, res)=>{
    var usuario = req.body.user;
    var senha = req.body.password;
    var erro = false;

    if(usuario.length < 4){
        erro = true
        res.render("./auth/signin", {erro})
        console.log("nome pequeno")
    }
    else{
        console.log("nome aceito")
        res.render("./auth/login", {erro})
    }


    
        // Users.findOne({
        //     where: {user: usuario}
        // }).then((dadoRetornado)=>{
        //     if(dadoRetornado){
        //         res.send("usuário já existe");
        //     }
        //     else{
        //         Users.create({
        //             user: usuario,
        //             password: senha,
        //             checkpoint: 1,
        //         }).then(()=>{res.send("Usuário Criado")})
        //         .catch();
        //     }
        // })  
        // .catch() 
    

  
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
            app.locals.user = dadoRetornado.id;
            var checkPoint = dadoRetornado.checkpoint;

            res.redirect(`/project-enigmatic/${app.locals.user}/${checkPoint}`)
        
            
        }
        else{
            res.send("Usuário não erncontrado!")
        }
    })
    .catch();
    
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