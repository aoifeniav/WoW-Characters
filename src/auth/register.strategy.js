const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(String(password));
}

const registerStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        const error = new Error('The user already exists.');
        return done(error);
      }

      const isValidEmail = validateEmail(email);
      if (!isValidEmail) {
        const error = new Error('Invalid email address.');
        return done(error);
      }

      const isValidPassword = validatePassword(password);
      if (!isValidPassword) {
        const error = new Error('Password must contain 6-20 characters, one lowercase letter, one uppercase letter, and one number.');
        return done(error);
      }

      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        email,
        password: hash,
        name: req.body.name,
      });

      const savedUser = await newUser.save();

      savedUser.password = undefined;
      return done(null, savedUser);

    } catch (error) {
      return done(error);
    }
  }
);

module.exports = registerStrategy;