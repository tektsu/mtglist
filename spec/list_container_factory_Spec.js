var newEntry = require('../entry_factory');
var newListContainer = require('../list_container_factory');

describe('list_container_factory', function() {

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

    describe('.addEntry', function() {

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

    describe('.getListKeys', function() {

        it('returns an empty array when there are no lists', function() {
            var listKeys = this.lists.getListKeys();
            expect(listKeys.length).toBe(0);
        });

        it('returns an array of one key when there is one list', function() {
            var entry1 = this.generateEntry();
            this.lists.addEntry(entry1);
            var listKeys = this.lists.getListKeys();
            expect(listKeys.indexOf('Green-TestType-TestSupertype')).not.toBe(-1);
        });

        it('returns an array of two keys when there are two lists', function() {
            var entry1 = this.generateEntry();
            var entry2 = this.generateEntry({colors: ['Red']});
            this.lists.addEntry(entry1);
            this.lists.addEntry(entry2);
            var listKeys = this.lists.getListKeys();
            expect(listKeys.indexOf('Green-TestType-TestSupertype')).not.toBe(-1);
            expect(listKeys.indexOf('Red-TestType-TestSupertype')).not.toBe(-1);
        });
    });

    describe('.getNamesForList', function() {

        it('returns an empty array if the keys does not exist', function() {
            var names = this.lists.getNamesForList('nonexistant');
            expect(names.length).toBe(0);
        });

        it('returns a list of one name when one entry has been added', function() {
            var entry1 = this.generateEntry();
            this.lists.addEntry(entry1);
            var listKeys = this.lists.getListKeys();
            var names = this.lists.getNamesForList(listKeys[0]);
            expect(names.length).toBe(1);
            expect(names[0]).toBe('Testy');
        });

        it('returns a sorted of two names when one two entries have been added', function() {
            var entry1 = this.generateEntry();
            var entry2 = this.generateEntry({name: 'Something Else'});
            this.lists.addEntry(entry1);
            this.lists.addEntry(entry2);
            var listKeys = this.lists.getListKeys();
            var names = this.lists.getNamesForList(listKeys[0]);
            expect(names.length).toBe(2);
            expect(names[0]).toBe('Something Else');
            expect(names[1]).toBe('Testy');
        });

        it('return a case-insensitive sorted list', function() {
            var entry1 = this.generateEntry();
            var entry2 = this.generateEntry({name: 'a name'});
            var entry3 = this.generateEntry({name: 'z other name'});
            this.lists.addEntry(entry1);
            this.lists.addEntry(entry2);
            this.lists.addEntry(entry3);
            var listKeys = this.lists.getListKeys();
            var names = this.lists.getNamesForList(listKeys[0]);
            expect(names.length).toBe(3);
            expect(names[0]).toBe('a name');
            expect(names[1]).toBe('Testy');
            expect(names[2]).toBe('z other name');
        })
    });
});
