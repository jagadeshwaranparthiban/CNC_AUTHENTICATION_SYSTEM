const prisma = require('../config/prisma');

const createUser = async (userBody) => {
    const created = await prisma.user.create({
        data: userBody,
    });
    
    if (created && Object.prototype.hasOwnProperty.call(created, 'password')) {
        const safe = { ...created };
        delete safe.password;
        return safe;
    }
    return created;
};

const getUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (user && Object.prototype.hasOwnProperty.call(user, 'password')) {
        const safe = { ...user };
        delete safe.password;
        return safe;
    }
    return user;
};

const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id },
    });
    if (user && Object.prototype.hasOwnProperty.call(user, 'password')) {
        const safe = { ...user };
        delete safe.password;
        return safe;
    }
    return user;
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
};
