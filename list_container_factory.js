"use strict";

function newListContainer() {
    var lists = {};

    function generateListKey(entry) {
        var key = entry.getColor() + '-' + entry.getType();
        var supertype = entry.getSupertype();
        if (supertype.length > 0) {
            key += '-' + supertype;
        }
        return key;
    }

    return {

        addEntry: function(entry) {
            var name = entry.getName();
            if (name.match(/ token card$/)) {
                return;
            }

            var listKey = generateListKey(entry);
            if (!lists[listKey]) {
                lists[listKey] = [];
            }
            lists[listKey].push(name);
        },

        getListKeys: function() {
            return Object.keys(lists);
        },

        getNamesForList: function(listKey) {
            if (!lists[listKey]) {
                return [''];
            }
            var names = lists[listKey].slice();
            names.sort(function (a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
            return names;
        }
    };
}

module.exports = newListContainer;
