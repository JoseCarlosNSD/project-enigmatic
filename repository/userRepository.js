// repository/userRepository.js
const Users = require("../database/users");

exports.findUserByUsername = async (username) => {
    try {
        return await Users.findOne({ where: { user: username } });
    } catch (err) {
        throw new Error(err);
    }
};

exports.createUser = async (username, password) => {
    try {
        await Users.create({
            user: username,
            password: password,
            checkpoint: 1,
        });

        return { success: true };
    } catch (err) {
        throw new Error(err);
    }
};

exports.findUserById = async (userId) => {
    try {
        return await Users.findOne({ where: { id: userId } });
    } catch (err) {
        throw new Error(err);
    }
};

exports.updateUserCheckpoint = async (userId, checkpoint) => {
    try {
        await Users.update(
            { checkpoint: checkpoint },
            { where: { id: userId } }
        );
    } catch (err) {
        throw new Error(err);
    }
};