const bookshelf = require("./bookshelf");
const Users = require("./Users");

const Gallery = bookshelf.Model.extend({
  tableName: "gallery",
  idAttribute: "gallery_id",
  hasTimestamps: true
});

module.exports = Gallery;
