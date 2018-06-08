var decklist = document.getElementById('decklist');
var list = {
    card_count: 0
};

document.querySelectorAll('.deck_card').forEach(dc => {
    const data = dc.dataset;
    list[data.cardid] = {
        name: data.name,
        qty: data.qty,
        domElement: dc
    }
    list.card_count += Number(data.qty);
    dc.addEventListener('contextmenu', RemoveCard);
})

console.log(list);

var cards = document.querySelectorAll('img');
cards.forEach(card => {
    card.addEventListener('click', AddCard);
    card.addEventListener('contextmenu', RemoveCard);
})

function RemoveCard(event) {
    console.log(list[event.target.dataset.cardid]);
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
            li.classList.add('cardListItem');
            li.addEventListener('contextmenu', RemoveCard);
            let text = document.createTextNode(list[data.cardid].qty + ' ' + list[data.cardid].name);
            li.appendChild(text);
            decklist.appendChild(li);
            list[data.cardid].domElement = li;
        } else {
            list[data.cardid].domElement.innerHTML = list[data.cardid].name + ' ' + list[data.cardid].qty;
        }
    }
}