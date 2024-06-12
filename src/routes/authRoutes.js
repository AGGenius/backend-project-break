const express = require('express');
const router = express.Router();
const { showLogin, logIn, logOut} = require('../controllers/authControllers.js');
const { alrreadyLogged, authUser, logOutUser} = require('../config/firebase.js');

router.get('/', alrreadyLogged, showLogin);
router.post('/logInPath', authUser, logIn);
router.get('/logOutPath', logOutUser, logOut);

module.exports = router;