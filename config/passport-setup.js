const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const connection = require("../models/connection");


passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  connection.query("Select google_id from Google", function(err, rows) {
    if (!err) {
      done(null, rows[0].google_id);
    }
  });

})


passport.use(
  new GoogleStrategy({
    //google stratejimmiz!
    callbackURL: "/auth/google/redirect",
    clientID: "180575848280-mcfu6vvc4b7m5vai1sbj6iaq8hs4mk6u.apps.googleusercontent.com",
    clientSecret: "MO_NOFu7pwYiRqBI4y-Tfb8i",
  }, (accessToken, refreshToken, profile, done) => {
    console.log("passport callback");
    console.log(profile);
    var google_id = profile.id;
    var google_username = profile.displayName;
    var yeniUye = {
      id: google_id,
      username: google_username
    }
    //callback fonksiyonumuz! Google Giriş yaptıktan sonra kullanıcımız gelecek
    //Gelen kullanıcımız Db'ye kayıt olması gerekmektedir!
    connection.query("Insert into Google set google_id=?,google_username=?", [google_id, google_username], function(err, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log(rows);
        done(null, yeniUye);

      }
    });


  })
)