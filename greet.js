module.exports = function greet() {
  var temp = {};
  var counter = 0;
  var nameEntry = function (name) {
    if (name != '' && Number.isNaN(Number(name))) {
      if (temp[name.toLowerCase()] === undefined) {
        temp[name.toLowerCase()] = 0;
      }
      if (temp[name.toLowerCase()] == 1) {

      } else {
        temp[name.toLowerCase()] += 1;
        counter += 1;
      }
    }
  };
  var theGreetings = function (languageSelected, name) {
    if (Number.isNaN(Number(name)) && languageSelected != '') {
      nameEntry(name);
      if (languageSelected === 'english') {
        return 'Hello ' + name;
      }
      if (languageSelected === 'isixhosa') {
        return 'Molo ' + name;
      }
      if (languageSelected === 'afrikaans') {
        return 'Hallo ' + name;
      }
    } else if (Number.isNaN(Number(name)) && languageSelected === '' ){
      return  'please select a language '+ name ;
    } else if (name === "" && languageSelected != '') {
      if (languageSelected === 'english') {
        return "Please enter your name on the text box, select the language of your choice then press the \'Greet Me\'";
      }
      if (languageSelected === 'isixhosa') {
        return 'Nceda faka igama lakho kwibhokisi yombhalo, ukhethe ulwimi, uze ucinezele iqhosha lokubulisa. ';
      }
      if (languageSelected === 'afrikaans') {
        return 'Voer asseblief jou naam in die tekskassie in, kies die taal van jou keuse en druk die knoppie Gree my.';
      }
    } else{
      return 'Please enter your name and select a language ';
    }
  };
  var getCounter = function () {
    return counter;
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
    mySum: sumObj,
    objtemp: temp
  };
};