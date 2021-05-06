exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("type")
    .del()
    .then(function () {
      return knex("type").insert([
        { id: 1, name: "Gelir", color: "green" },
        { id: 2, name: "Harcama", color: "red" },
      ]);
    });
};
