const express = require('express');
const router = express.Router();
const { showLogin, newAccount, logIn, logOut} = require('../controllers/authControllers.js');
const { alrreadyLogged, authUser, createAccount, logOutUser} = require('../config/firebase.js');

router.get('/', alrreadyLogged, showLogin);
router.post('/createAccount', createAccount, newAccount)
router.post('/logInPath', authUser, logIn);
router.get('/logOutPath', logOutUser, logOut);

module.exports = router;