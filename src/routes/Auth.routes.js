const express = require('express');
const router = express.Router();
const controllers = require('../controllers/auth.controller');

router.get('/register', controllers.registerGet);
router.post('/register', controllers.registerPost);

router.get('/login', controllers.loginGet);
router.post('/login', controllers.loginPost);

router.post('/logout', controllers.logoutPost);

module.exports = router;