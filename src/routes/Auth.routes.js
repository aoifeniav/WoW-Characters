const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/register', (req, res, next) => {
    return res.render('./auth/register');
});

router.post('/register', (req, res, next) => {
    const done = (error, user) => {
        if (error) {
            return next(error);
        }

        req.logIn(user, (error) => {
            if(error) {
                return next(error);
            };
            console.log('User registered:', user);

            return res.redirect('/chars');
        });
    }

    passport.authenticate('registro', done)(req);
});

router.get('/login', (req, res, next) => {
    return res.render('./auth/login');
});

router.post('/login', (req, res, next) => {
    const done = (error, user) => {
        if (error) {
            return next(error);
        }

        req.logIn(user, (error) => {
            if(error) {
                return next(error);
            };
            console.log('User registered:', user);

            return res.redirect('/chars');
        });
    };

    passport.authenticate('acceso', done)(req);
});

router.post('/logout', (req, res, next) => {
    if(req.user) {
        req.logout();

        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            return res.redirect('/auth/login');
        });
    }
});

module.exports = router;