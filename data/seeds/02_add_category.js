exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("category")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("category").insert([
        { id: 1, name: "Maaş", type_id: 1 },
        { id: 2, name: "Mutfak alışverişi", type_id: 2 },
      ]);
    });
};
