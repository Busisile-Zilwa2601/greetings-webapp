module.exports = function greet() {
  var temp = {};
  var counter = 0;
  var message;
  var listNames = [];
  var nameEntry = function (name) {
    if (name != '' && nameValidate(name)) {
      if (temp[name.toLowerCase()] === undefined) {
        temp[name.toLowerCase()] = 0;
      }
      if (temp[name.toLowerCase()] === 1) {
        for(let i = 0; i < listNames.length; i++){
          if(name.toLowerCase() === listNames[i].key){
            listNames[i].count++;
          }
        }  
      } 
      else {
        temp[name.toLowerCase()] += 1;
        listNames.push({key : name.toLowerCase(), count : temp[name.toLowerCase()]});
        counter += 1;
      }
    }
  };
  //validate format
  var nameValidate = function(name){
    var regex = /^[a-z]*[a-z]$/i;
    return regex.test(name);
  };

  var theGreetings = function (languageSelected, name) {
    if (nameValidate(name) && languageSelected != '') {
      nameEntry(name);
      if (languageSelected === 'english') {
        message =  'Hello ' + name;
      }
      if (languageSelected === 'isixhosa') {
        message =  'Molo ' + name;
      }
      if (languageSelected === 'afrikaans') {
        message =  'Hallo ' + name;
      }
    } else if (nameValidate(name) && languageSelected === '' ){
      message =   'please select a language '+ name ;
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
  var getCounter = function () {
    return counter;
  };
  var getMessage = function(){
    return message;
  };
  var sumObj = function (temp) {
    var sum = 0;
    for (var key in temp) {
      if (temp.hasOwnProperty(key)) {
        sum += temp[key];
      }
    }
    return sum;
  };
  return {
    nameEntry,
    getCounter,
    theGreetings,
    getMessage,
    mySum: sumObj,
    temp,
    listNames,
    result : function(){
      return{
         message, 
         number : getCounter() 
      };
    }
  };
};