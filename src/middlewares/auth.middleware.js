const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/auth/login');
};

const isNotAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/chars');
};

module.exports = { isAuth, isNotAuth };