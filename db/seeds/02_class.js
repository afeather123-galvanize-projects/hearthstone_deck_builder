
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('class').del()
    .then(function () {
      // Inserts seed entries
      return knex('class').insert([
        {class_name: "Neutral"},
        {class_name: "Druid"},
        {class_name: "Hunter"},
        {class_name: "Mage"},
        {class_name: "Paladin"},
        {class_name: "Priest"},
        {class_name: "Rogue"},
        {class_name: "Shaman"},
        {class_name: "Warlock"},
        {class_name: "Warrior"}
      ]);
    });
};
