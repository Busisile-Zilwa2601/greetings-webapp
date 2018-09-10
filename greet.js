module.exports = function greet(greetDB) {
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
      if (temp[name.toLowerCase()] === 1 || await greetDB.checkTable(name.toLowerCase())) {
        for(let i = 0; i < listNames.length; i++){
          if(name.toLowerCase() === listNames[i].key){
            listNames[i].count++;
          }
        }
        await greetDB.update(name.toLowerCase());  
      } 
      else {
        temp[name.toLowerCase()] += 1;
        listNames.push({key : name.toLowerCase(), count : temp[name.toLowerCase()]});
        await greetDB.add(name.toLowerCase(), temp[name.toLowerCase()]);
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
      let name1 = await greetDB.get(name.toLowerCase());
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
    let counter = await greetDB.countAll();
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
  
  async function deleteAll(){
    return await greetDB.deleteAll();
  }
  async function all(){
    return await greetDB.all();
  }
  async function get(name){
    return await greetDB.get(name);
  }
  //return all the functions
  return {
    nameEntry,
    getCounter,
    theGreetings,
    getMessage,
    mySum: sumObj,
    temp,
    getCounter,
    listNames,
    deleteAll,
    all,
    get,
    result : async function(){
      return{
         message : await getMessage(), 
         number : await getCounter() 
      };
    }
  };
};