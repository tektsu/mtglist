var newEntry = require('../entry_factory');

describe("entry_factory", function() {
    describe('.getColor', function() {

        it('reports Basic Forests as Green', function() {
            var entry = newEntry({
                supertypes: ['Basic'],
                types: ['Land'],
                colors: [''],
                name: 'Forest'
            });
            expect(entry.getColor()).toBe('Green');
        });

        it('reports Basic Islands as Blue', function() {
            var entry = newEntry({
                supertypes: ['Basic'],
                types: ['Land'],
                colors: [''],
                name: 'Island'
            });
            expect(entry.getColor()).toBe('Blue');
        });

        it('reports Basic Mountains as Red', function() {
            var entry = newEntry({
                supertypes: ['Basic'],
                types: ['Land'],
                colors: [''],
                name: 'Mountain'
            });
            expect(entry.getColor()).toBe('Red');
        });

        it('reports Basic Swamps as Black', function() {
            var entry = newEntry({
                supertypes: ['Basic'],
                types: ['Land'],
                colors: [''],
                name: 'Swamp'
            });
            expect(entry.getColor()).toBe('Black');
        });

        it('reports Basic Plains as White', function() {
            var entry = newEntry({
                supertypes: ['Basic'],
                types: ['Land'],
                colors: [''],
                name: 'Plains'
            });
            expect(entry.getColor()).toBe('White');
        });

        it('reports other kinds of Islands as Blue', function() {
            var entry = newEntry({
                supertypes: ['Basic'],
                types: ['Land'],
                colors: [''],
                name: 'Snow-Covered Island'
            });
            expect(entry.getColor()).toBe('Blue');
        });
    });

    describe('.getSupertype', function() {

        it('reports the supertypes of Basic Lands as ""', function() {
            var entry = newEntry({
                supertypes: ['Basic'],
                types: ['Land'],
                colors: [''],
                name: 'Plains'
            });
            expect(entry.getSupertype()).toBe('');

        });

        it('reports the supertype as "" if there is no supertype', function() {
            var entry = newEntry({
                name: 'Test Card'
            });
            expect(entry.getSupertype()).toBe('');
        });

        it('reports the supertype as the only value if there is only one supertype', function() {
            var entry = newEntry({
                supertypes: ['TestSupertype'],
                name: 'Test Card'
            });
            expect(entry.getSupertype()).toBe('TestSupertype');
        });

        it('reports the supertype as the first value if there is are multiple supertypes', function() {
            var entry = newEntry({
                supertypes: ['TestSupertype', 'AnotherSupertype'],
                name: 'Test Card'
            });
            expect(entry.getSupertype()).toBe('TestSupertype');
        });
    });

    describe('.getType', function() {

        it('reports the type as "" if there is no type', function() {
            var entry = newEntry({
                name: 'Test Card'
            });
            expect(entry.getType()).toBe('');
        });

        it('reports the type as the only value if there is only one type', function() {
            var entry = newEntry({
                types: ['TestType'],
                name: 'Test Card'
            });
            expect(entry.getType()).toBe('TestType');
        });

        it('reports the type as the first value if there is are multiple types', function() {
            var entry = newEntry({
                types: ['TestType', 'AnotherType'],
                name: 'Test Card'
            });
            expect(entry.getType()).toBe('TestType');
        });
    });

    describe('.getColor', function() {

        it("reports the color as 'Colorless' when there are no colors", function() {
            var entry = newEntry({
                name: 'Test Card'
            });
            expect(entry.getColor()).toBe('Colorless');
        });

        it("reports the color as the given color when there is only one color", function() {
            var entry = newEntry({
                colors: ['Red'],
                name: 'Test Card'
            });
            expect(entry.getColor()).toBe('Red');
        });

        it("reports the color as 'Multicolored' when there are multiple colors", function() {
            var entry = newEntry({
                colors: ['Red', 'Blue'],
                name: 'Test Card'
            });
            expect(entry.getColor()).toBe('Multicolored');
        });
    });

    describe('.getName', function() {

        it("replaces 'Æ' with 'AE' when it occurs at the beginning of a name", function() {
            var entry = newEntry({
                name: 'ÆTest'
            });
            expect(entry.getName()).toBe('AETest');
        });

        it("does not modify 'Æ' when it is not at the beginning of a name", function() {
            var entry = newEntry({
                name: 'XÆTest'
            });
            expect(entry.getName()).toBe('XÆTest');
        });

        it("does not modify name when it does not contain 'Æ'", function() {
            var entry = newEntry({
                name: 'XTest'
            });
            expect(entry.getName()).toBe('XTest');
        });
    });
});
