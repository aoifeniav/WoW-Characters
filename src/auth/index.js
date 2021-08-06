const passport = require('passport');
const registerStrategy = require('./register.strategy');
const loginStrategy = require('./login.strategy');
const User = require('../models/User.model');

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  try {
      const existingUser = await User.findById(userId);
      return done(null, existingUser);
  } catch (error) {
      return done(error);
  }
});

const setStrategies = () => {
  passport.use('register', registerStrategy);
  passport.use('login', loginStrategy);
};

module.exports = { setStrategies };