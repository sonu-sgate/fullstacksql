var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require('passport')

passport.use(new GoogleStrategy({
    clientID:"498057334174-4m81gc925infgfm8detsr6j08mdcajl4.apps.googleusercontent.com",
    clientSecret: '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',
    callbackURL: "http://localhost:8000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
module.exports={passport}