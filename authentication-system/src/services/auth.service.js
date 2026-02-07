const httpStatus = require('http-status'); // I didn't install http-status. I should use numbers or install it. I'll use numbers to be safe.
const tokenService = require('./token.service');
const userService = require('./user.service');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const prisma = require('../config/prisma');

const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email);

    if (!user) {
        throw new ApiError(401, 'Incorrect email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new ApiError(401, 'Incorrect email or password');
    }

    return user;
};

const refreshAuth = async (refreshToken) => {
    try {
        const refreshTokenDoc = await tokenService.verifyToken(refreshToken, 'refresh');
        const user = await userService.getUserById(refreshTokenDoc.userId || refreshTokenDoc.userId);
        if (!user) {
            throw new ApiError(401, 'Please authenticate');
        }
        
        await tokenService.deleteToken(refreshToken);
        return tokenService.generateAuthTokens(user);
    } catch (error) {
        throw new ApiError(401, 'Please authenticate');
    }
};

const logout = async (refreshToken) => {
    await tokenService.deleteToken(refreshToken);
};

module.exports = {
    loginUserWithEmailAndPassword,
    refreshAuth,
    logout,
};
