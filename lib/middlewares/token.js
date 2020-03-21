const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');

// The HTTP Bearer authentication strategy authenticates requests based on a bearer token contained in the:
// Authorization header field where the value is in the format {scheme} {token} and scheme is "Bearer" in this case.
// or access_token body parameter
// or access_token query parameter

passport.use(new BearerStrategy((token, done) => {
  const auth = token === process.env.ACCESS_TOKEN;
  return done(null, auth);
}))

module.exports = async (req, res, next) => {
  passport.authenticate('bearer', { session: false })(req, res, next)
}
