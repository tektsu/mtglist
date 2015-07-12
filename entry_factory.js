"use strict";

function newEntry(card) {

    giveLandsAColor();
    finalizeData();

    function giveLandsAColor() {
        if (card.name.match(/Forest$/)) {
            card.supertypes = [''];
            card.colors = ['Green'];
        }
        else if (card.name.match(/Island$/)) {
            card.supertypes = [''];
            card.colors = ['Blue'];
        }
        else if (card.name.match(/Mountain$/)) {
            card.supertypes = [''];
            card.colors = ['Red'];
        }
        else if (card.name.match(/Plains$/)) {
            card.supertypes = [''];
            card.colors = ['White'];
        }
        else if (card.name.match(/Swamp$/)) {
            card.supertypes = [''];
            card.colors = ['Black'];
        }
    }

    function finalizeData() {
        setName();
        setSupertype()
        setType()
        setColor();
    }

    function setName() {
        if (card.name[0] == 'Æ') {
            card.name = card.name.replace('Æ', 'AE');
        }
    }

    function setSupertype() {
        if (!card.supertypes) {
            card.supertypes = [''];
        }
    }

    function setType() {
        if (!card.types) {
            card.types = [''];
        }
    }

    function setColor() {
        if (card.colors) {
            if (card.colors.length > 1) {
                card.colors = ['Multicolored'];
            }
        }
        else {
            card.colors = ['Colorless'];
        }
    }

    return {

        getName: function() {
            return card.name;
        },

        getSupertype: function() {
            return card.supertypes[0];
        },

        getType: function() {
            return card.types[0];
        },

        getColor: function() {
            return card.colors[0];
        },

    }
}

module.exports = newEntry;
