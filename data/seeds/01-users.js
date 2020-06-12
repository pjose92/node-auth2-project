exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { username: "johndoe", password: "123", department: "web" },
        { username: "janedoe", password: "123", department: "mobile" },
      ]);
    });
};