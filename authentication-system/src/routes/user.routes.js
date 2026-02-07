const express = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();

router.route('/:userId')
    .get(auth(['ADMIN']), userController.getUser);

module.exports = router;
