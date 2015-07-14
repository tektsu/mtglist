var newEntry = require('../entry_factory');

describe("entry_factory", function() {
    describe('Basic Lands get a color based on their type', function() {

        it('sets Basic Forests to Green with no supertype', function() {
            var entry = newEntry({
                supertypes: ['Basic'],
                types: ['Land'],
                colors: [''],
                name: 'Forest'
            });
            expect(entry.getSupertype()).toBe('');
            expect(entry.getColor()).toBe('Green');
        });

        it('sets Basic Islands to Blue', function() {
            var entry = newEntry({
                supertypes: ['Basic'],
                types: ['Land'],
                colors: [''],
                name: 'Island'
            });
            expect(entry.getSupertype()).toBe('');
            expect(entry.getColor()).toBe('Blue');
        });

        it('sets Basic Mountains to Red', function() {
            var entry = newEntry({
                supertypes: ['Basic'],
                types: ['Land'],
                colors: [''],
                name: 'Mountain'
            });
            expect(entry.getSupertype()).toBe('');
            expect(entry.getColor()).toBe('Red');
        });

        it('sets Basic Swamps to Black', function() {
            var entry = newEntry({
                supertypes: ['Basic'],
                types: ['Land'],
                colors: [''],
                name: 'Swamp'
            });
            expect(entry.getSupertype()).toBe('');
            expect(entry.getColor()).toBe('Black');
        });

        it('sets Basic Plains to White', function() {
            var entry = newEntry({
                supertypes: ['Basic'],
                types: ['Land'],
                colors: [''],
                name: 'Plains'
            });
            expect(entry.getSupertype()).toBe('');
            expect(entry.getColor()).toBe('White');
        });

        it('sets other kinds of Islands to Blue', function() {
            var entry = newEntry({
                supertypes: ['Basic'],
                types: ['Land'],
                colors: [''],
                name: 'Snow-Covered Island'
            });
            expect(entry.getSupertype()).toBe('');
            expect(entry.getColor()).toBe('Blue');
        });
    });

    describe("Types and Supertypes are set correctly", function() {

        it("sets the type and supertype to '' if either attribute is missing", function() {
            var entry = newEntry({
                name: 'Test Card'
            });
            expect(entry.getSupertype()).toBe('');
            expect(entry.getType()).toBe('');
        });

        it("sets the type and supertype to the only available value when only one is given", function() {
            var entry = newEntry({
                supertypes: ['STValue1'],
                types: ['TValue1'],
                name: 'Test Card'
            });
            expect(entry.getSupertype()).toBe('STValue1');
            expect(entry.getType()).toBe('TValue1');
        });

        it("sets the type and supertype to the first value if there are multiple values", function() {
            var entry = newEntry({
                supertypes: ['STValue1', 'STValue2'],
                types: ['TValue1', 'TValue2'],
                name: 'Test Card'
            });
            expect(entry.getSupertype()).toBe('STValue1');
            expect(entry.getType()).toBe('TValue1');
        });
    });

    describe('Colors are set correctly', function() {

        it("sets the color to 'Colorless' when none are present", function() {
            var entry = newEntry({
                name: 'Test Card'
            });
            expect(entry.getColor()).toBe('Colorless');
        });

        it("sets the color to the given color when only one is present", function() {
            var entry = newEntry({
                colors: ['Red'],
                name: 'Test Card'
            });
            expect(entry.getColor()).toBe('Red');
        });

        it("sets the color to 'Multicolored' when more than one is present", function() {
            var entry = newEntry({
                colors: ['Red', 'Blue'],
                name: 'Test Card'
            });
            expect(entry.getColor()).toBe('Multicolored');
        });
    });

    describe('Names are set correctly', function() {

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
