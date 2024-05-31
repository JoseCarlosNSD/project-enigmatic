// rotas.js
const express = require("express");
const router = express.Router();

const authController = require("./controller/authController");
const questionController = require("./controller/questionController");

// Página inicial
router.get("/", (req, res) => {
    res.render("./auth/project-enigmatic");
});

router.post("/login-save", authController.loginSave);
router.get("/login", authController.login);
router.get("/signin", authController.signin);
router.post("/signin-save", authController.signinSave);
router.post("/v/:user/:checkpoint?", questionController.verifyAnswer);
router.get("/project-enigmatic/:user/:checkpoint?", questionController.getProjectEnigmatic);

module.exports = router;
