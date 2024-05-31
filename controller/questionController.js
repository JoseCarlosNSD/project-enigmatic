// controller/questionController.js
const questionService = require("../services/questionService");

exports.getProjectEnigmatic = async (req, res) => {
    const checkPoint = req.params.checkpoint;
    const user = req.params.user;

    try {
        const result = await questionService.getUserAndQuestion(user, checkPoint);

        if (!result.success) {
            res.send(result.message);
        } else {
            res.render(`./levels/${checkPoint}`, { pergunta: result.question, returnedUser: result.user });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.verifyAnswer = async (req, res) => {
    const respostas = req.body.resposta;
    const checkPoint = req.params.checkpoint;
    const user = req.params.user;

    try {
        const result = await questionService.verifyAnswerAndUpdateCheckpoint(user, checkPoint, respostas);

        if (result.success) {
            res.redirect(`/project-enigmatic/${user}/${result.nextCheckpoint}`);
        } else {
            res.send(result.message);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};
