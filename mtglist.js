"use strict";

require('pkginfo')(module)
var cli = require('commander');

var newEntry = require('./entry_factory');
var newListContainer = require('./list_container_factory');

var cards = require('./AllCards-x.json');

cli .version(module.exports.version)
    .option('-o --directory [directory]', 'output directory')
    .option('-s --source [source]', 'data source ("mtgjson" or a local file)')
    .parse(process.argv);
console.log(cli.directory);

var lists = newListContainer();
var names = Object.keys(cards);
names.forEach(processCard);

function processCard(name) {
    var entry = newEntry(cards[name]);
    lists.addEntry(entry);
}

lists.printLists();
