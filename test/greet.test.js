const assert = require('assert');
const Greet = require('../greet.db');
const GreetFunction = require('../greet');
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
    it('Should return the database length', async function(){
        let greet = Greet(pool);
        await greet.add('Busisile', 1);
        await greet.add('Thabisa', 2);
        await greet.add('Lelethu', 1);
        await greet.add('Sihle',3);
        let count = await greet.countAll();
        let names = await greet.all();
        assert.equal(names.length, 4);
        assert.equal(count, 4);
    });
    it('Should return from database name: Busisile, counter: 2', async function(){
        let greet = Greet(pool);
        await greet.add('Thabisa', 3);
        await greet.add('Busisile', 2);
        let names = await greet.get('Busisile');
        assert.equal(names.name, 'Busisile');
        assert.equal(names.counter, 2);
    });
    it('Should update {name: Busisile, counter: 2} to {name: Busisile, counter: 3} in the database ', async function(){
        let greet = Greet(pool);
        await greet.add('Thabisa', 3);
        await greet.add('Busisile', 2); 
        await greet.update('Busisile');
        let names = await greet.get('Busisile');
        //console.log(names);
        assert.equal(names.name, 'Busisile');
        assert.equal(names.counter, 3);
    });
    it('Should return true when {name: Busisile} is in the database', async function(){
        let greet = Greet(pool);
        await greet.add('Thabisa', 3);
        await greet.add('Busisile', 2); 
        let checkName = await greet.checkTable('Busisile');
        assert.equal(checkName, true);
    });
    it('Should return false when {name: Zilwa} is in the database', async function(){
        let greet = Greet(pool);
        await greet.add('Thabisa', 3);
        await greet.add('Busisile', 2); 
        let checkName = await greet.checkTable('Zilwa');
        assert.equal(checkName, false);
    });
    it("It should return the \'Hello Busisile\' and \' Hello Nolupho\'", async function () {
            let greet = Greet(pool);
            let greetFun = GreetFunction(greet); 
            await greetFun.theGreetings('english', 'Busisile');
            assert.equal(await greetFun.getMessage(), "Hello busisile");
            
            await greetFun.theGreetings('english', 'Nolupho');
            assert.equal(await greetFun.getMessage(), "Hello nolupho");
            
            await greetFun.theGreetings('english', 'nolupho');
            assert.equal(await greetFun.getMessage(), "Hello nolupho");
            
            await greetFun.theGreetings('isixhosa', 'busisile');
            assert.equal(await greetFun.getMessage(), "Molo busisile");
            assert.equal(await greetFun.getCounter(), 2);
    });
    it("It should return the \'Busisile greeted 2\' and \'Nolupho greeted 2\'", async function () {
        let greet = Greet(pool);
        let greetFun = GreetFunction(greet); 
        await greetFun.theGreetings('english', 'Busisile');
        await greetFun.theGreetings('english', 'Nolupho');
        await greetFun.theGreetings('english', 'nolupho');
        await greetFun.theGreetings('isixhosa', 'busisile');
    
        let nameb = await greetFun.get('busisile');
        assert.equal(nameb.name, 'busisile');
        assert.equal(nameb.counter, 2);
        let nameN = await greetFun.get('nolupho');
        assert.equal(nameN.name, 'nolupho');
        assert.equal(nameN.counter, 2);
    });
    it("If no name is entered, but a language is selected, after pressing \'Greet Me\' ,It should return a message on the language you selected. ", async function () {
            var greet = Greet(pool);
            let greetFun = GreetFunction(greet);
            await greetFun.theGreetings('afrikaans', '');
            assert.equal(await greetFun.getMessage(), "Voer asseblief jou naam in die tekskassie in, kies die taal van jou keuse en druk die knoppie Gree my.");
            await greetFun.theGreetings('english', '');
            assert.equal(await greetFun.getMessage(), "Please enter your name on the text box, select the language of your choice then press the \'Greet Me\'");
            await greetFun.theGreetings('isixhosa', '');
            assert.equal(await greetFun.getMessage(), "Nceda faka igama lakho kwibhokisi yombhalo, ukhethe ulwimi, uze ucinezele iqhosha lokubulisa. ");
            assert.equal(await greetFun.getCounter(), 0);
    });
    it("If a \'Busisile\' is entered, but a language is not selected, after pressing \'Greet Me\' ,It should return \'Busisile\' please select a language. The count will remain zero", async function () {
        var greet = Greet(pool);
    let greetFun = GreetFunction(greet);
        await greetFun.theGreetings('', 'Busisile');
        assert.equal(await greetFun.getMessage(), "please select a language Busisile");
        assert.equal(await greetFun.getCounter(), 0);
    });
    it("If no name is entered, a language is not selected, after pressing \'Greet Me\' ,It should return \'Please enter your name and select a language.\' ", async function () {
        var greet = Greet(pool);
        let greetFun = GreetFunction(greet);
        await greetFun.theGreetings('', '');
        assert.equal(await greetFun.getMessage(), 'Please enter your name and select a language ');
        assert.equal(await greetFun.getCounter(), 0);
    });
    after(function(){
        pool.end();
    })
});