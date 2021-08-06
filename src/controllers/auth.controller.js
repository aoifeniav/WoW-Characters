const passport = require('passport');

const registerGet = (req, res, next) => {
    return res.render('./auth/register');
};

const registerPost = (req, res, next) => {
    const done = (error, user) => {
        if (error) {
            return next(error);
        }

        req.login(user, (error) => {
            if (error) {
                return next(error);
            };
            console.log('User registered:', user);

            return res.redirect('/chars');
        });
    }

    passport.authenticate('register', done)(req);
};

const loginGet = (req, res, next) => {
    return res.render('./auth/login');
};

const loginPost = (req, res, next) => {
    const done = (error, user) => {
        if (error) {
            return next(error);
        }

        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            };
            console.log('User logged in:', user);

            return res.redirect('/chars');
        });
    };

    passport.authenticate('login', done)(req);
};

const logoutPost = (req, res, next) => {
    if(req.user) {
        req.logout();

        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            return res.redirect('/auth/login');
        });
    }
};

module.exports = {
    registerGet,
    registerPost,
    loginGet,
    loginPost,
    logoutPost,
};
