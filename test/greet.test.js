const assert = require('assert');
const Greet = require('../greet');

describe('The Greetings function', function () {
    it("It should return the \'Hello Busisile\' and \' Hello Nolupho\'", function () {
        let greet = Greet();
        greet.nameEntry('Busisile');
        greet.nameEntry('Nolupho');
        greet.nameEntry('nolupho');
        greet.nameEntry('busisile');
        assert.deepEqual(greet.theGreetings('english', 'Busisile'), "Hello Busisile");
        assert.deepEqual(greet.theGreetings('english', 'Nolupho'), "Hello Nolupho");
        assert.deepEqual(greet.getCounter(), 2);
    });
    it("It should return the \'Molo Busisile\' , \' Molo Nolupho\' and \' Hello Odwa\'", function () {
        let greet = Greet();
        greet.nameEntry('Busisile');
        greet.nameEntry('Nolupho');
        greet.nameEntry('Odwa');
        greet.nameEntry('Odwa');
        assert.deepEqual(greet.theGreetings('isixhosa', 'Busisile'), "Molo Busisile");
        assert.deepEqual(greet.theGreetings('isixhosa', 'Nolupho'), "Molo Nolupho");
        assert.deepEqual(greet.theGreetings('english', 'Odwa'), "Hello Odwa");
        assert.deepEqual(greet.getCounter(), 3);
    });
    it("It should return the \'Hallo Busisile\' , \' Hello Odwa\',  \' Hallo Nolupho\' and \'David \' Please select a language.", function () {
        var greet = Greet();
        greet.nameEntry('Busisile');
        greet.nameEntry('Nolupho');
        greet.nameEntry('Odwa');
        greet.nameEntry('odwa');
        assert.deepEqual(greet.theGreetings('afrikaans', 'Busisile'), "Hallo Busisile");
        assert.deepEqual(greet.theGreetings('english', 'Odwa'), "Hello Odwa");
        assert.deepEqual(greet.theGreetings('afrikaans', 'Odwa'), "Hallo Odwa");
        assert.deepEqual(greet.theGreetings('afrikaans', 'Nolupho'), "Hallo Nolupho");
        assert.deepEqual(greet.theGreetings('', 'David'), "David please select a language");
        assert.deepEqual(greet.getCounter(), 3);
    });
    it("If no name is entered, but a language is selected, after pressing \'Greet Me\' ,It should return a message on the language you selected. ", function () {
        var greet = Greet();
        greet.nameEntry('');
        assert.deepEqual(greet.theGreetings('afrikaans', ''), "Voer asseblief jou naam in die tekskassie in, kies die taal van jou keuse en druk die knoppie Gree my.");
        assert.deepEqual(greet.theGreetings('english', ''), "Please enter your name on the text box, select the language of your choice then press the \'Greet Me\'");
        assert.deepEqual(greet.theGreetings('isixhosa', ''), "Nceda faka igama lakho kwibhokisi yombhalo, ukhethe ulwimi, uze ucinezele iqhosha lokubulisa. ");
        assert.deepEqual(greet.getCounter(), 0);
    });
    it("If a \'Busisile\' is entered, but a language is not selected, after pressing \'Greet Me\' ,It should return \'Busisile\' please select a language. The count will remain zero", function () {
        var greet = Greet();
        assert.deepEqual(greet.theGreetings('', 'Busisile'), "Busisile please select a language");
        assert.deepEqual(greet.getCounter(), 0);
    });
    it("If no name is entered, a language is not selected, after pressing \'Greet Me\' ,It should return \'Please enter your name and select a language.\' ", function () {
        var greet = Greet();
        greet.nameEntry('');
        assert.deepEqual(greet.theGreetings('', ''), 'Please enter your name and select a language ');
        assert.deepEqual(greet.getCounter(), 0);
    });
});