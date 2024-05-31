// services/questionService.js
const userRepository = require("../repository/userRepository");
const questionRepository = require("../repository/questionRepository");

exports.getUserAndQuestion = async (userId, checkpoint) => {
    try {
        const user = await userRepository.findUserById(userId);
        if (!user) {
            return { success: false, message: "User not found" };
        }

        if (user.checkpoint < checkpoint) {
            return { success: false, message: "Invalid checkpoint" };
        }

        const question = await questionRepository.findQuestionById(checkpoint);
        if (!question) {
            return { success: false, message: "Question not found" };
        }

        return { success: true, user, question };
    } catch (err) {
        throw new Error(err);
    }
};

exports.verifyAnswerAndUpdateCheckpoint = async (userId, checkpoint, answer) => {
    try {
        const question = await questionRepository.findQuestionById(checkpoint);
        if (!question) {
            return { success: false, message: "Question not found" };
        }

        if (question.answers === answer) {
            const nextCheckpoint = parseInt(checkpoint) + 1;
            await userRepository.updateUserCheckpoint(userId, nextCheckpoint);
            return { success: true, nextCheckpoint };
        } else {
            return { success: false, message: "Incorrect answer" };
        }
    } catch (err) {
        throw new Error(err);
    }
};
