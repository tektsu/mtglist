"use strict";

var fs = require('fs');
require('pkginfo')(module)
var cli = require('commander');

var newEntry = require('./entry_factory');
var newListContainer = require('./list_container_factory');

var cards = require('./AllCards-x.json');

cli .version(module.exports.version)
    .option('-o --directory [directory]', 'output directory')
    .option('-s --source [source]', 'data source ("mtgjson" or a local file)')
    .parse(process.argv);

var lists = newListContainer();
var names = Object.keys(cards);
names.forEach(processCard);
printLists();


function processCard(name) {
    var entry = newEntry(cards[name]);
    lists.addEntry(entry);
}

function printLists() {
    var listKeys = lists.getListKeys();
    listKeys.forEach(function(listKey) {
        var names = lists.getNamesForList(listKey);
        var filename = 'mtgcards-' + listKey + '.txt';
        var wstream = fs.createWriteStream(filename);
        for (var i=0; i < names.length; ++i) {
            wstream.write(names[i] + "\n");
        }
        wstream.end();
    });
}
