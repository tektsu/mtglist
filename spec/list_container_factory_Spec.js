var newEntry = require('../entry_factory');
var newListContainer = require('../list_container_factory');

describe('list_container_factory', function() {

    describe('.addEntry', function() {

        beforeEach(function() {
            this.lists = newListContainer();
            this.generateEntry = function(entryData) {
                var stdEntryData = {
                    supertypes: ['TestSupertype'],
                    types: ['TestType'],
                    colors: ['Green'],
                    name: 'Testy'
                };
                if (entryData) {
                    if ('supertypes' in entryData) {
                        stdEntryData.supertypes = entryData.supertypes;
                    }
                    if ('types' in entryData) {
                        stdEntryData.types = entryData.types;
                    }
                    if ('colors' in entryData) {
                        stdEntryData.colors = entryData.colors;
                    }
                    if ('name' in entryData) {
                        stdEntryData.name = entryData.name;
                    }
                }
                return newEntry(stdEntryData);
            };
        });

        it('adds an entry to the lists', function() {
            var entry1 = this.generateEntry();
            this.lists.addEntry(entry1);
            var listKeys = this.lists.getListKeys();
            expect(listKeys.length).toBe(1);
        });

        it('adds two entries of the same type to the same list', function() {
            var entry1 = this.generateEntry();
            var entry2 = this.generateEntry({name: 'Something Else'});
            this.lists.addEntry(entry1);
            this.lists.addEntry(entry2);
            var listKeys = this.lists.getListKeys();
            expect(listKeys.length).toBe(1);
        });

        it('adds two entries of different types to different lists', function() {
            var entry1 = this.generateEntry();
            var entry2 = this.generateEntry({colors: ['Red']});
            this.lists.addEntry(entry1);
            this.lists.addEntry(entry2);
            var listKeys = this.lists.getListKeys();
            expect(listKeys.length).toBe(2);
        });
    });
});
