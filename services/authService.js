// services/authService.js
const userRepository = require("../repository/userRepository");

exports.loginUser = async (username, password) => {
    const bcrypt = require('bcryptjs');
    try {
        const user = await userRepository.findUserByUsername(username);

        if (!user) {
            return { success: false, message: 'Invalid username or password' };
        }

        const userPlain = user.get({ plain: true });
        const isPasswordValid = await bcrypt.compare(password, userPlain.password);

        if (!isPasswordValid) {
            return { success: false, message: 'Invalid username or password' };
        }

        return { success: true, user: userPlain };
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
