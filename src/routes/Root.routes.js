const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    // TODO: Hacer una condición para que si isAuth redireccione a /chars y, si no, a /auth/login
    return res.status(200).redirect('/auth/login');
});

module.exports = router;