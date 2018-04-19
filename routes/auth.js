const router = require("express").Router();
const Users = require("../db/models/Users");

router.post("/auth/register", (req, res) => {
  res.send("SANITY REGISTER");
});

router.post("/auth/login", (req, res) => {
  res.send("SANITY LOGIN");
});

router.post("/auth/logout", (req, res) => {});

router.get("/auth/secret", (req, res) => {
  res.send("SECRETS BITCHES");
});

module.exports = router;
