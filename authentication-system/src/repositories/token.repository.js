const prisma = require('../config/prisma');

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    const data = {
        token,
        userId,
        expiresAt: expires,
        revoked: blacklisted,
    };
    if (type) {
        data.type = type;
    }
    return prisma.refreshToken.create({
        data,
    });
};

const findToken = async (token) => {
    return prisma.refreshToken.findUnique({
        where: { token },
    });
};

const deleteToken = async (token) => {
    return prisma.refreshToken.delete({
        where: { token }
    })
}

module.exports = {
    saveToken,
    findToken,
    deleteToken
};
