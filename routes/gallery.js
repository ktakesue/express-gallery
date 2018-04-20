const express = require("express");
const router = express.Router();
const Gallery = require("../db/models/Gallery.js");
const Users = require("../db/models/Users.js");

router
  //see create new photo form//
  .get("/new", (req, res) => {
    console.log("new photo");
    return res.render("templates/gallery/new");
  });

//get photos from gallery//
router
  .get("/", (req, res) => {
    console.log("gallery shows");
    return Gallery.fetchAll()
      .then(data => {
        return res.render("templates/gallery/index", {
          gallery: data.toJSON()
        });
      })
      .catch(err => {
        return res.json({ message: err.message });
      });
  })
  //post a new photo//
  .post("/", (req, res) => {
    console.log("post a new photo");
    const { author, link, description } = req.body;

    return new Gallery({ author, link, description })
      .save()
      .then(data => {
        console.log("result", data);
        return res.redirect("/gallery");
      })
      .catch(err => {
        return res.json({ message: err.message });
      });
  });
//get photo by id//
router
  .get("/:id", (req, res) => {
    console.log("get photo by id");
    const gallery_id = Number(req.params.id);
    return Gallery.where({ gallery_id })
      .fetchAll()
      .then(data => {
        return res.render("templates/gallery/image", {
          gallery: data.toJSON()
        });
      })
      .catch(err => {
        return res.json({ message: err.message });
      });
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
