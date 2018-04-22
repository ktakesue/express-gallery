const router = require("express").Router();
const Users = require("../db/models/Users");
const passport = require("passport");
const localStrat = require("passport-local");
const bcrypt = require("bcrypt");

const SALT_ROUND = 12;

passport.serializeUser((user, done) => {
  console.log("serializeUser", user);
  done(null, {
    email: user.email
  });
});

passport.deserializeUser((user, done) => {
  console.log("deserializingUser", user);
  Users.where({ email: user.email })
    .fetch()
    .then(user => {
      user = user.toJSON();
      done(null, user);
    })
    .catch(err => {
      console.log("err", err);
    });
});

passport.use(
  new localStrat({ usernameField: "email" }, (email, password, done) => {
    console.log("local is being called");
    Users.where({ email })
      .fetch()
      .then(user => {
        console.log("user in local strategy", user);
        user = user.toJSON();
        bcrypt.compare(password, user.password).then(res => {
          if (res) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
      })
      .catch(err => {
        done(null, false);
      });
  })
);

router
  //see create register/login user form//
  .get("/register", (req, res) => {
    console.log("register page");
    return res.render("templates/auth/register");
  })
  .get("/login", (req, res) => {
    console.log("login page");
    return res.render("templates/auth/login");
  });

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  bcrypt
    .genSalt(12)
    .then(salt => {
      console.log("salt", salt);
      return bcrypt.hash(password, salt);
    })
    .then(hash => {
      console.log("hash", hash);
      return Users.forge({ email, password: hash }).save();
    })
    .then(user => {
      console.log("new user registered");
      user = user.toJSON();
      return res.redirect("/gallery");
    })
    .catch(err => {
      console.log("err", err);
      return res.redirect("/auth/register");
    });
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/auth/login" }),
  (req, res) => {
    console.log("logggggged in sucker");
    return res.redirect("/gallery");
  }
);

router.post("/logout", (req, res) => {
  console.log("logggged out bitch");
  req.logout();
  return res.redirect("/");
});

router.get("/secret", isAuthenticated, (req, res) => {
  return res.send("SECRETS BITCHES");
});

function isAuthenticated(req, res, done) {
  if (req.isAuthenticated()) {
    done();
  } else {
    return res.redirect("/");
  }
}

module.exports = router;
