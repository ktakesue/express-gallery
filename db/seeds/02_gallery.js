exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("gallery")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("gallery").insert([
        {
          author: "Blizzard",
          link:
            "https://d1u1mce87gyfbn.cloudfront.net/media/screenshot/brigitte-screenshot-001.jpg",
          description: "Brigitte is Hot",
          user_id: 3
        },
        {
          author: "TracerMain",
          link:
            "https://d1u1mce87gyfbn.cloudfront.net/media/screenshot/tracer-screenshot-002.jpg",
          description: "I GO ZOOMZOOM",
          user_id: 1
        },
        {
          author: "McCRee's Bae",
          link:
            "https://d1u1mce87gyfbn.cloudfront.net/media/screenshot/mccree-screenshot-001.jpg",
          description: "HOWDY IM A COWBOY",
          user_id: 2
        }
      ]);
    });
};
