const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const passport = require("passport");

const PORT = process.env.PORT || 8080;
const galleryRoute = require("./routes/gallery.js");
const authRoute = require("./routes/auth.js");

app.engine(
  ".hbs",
  hbs({
    defaultLayout: "main",
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    store: new RedisStore(),
    secret: "overwatchisgewd",
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/gallery", galleryRoute);
app.use("/gallery", authRoute);

app.get("/", (req, res) => {
  console.log("sanity check");
  res.render("templates/default");
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
