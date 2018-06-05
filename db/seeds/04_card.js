const getCards = require('../../config/getCards.js')


exports.seed = function(knex, Promise) {
  return knex('card').del()
    .then(function () {
      return getCards().then(cardData => {
        console.log('PLEASE');
        let cards = [];
        const keys = Object.keys(cardData);
        for(let j = 0; j < keys.length; j++) {
          const key = keys[j];
          if (key === "Tavern Brawl" || key === "Hero Skins" || key === "Missions" || key === "Credits" || key === "System" || key === "Debug") continue;
          const set = cardData[key];
          for(let i = 0; i < set.length; i++) {
            card = set[i];
            if(card.cardId.match(/HERO_/g) !== null) continue;
            let new_card = {
              name: card.name,
              type: card.type,
              mana: card.cost
            }
            if(card.type === 'Minion') {
              new_card.attack = card.attack;
              new_card.health = card.health;
            }
            if(card.type === 'Weapon') {
              new_card.attack = card.attack;
              new_card.health = card.durability;
            }
            if(card.text) {
              new_card.description = card.text;
            } else {
              new_card.description = '';
            }
            if(card.img) {
              new_card.img = card.img;
            }
            switch(card.playerClass) {
              case 'Neutral': new_card.class_id = 1;
                break;
              case 'Druid': new_card.class_id = 2;
                break;
              case 'Hunter': new_card.class_id = 3;
                break;
              case 'Mage': new_card.class_id = 4;
                break;
              case 'Paladin': new_card.class_id = 5;
                break;
              case 'Priest': new_card.class_id = 6;
                break;
              case 'Rogue': new_card.class_id = 7;
                break;
              case 'Shaman': new_card.class_id = 8;
                break;
              case 'Warlock': new_card.class_id = 9;
                break;
              case 'Warrior': new_card.class_id = 10;
                break;
            }
            cards.push(new_card);
          }
        }
        console.log(cards.splice(0,5));
        return knex('card').insert(cards);
      })
    });
};
