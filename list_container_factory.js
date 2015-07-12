"use strict";

var fs = require('fs');

function newListContainer() {
    var lists = {};

    return {

        addEntry: function(entry) {
            var name = entry.getName();
            if (name.match(/ token card$/)) {
                return;
            }
            var supertype = entry.getSupertype();
            var type = entry.getType();
            var color = entry.getColor();
            if (!lists[supertype])
                lists[supertype] = {}
            if (!lists[supertype][type])
                lists[supertype][type] = {}
            if (!lists[supertype][type][color])
                lists[supertype][type][color] = []
            lists[supertype][type][color].push(name);
        },

        printLists: function() {
            var supertypes = Object.keys(lists);
            supertypes.forEach(function(supertype) {
                var types = Object.keys(lists[supertype]);
                types.forEach(function(type) {
                    var colors = Object.keys(lists[supertype][type]);
                    colors.forEach(function(color) {
                        lists[supertype][type][color].sort(function (a, b) {
                            return a.toLowerCase().localeCompare(b.toLowerCase());
                        });
                        var filename = 'mtgcards-' + color + '-' + type + '-' + supertype + '.txt';
                        var wstream = fs.createWriteStream(filename);
                        for (var i=0; i < lists[supertype][type][color].length; ++i) {
                            wstream.write(lists[supertype][type][color][i] + "\n");
                        }
                        wstream.end();
                    });
                });
            });
        }
    };
}

module.exports = newListContainer;
