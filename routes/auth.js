const router = require("express").Router();
const Users = require("../db/models/Users");
const passport = require("passport");
const localStrat = require("passport-local");
const bcrypt = require("bcrypt");

router.post("/register", (req, res) => {
  console.log("registering a new user");
  res.render("templates/auth/register");
});

router.post("/login", (req, res) => {
  console.log("loggging in existing");
  res.render("templates/auth/login");
});

router.post("/logout", (req, res) => {});

router.get("/secret", (req, res) => {
  res.send("SECRETS BITCHES");
});

module.exports = router;
