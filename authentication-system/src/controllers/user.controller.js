const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');

const getUser = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
        res.status(404).send('User not found');
    }
    res.send(user);
});

module.exports = {
    getUser,
};
