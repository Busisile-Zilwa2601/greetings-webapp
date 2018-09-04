module.exports = function greet(pool) {
  var temp = {};
  //var counter = 0;
  var message ='';
  var listNames = [];
  //we enter a name into our object
  var nameEntry = async function (name) {
    if (name != '' && nameValidate(name)) { 
      if (temp[name.toLowerCase()] === undefined) {
        temp[name.toLowerCase()] = 0;
      }
      if (temp[name.toLowerCase()] === 1 || await checkTable(name.toLowerCase())) {
        for(let i = 0; i < listNames.length; i++){
          if(name.toLowerCase() === listNames[i].key){
            listNames[i].count++;
          }
        }
        await update(name.toLowerCase());  
      } 
      else {
        temp[name.toLowerCase()] += 1;
        listNames.push({key : name.toLowerCase(), count : temp[name.toLowerCase()]});
        await add(name.toLowerCase(), temp[name.toLowerCase()]);
        //counter += 1;
      }
    }
  };
  //validate format
  var nameValidate = function(name){
    var regex = /^[a-z]*[a-z]$/i;
    return regex.test(name);
  };
  //The greeting and messaging actually happens
  var theGreetings = async function (languageSelected, name) {
    if (nameValidate(name) && languageSelected != '') {
      await nameEntry(name);
      let name1 = await get(name.toLowerCase());
      if (languageSelected === 'english') {
          message =  'Hello ' + name1.name;
      }
      if (languageSelected === 'isixhosa') {
         message =  'Molo ' + name1.name;
      }
      if (languageSelected === 'afrikaans') {
         message =  'Hallo ' + name1.name;
      }
    } else if (nameValidate(name) && languageSelected === '' ){
       message =  'please select a language '+ name ;
    } else if (name === "" && languageSelected != '') {
      if (languageSelected === 'english') {
         message =  "Please enter your name on the text box, select the language of your choice then press the \'Greet Me\'";
      }
      if (languageSelected === 'isixhosa') {
         message =  'Nceda faka igama lakho kwibhokisi yombhalo, ukhethe ulwimi, uze ucinezele iqhosha lokubulisa. ';
      }
      if (languageSelected === 'afrikaans') {
         message =  'Voer asseblief jou naam in die tekskassie in, kies die taal van jou keuse en druk die knoppie Gree my.';
      }
    } else{
       message =  'Please enter your name and select a language ';
    }
  };
  //return a count
  var getCounter = async function () {
    let counter = await countAll();
    return counter;
  };
  //return the message
  var getMessage = async function(){
    return message;
  };
  //sum of the names in the object
  var sumObj = function (temp) {
    var sum = 0;
    for (var key in temp) {
      if (temp.hasOwnProperty(key)) {
        sum += temp[key];
      }
    }
    return sum;
  };
  /*The following functions are for the database
  * Return all the names on the database
  * Return just a single name
  * Return updated name
  * Delete all the names in the database
  */
  async function all(){
    let names = await pool.query('SELECT * from greetings');
    return names.rows;
  }
  async function add(name, counter){
    let data = [
        name, counter
    ];
    let results = await pool.query('insert into greetings (name, counter) values ($1 , $2)', data);
    return results;
  }
  async function get(name){
    let results = await pool.query('SELECT * FROM greetings WHERE name = $1', [name]);
    if (results.rows.length > 0) {  
      return results.rows[0];
    }
    return null;
  }
  async function update(name){
    let results = await pool.query('select counter from greetings where name = $1', [name]);
    let person = results.rows[0];
    let myCounter = person.counter;
    myCounter++;
    return pool.query('UPDATE greetings SET counter = $1 WHERE name = $2', [myCounter, name]);
  }
  async function checkTable(name){
    let results = await pool.query('SELECT name FROM greetings WHERE name = $1', [name]);
    if(results.rows.length > 0){
      return true;
    }else{ return false;}  
  }
  async function countAll(){
    let names = await pool.query('SELECT count(*) FROM greetings');
    return names.rows[0].count;
  }
  async function deleteAll (){
    temp = {};
    return await pool.query('DELETE FROM greetings');
  }
  //return all the functions
  return {
    nameEntry,
    getCounter,
    theGreetings,
    getMessage,
    mySum: sumObj,
    temp,
    listNames,
    all,
    add,
    get,
    deleteAll,
    result : async function(){
      return{
         message : await getMessage(), 
         number : await countAll() 
      };
    }
  };
};