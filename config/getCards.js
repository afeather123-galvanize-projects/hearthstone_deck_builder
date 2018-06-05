const unirest = require('unirest');
const {writeFileSync} = require('fs');
const path = require('path');

module.exports = function() {
    return new Promise(function(resolve, reject) {
        unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1")
        .header("X-Mashape-Key", "QxbH5xncXPmshmkMJs39950UcwCip1FsthbjsnOxXw5jvcPoFw")
        .end(function (result) {
            resolve(result.body);
        });
    })  
} 
