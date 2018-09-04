const assert = require('assert');
const Greet = require('../greet');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgres://busisile:pg123@localhost/user';

const pool = new Pool({
    connectionString
});


describe('The Greetings database webApp', function () {
    beforeEach(async function(){
        await pool.query('delete from greetings;');
    });
    it('Should return the database length of 1 when only Busisile is addded to database', async function(){
        let greet = Greet(pool);
        await greet.add({name: 'Busisile'});
        let names = await greet.all();
        assert.equal(names.length, 1);
    });
    after(function(){
        pool.end();
    })
    // it("It should return the \'Hello Busisile\' and \' Hello Nolupho\'", function () {
    //     let greet = Greet();
        
    //     greet.theGreetings('english', 'Busisile');
    //     assert.deepEqual(greet.getMessage(), "Hello Busisile");
    //     greet.theGreetings('english', 'Nolupho');
    //     assert.deepEqual(greet.getMessage(), "Hello Nolupho");
    //     greet.theGreetings('english', 'nolupho');
    //     assert.deepEqual(greet.getMessage(), "Hello nolupho");
    //     greet.theGreetings('isixhosa', 'busisile');
    //     assert.deepEqual(greet.getMessage(), "Molo busisile");
    //     assert.deepEqual(greet.getCounter(), 2);
    // });
    // it("It should return the \'Molo Busisile\' , \' Molo Nolupho\' and \' Hello Odwa\'", function () {
    //     let greet = Greet();
    //      greet.theGreetings('isixhosa', 'Busisile');  
    //      assert.deepEqual(greet.getMessage(), "Molo Busisile");
    //      greet.theGreetings('isixhosa', 'Nolupho');
    //      assert.deepEqual(greet.getMessage(), "Molo Nolupho");
    //      greet.theGreetings('english', 'Odwa');
    //      assert.deepEqual(greet.getMessage(), "Hello Odwa");
    //      assert.deepEqual(greet.getCounter(), 3);
    //  });
    // it("It should return the \'Hallo Busisile\' , \' Hello Odwa\',  \' Hallo Nolupho\' and \'David \' Please select a language.", function () {
    //     var greet = Greet();
    //     greet.theGreetings('afrikaans', 'Busisile');
    //     assert.deepEqual(greet.getMessage(), "Hallo Busisile");
    //     greet.theGreetings('english', 'Odwa');
    //     assert.deepEqual(greet.getMessage(), "Hello Odwa");
    //     greet.theGreetings('afrikaans', 'Odwa');
    //     assert.deepEqual(greet.getMessage(), "Hallo Odwa");
    //     greet.theGreetings('afrikaans', 'Nolupho');
    //     assert.deepEqual(greet.getMessage(), "Hallo Nolupho");
    //     greet.theGreetings('', 'David');
    //     assert.deepEqual(greet.getMessage(), "please select a language David");
    //     assert.deepEqual(greet.getCounter(), 3);
    // });
    // it("If no name is entered, but a language is selected, after pressing \'Greet Me\' ,It should return a message on the language you selected. ", function () {
    //     var greet = Greet();
    //     greet.theGreetings('afrikaans', '');
    //     assert.deepEqual(greet.getMessage(), "Voer asseblief jou naam in die tekskassie in, kies die taal van jou keuse en druk die knoppie Gree my.");
    //     greet.theGreetings('english', '');
    //     assert.deepEqual(greet.getMessage(), "Please enter your name on the text box, select the language of your choice then press the \'Greet Me\'");
    //     greet.theGreetings('isixhosa', '');
    //     assert.deepEqual(greet.getMessage(), "Nceda faka igama lakho kwibhokisi yombhalo, ukhethe ulwimi, uze ucinezele iqhosha lokubulisa. ");
    //     assert.deepEqual(greet.getCounter(), 0);
    // });
    // it("If a \'Busisile\' is entered, but a language is not selected, after pressing \'Greet Me\' ,It should return \'Busisile\' please select a language. The count will remain zero", function () {
    //     var greet = Greet();
    //     greet.theGreetings('', 'Busisile');
    //     assert.deepEqual(greet.getMessage(), "please select a language Busisile");
    //     assert.deepEqual(greet.getCounter(), 0);
    // });
    // it("If no name is entered, a language is not selected, after pressing \'Greet Me\' ,It should return \'Please enter your name and select a language.\' ", function () {
    //     var greet = Greet();
    //     greet.theGreetings('', '');
    //     assert.deepEqual(greet.getMessage(), 'Please enter your name and select a language ');
    //     assert.deepEqual(greet.getCounter(), 0);
    // });
});