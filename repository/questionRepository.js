// repository/questionRepository.js
const Respostas = require("../database/respostas");

exports.findQuestionById = async (questionId) => {
    try {
        return await Respostas.findOne({ where: { id: questionId } });
    } catch (err) {
        throw new Error(err);
    }
};
