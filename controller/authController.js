// controller/authController.js
const authService = require("../services/authService");

exports.loginSave = async (req, res) => {
    const usuario = req.body.userLogin;
    const senha = req.body.passwordLogin;
    let erro = false;

    try {
        const user = await authService.loginUser(usuario, senha);
        if (user) {
            req.app.locals.user = user.id;
            const checkPoint = user.checkpoint;
            res.redirect(`/project-enigmatic/${req.app.locals.user}/${checkPoint}`);
        } else {
            erro = true;
            res.render("./auth/login", { erro });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.signin = (req, res) => {
    let erroP = false;
    let erroU = false;
    let alreadyExists = false;
    res.render("./auth/signin", { erroP, erroU, alreadyExists });
};

exports.login = (req, res) => {
    let erro = false;
    res.render("./auth/login", { erro });
};

exports.signinSave = async (req, res) => {
    let usuario = req.body.user;
    let senha = req.body.password;
    let erroP = false;
    let erroU = false;
    let alreadyExists = false;

    if (usuario.length < 4) {
        erroU = true;
        res.render("./auth/signin", { erroP, erroU, alreadyExists });
    } else if (senha.length < 8) {
        erroP = true;
        res.render("./auth/signin", { erroP, erroU, alreadyExists });
    } else {
        try {
            const result = await authService.registerUser(usuario, senha);
            if (result.success) {
                res.render("./auth/signin-confirmed");
            } else {
                alreadyExists = true;
                res.render("./auth/signin", { erroP, erroU, alreadyExists });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    }
};
