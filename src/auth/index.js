const passport = require('passport');
const registerStrategy = require('./register.strategy');
const loginStrategy = require('./login.strategy');
const User = require('../models/User.model');

// Passport recibe el usuario autenticado de las estrategias de login/register y guarda una de sus propiedades (_id en este caso) en la sesión de Express.
passport.serializeUser((user, done) => {
  return done(null, user._id);
});

// Passport coge la propiedad guardada en serializeUser (el _id del usuario en este caso), 
// busca en la base de datos por ese _id y añade el usuario encontrado a req.user.
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