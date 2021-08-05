const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    const message = 'Welcome to the WoW Characters project.';
    return res.status(200).render('index', {title: 'WoW Characters', message});
});

module.exports = router;