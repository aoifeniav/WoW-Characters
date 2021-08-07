const express = require('express');
const router = express.Router();
const controllers = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/register', authMiddleware.isNotAuth, controllers.registerGet);
router.post('/register', authMiddleware.isNotAuth, controllers.registerPost);

router.get('/login', authMiddleware.isNotAuth, controllers.loginGet);
router.post('/login', authMiddleware.isNotAuth, controllers.loginPost);

router.post('/logout', controllers.logoutPost);

module.exports = router;