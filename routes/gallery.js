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
    console.log("posted a new photo");
    const { author, link, description } = req.body;
    const { user_id } = req.user;
    // console.log("req.user", req.user);

    return new Gallery({ author, link, description, user_id })
      .save()
      .then(data => {
        // console.log("result", data);
        return res.redirect("/gallery");
      })
      .catch(err => {
        return res.json({ message: err.message });
      });
  });

router //see edit form by id//
  .get("/:id/edit", (req, res) => {
    console.log("get form to edit photo by id");
    const gallery_id = req.params.id;
    return Gallery.where({ gallery_id })
      .fetch()
      .then(data => {
        data = data.toJSON();
        return res.render("templates/gallery/edit", data);
      })
      .catch(err => {
        return res.json({ message: err.message });
      });
  });

router
  .route("/:id")
  //get photo by id//
  .get((req, res) => {
    console.log("get photo by id");
    const gallery_id = req.params.id;
    console.log("gallery_id", gallery_id);
    return Gallery.where({ gallery_id })
      .fetch()
      .then(data => {
        data = data.toJSON();
        // console.log("HERO", data);
        return res.render("templates/gallery/image", data);
      })
      .catch(err => {
        return res.json({ message: err.message });
      });
  })
  //edit photo by id//
  .put((req, res) => {
    console.log("edit photo by id");
    const gallery_id = req.params.id;
    const payload = {
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    };
    return Gallery.where({ gallery_id })
      .fetch()
      .then(gallery => {
        console.log("NEW INFO", payload);
        return gallery.save(payload);
      })
      .then(result => {
        // console.log("result", result);
        return res.redirect(`/gallery/${gallery_id}`);
      })
      .catch(err => {
        return res.json({ message: err.message });
      });
  })
  //delete photo by id//
  .delete((req, res) => {
    console.log("delete photo by id");
    const gallery_id = req.params.id;

    Gallery.where({ gallery_id })
      .destroy()
      .then(result => {
        // console.log("deleted", result);
        return res.redirect("/gallery");
      })
      .catch(err => {
        return res.json({ message: err.message });
      });
  });

module.exports = router;
