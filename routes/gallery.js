const express = require("express");
const router = express.Router();
const Gallery = require("../db/models/Gallery.js");
const Users = require("../db/models/Users.js");

router
  //see a new photo//
  .get("/new", (req, res) => {
    console.log("new photo");
    res.json("see a new photo");
  });

//get photos from gallery//
router
  .get("/", (req, res) => {
    console.log("gallery shows");

    return Gallery.fetchAll()
      .then(data => {
        return res.render("templates/index", { gallery: data.serialize() });
      })
      .catch(err => {
        return res.json({ message: err.message });
      });
  })
  //post a new photo//
  .post("/", (req, res) => {
    console.log("post a new photo");
    res.json("post a new photo");
  });
//get photo by id//
router
  .get("/:id", (req, res) => {
    console.log("get photo by id");
    res.json("get photo by id");
  })
  //see edit form by id//
  .get("/:id/edit", (req, res) => {
    console.log("get form to edit photo by id");
    res.json("get form to edit photo by id");
  })
  //edit photo by id//
  .put("/:id", (req, res) => {
    console.log("edit photo by id");
    res.json("edit photo by id");
  })
  //delete photo by id//
  .delete("/:id", (req, res) => {
    console.log("delete photo by id");
    res.json("delete photo by id");
  });

module.exports = router;
