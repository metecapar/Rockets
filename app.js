//----------------npm paketlerimiz---------------
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
var app = express();

//-------------App Config bölümü---------
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: false
}));
//---------------initialize passport -------------
app.use(passport.initialize());
app.use(passport.session());



//------------ Session oluşturma-------------

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//----------Navbar'ın girişten sonra değişmesi için-------------

//User bilgilerini tüm routes'larla paylaşmak için:
app.use((req, res, next) => {
  res.locals.currentUser = req.session.username;
  next();
});

//-------------Router middleware------------
const indexRoutes = require("./routes/indexRoutes");
const adminRoutes = require("./routes/adminRoutes");
const apiRoutes = require("./api/apiRoutes");
app.use(indexRoutes);
app.use(adminRoutes);
app.use(apiRoutes);
//metecapar

//--------------Server-------------------
app.listen(3000, function() {
  console.log("Dinleninen port : 3000");
})