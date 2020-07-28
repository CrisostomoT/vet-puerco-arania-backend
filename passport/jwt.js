const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const UserModel = require("../models/user");

const config = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  algorithms: [process.env.JWT_ALGORITHM],
};
const jwtStrategy = new JwtStrategy(config, async (jwt_payload, done) => {

  if (!jwt_payload) return done(null, false);
  return done(null, jwt_payload);
});

module.exports = jwtStrategy;
