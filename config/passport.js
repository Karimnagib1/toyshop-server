const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const sqlQuery = require("../config/db");
const keys = require("./keys");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      sqlQuery(`SELECT * FROM users WHERE id = '${jwt_payload.id}'`)
      .then(users => users[0])
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      }).catch(err => console.log(err));
    })
  );
};
