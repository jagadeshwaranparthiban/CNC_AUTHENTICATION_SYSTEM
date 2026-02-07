const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { ApiError } = require('../utils/ApiError');
const prisma = require('../config/prisma');

const auth = (requiredRights) => async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(new ApiError(401, 'Please authenticate'));
        }

        const token = authHeader.split(' ')[1];

        const payload = jwt.verify(token, config.jwt.secret);

        req.user = payload;

        let role = payload.role;
        if (requiredRights && requiredRights.length) {
            if (!role) {
                const user = await prisma.user.findUnique({ where: { id: payload.sub } });
                role = user && user.role;
                if (user) req.user = user;
            }

            if (!requiredRights.includes(role)) {
                return next(new ApiError(403, 'Forbidden'));
            }
        }

        return next();
    } catch (err) {
        return next(new ApiError(401, 'Please authenticate'));
    }
};

module.exports = auth;
