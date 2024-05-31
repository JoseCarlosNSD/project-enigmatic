// rotas.js
const express = require("express");
const router = express.Router();

const Users = require("./database/users");
const Respostas = require("./database/respostas");

// Página inicial
router.get("/", (req, res) => {
    res.render("./auth/project-enigmatic");
});

// Página de login
router.get("/login", (req, res) => {
    var erro = false;
    res.render("./auth/login", {erro});
});

router.post("/login-save", (req, res) => {
    var usuario = req.body.userLogin;
    var senha = req.body.passwordLogin;
    var erro = false;
    Users.findOne({
        where: {
            user: usuario,
            password: senha,
        }
    })
    .then((dadoRetornado) => {
        if(dadoRetornado) {
            req.app.locals.user = dadoRetornado.id;
            var checkPoint = dadoRetornado.checkpoint;

            res.redirect(`/project-enigmatic/${req.app.locals.user}/${checkPoint}`);
        } else {
            erro = true;
            res.render("./auth/login", {erro});
        }
    })
    .catch(err => {
        console.log(err);
    });
});

// Página de cadastro
router.get("/signin", (req, res) => {
    var erroP = false;
    var erroU = false;
    var alreadyExists = false;
    res.render("./auth/signin", {erroP, erroU, alreadyExists});
});

router.post("/signin-save", (req, res) => {
    var usuario = req.body.user;
    var senha = req.body.password;
    var erroP = false;
    var erroU = false;
    var alreadyExists = false;

    if(usuario.length < 4) {
        erroU = true;
        res.render("./auth/signin", {erroP, erroU, alreadyExists});
    } else {
        if(senha.length < 8) {
            erroP = true;
            res.render("./auth/signin", {erroP, erroU, alreadyExists});
        } else {
            Users.findOne({
                where: { user: usuario }
            })
            .then((dadoRetornado) => {
                if(dadoRetornado && dadoRetornado.user === usuario) {
                    alreadyExists = true;
                    res.render("./auth/signin", {erroP, erroU, alreadyExists});
                } else {
                    Users.create({
                        user: usuario,
                        password: senha,
                        checkpoint: 1,
                    })
                    .then(() => { res.render("./auth/signin-confirmed"); })
                    .catch(err => {
                        console.log(err);
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
});

// Página do projeto enigmático
router.get("/project-enigmatic/:user/:checkpoint?", (req, res) => {
    const checkPoint = req.params.checkpoint;
    const user = req.params.user;
    Users.findOne({
        where: { id: user }
    })
    .then((returnedUser) => {
        if(returnedUser.checkpoint < checkPoint || user != req.app.locals.user) {
            res.send("Você não pode fazer isso");
        } else {
            Respostas.findOne({
                where: { id: checkPoint }
            })
            .then((pergunta) => {
                res.render(`./levels/${checkPoint}`, {pergunta, returnedUser});
            });
        }
    })
    .catch(err => {
        console.log(err);
    });
});

// Verificação de respostas
router.post("/v/:user/:checkpoint?", (req, res) => {
    const respostas = req.body.resposta;
    const checkPoint = req.params.checkpoint;
    const user = req.params.user;
    var next = parseInt(checkPoint) + 1;

    Respostas.findOne({
        where: { id: checkPoint }
    })
    .then((resp) => {
        if(resp.answers === respostas) {
            Users.update(
                { checkpoint: next },
                { where: { id: user } }
            )
            .then(() => {
                res.redirect(`/project-enigmatic/${user}/${next}`);
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            res.send("ERRADO");
        }
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;
