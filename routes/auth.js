const express = require('express');
const router = express.Router();

//controllers
const authCtrl = require('../controllers/auth');

//validations
const createUserReq = require('../validations/createUserRequest');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

router.post('/signin', authCtrl.login);
router.post('/create-user', auth,admin, createUserReq, authCtrl.createUser);

module.exports = router;