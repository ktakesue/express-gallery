exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { user_id: 1, email: "domoarigato@gmail.com", password: "hello" },
        { user_id: 2, email: "overwatchbae@yahoo.com", password: "howdy" },
        { user_id: 3, email: "tracer@aol.com", password: "zoom" }
      ]);
    });
};
