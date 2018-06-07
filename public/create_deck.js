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