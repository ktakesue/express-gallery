exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { email: "domoarigato@gmail.com", password: "hello" },
        { email: "overwatchbae@yahoo.com", password: "howdy" },
        { email: "tracer@aol.com", password: "zoom" }
      ]);
    });
};
