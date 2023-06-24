const User = require("../models/User");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local");

exports.localStrategy = new LocalStrategy(
  { usernameField: "username" },
  async (username, password, done) => {
    try {
      const foundUser = await User.findOne({ username: username });
      if (!foundUser) {
        return done(null, false);
      }

      const passwordMatch = await bcrypt.compare(password, foundUser.password);
      if (!passwordMatch) {
        return done(null, false);
      }

      return done(null, foundUser);
    } catch (error) {
      return done(error);
    }
  }
);
