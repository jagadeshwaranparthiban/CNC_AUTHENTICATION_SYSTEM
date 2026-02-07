const jwt = require('jsonwebtoken');
const moment = require('moment'); 
const config = require('../config/config');
const tokenRepository = require('../repositories/token.repository');
const { ApiError } = require('../utils/ApiError');

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(expires.getTime() / 1000),
        type,
    };
    return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    return tokenRepository.saveToken(token, userId, expires, type, blacklisted);
};

const deleteToken = async (token) => {
    return tokenRepository.deleteToken(token);
};

const verifyToken = async (token, type) => {
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenDoc = await tokenRepository.findToken(token);
    
    if (!tokenDoc) {
        throw new ApiError(401, 'Token not found');
    }
    return tokenDoc;
};

const generateAuthTokens = async (user) => {
    const accessTokenExpires = new Date();
    accessTokenExpires.setMinutes(accessTokenExpires.getMinutes() + config.jwt.accessExpirationMinutes);

    const accessToken = generateToken(user.id, accessTokenExpires, 'access', 'secret');

    const refreshTokenExpires = new Date();
    refreshTokenExpires.setDate(refreshTokenExpires.getDate() + config.jwt.refreshExpirationDays);
    const refreshToken = generateToken(user.id, refreshTokenExpires, 'refresh');

    await saveToken(refreshToken, user.id, refreshTokenExpires, 'refresh');

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires,
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires,
        },
    };
};

module.exports = {
    generateToken,
    saveToken,
    verifyToken,
    generateAuthTokens,
    deleteToken,
};
