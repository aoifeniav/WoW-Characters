const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/chars');;
    }

    return res.status(200).redirect('/auth/login');
});

module.exports = router;