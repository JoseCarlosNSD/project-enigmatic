// services/authService.js
const userRepository = require("../repository/userRepository");

exports.loginUser = async (username, password) => {
    try {
        const user = await userRepository.findUserByUsername(username);
        return user;
    } catch (err) {
        throw new Error(err);
    }
};

exports.registerUser = async (username, password) => {
    try {
        const existingUser = await userRepository.findUserByUsername(username);
        if (existingUser) {
            return { success: false, message: "User already exists" };
        }

        return await userRepository.createUser(username, password);
    } catch (err) {
        throw new Error(err);
    }
};
