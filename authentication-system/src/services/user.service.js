const prisma = require('../config/prisma');
const userRepository = require('../repositories/user.repository');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');

const createUser = async (userBody) => {
    if (await userRepository.getUserByEmail(userBody.email)) {
        throw new ApiError(400, 'Email already taken');
    }

    const hashedPassword = await bcrypt.hash(userBody.password, 8);

    const user = await userRepository.createUser({ ...userBody, password: hashedPassword });
    return user;
};

const getUserByEmail = async (email) => {
    return userRepository.getUserByEmail(email);
};

const getUserById = async (id) => {
    return userRepository.getUserById(id);
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
};
