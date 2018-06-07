var decklist = document.getElementById('decklist');
var list = {};
var cards = document.querySelectorAll('img');
cards.forEach(card => {
  card.addEventListener('click', event => {
    const data = event.target.dataset;
    if(!list[data.cardid]) {
      list[data.cardid] = {
        mana: data.mana,
        name: data.name,
        qty: 0
      };
    }
    if(list[data.cardid].qty < 2) {
      list[data.cardid].qty++;
      if(!list[data.cardid].domElement) {
        let para = document.createElement('li');
        let text = document.createTextNode(data.name + ' ' + list[data.cardid].qty);
        para.appendChild(text);
        decklist.appendChild(para);
        list[data.cardid].domElement = para;
      } else {
        list[data.cardid].domElement.innerHTML = data.name + ' ' + list[data.cardid].qty;
      }
    }
  })

  card.addEventListener('contextmenu', event => {
    event.preventDefault();
    const data = event.target.dataset;
    if(list[data.cardid]) {
      if(list[data.cardid].domElement) {
        list[data.cardid].qty--;
        if(list[data.cardid].qty <= 0) {
          list[data.cardid].domElement.remove();
          list[data.cardid].domElement = undefined;
        } else {
          list[data.cardid].domElement.innerHTML = data.name + ' ' + list[data.cardid].qty;
        }
      }
    }
  })
})

document.getElementById('submitDeck').addEventListener('submit', event => {
    event.preventDefault();
    event.stopPropagation();
    let deck_info = {
      deck_name: document.getElementById('deck_name_input').value,
      desc: document.getElementById('description_input').value,
      class_id: class_id
    }
    let formattedList = [];
    let keys = Object.keys(list);
    keys.forEach(key => {
      if(list[key].qty && list[key].qty > 0) {
        let card_info = {
          card_id: Number(key),
          qty: list[key].qty
        }
        formattedList.push(card_info);
      }
    })
    deck_info.list = formattedList;
    fetch("/create_deck", {
     method: 'post',
     headers: {
      'Accept': 'application/json',
       "Content-type": "application/json"
     },
     credentials: 'include',
     body: JSON.stringify(deck_info)
    })
    .then(function(data) {
      window.location.replace(data.url);
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });
})