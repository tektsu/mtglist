"use strict";

var newEntry = require('./entry_factory');
var newListContainer = require('./list_container_factory');
// var MtgLists = require('./MtgLists');

var cards = require('./AllCards-x.json');

// var lists = new MtgLists();
var lists = newListContainer();
var names = Object.keys(cards);
// console.log(names);
names.forEach(processCard);

function processCard(name) {
    var entry = newEntry(cards[name]);
    lists.addEntry(entry);
}

lists.printLists();
