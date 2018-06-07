var decklist = document.getElementById('decklist');
var list = {
    card_count: 0
};
var cards = document.querySelectorAll('img');
cards.forEach(card => {
    card.addEventListener('click', AddCard);
    card.addEventListener('contextmenu', RemoveCard);
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
        if (list[key].qty && list[key].qty > 0) {
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
        .then(function (data) {
            window.location.replace(data.url);
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
    
    

    
})


function RemoveCard(event) {
    event.preventDefault();
    const data = event.target.dataset;
    if (list[data.cardid]) {
        if (list[data.cardid].domElement) {
            list[data.cardid].qty--;
            list.card_count--;
            if (list[data.cardid].qty <= 0) {
                list[data.cardid].domElement.remove();
                list[data.cardid].domElement = undefined;
            } else {
                list[data.cardid].domElement.innerHTML = list[data.cardid].name + ' ' + list[data.cardid].qty;
            }
        }
    }
}

function AddCard(event) {
    const data = event.target.dataset;
    console.log(data.cardid);
    if (!list[data.cardid]) {
        list[data.cardid] = {
            mana: data.mana,
            name: data.name,
            qty: 0
        };
        console.log(list[data.cardid]);
    }
    if (list[data.cardid].qty < 2 && list.card_count < 30) {
        list[data.cardid].qty++;
        list.card_count++;
        if (!list[data.cardid].domElement) {
            let li = document.createElement('li');
            li.dataset.cardid = data.cardid;
            li.addEventListener('contextmenu', RemoveCard);
            let text = document.createTextNode(list[data.cardid].name + ' ' + list[data.cardid].qty);
            li.appendChild(text);
            decklist.appendChild(li);
            list[data.cardid].domElement = li;
        } else {
            list[data.cardid].domElement.innerHTML = list[data.cardid].name + ' ' + list[data.cardid].qty;
        }
    }
}