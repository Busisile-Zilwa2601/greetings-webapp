module.exports = function myRoutes(greet) {

    async function index(req, res) {
        try{
            let results = await greet.result();
            res.render('home',{message : results.message, number: results.number});
        }catch(err){
            console.error('Did not connect to database', err);
        }
    }
    async function deleteAll(req, res){
        try{
            await greet.deleteAll();
            //let results = await greet.result();
            //let message = 'Deleted all entries on the database, Thank You ';
            res.redirect('/', /*{message: mssg, number: results.number}*/);
        }catch(err){
            console.error('Error can not delete from the database', err);
        }
    }
    async function getGreetings(req, res) {
        let myName = req.query.myName;
        let lang = req.query.language;
        if (lang === undefined) {
            lang = '';
        }
        try{
            await greet.theGreetings(lang, myName);
            let results = await greet.result();
            //await greet.theGreetings(lang, myName);
            res.render('home', {message : results.message, number: results.number});
        }catch(err){
            console.error('Error can not add to the database', err);
        }
    }
    async function getNames(req, res){
      try{
        let names = await greet.all();    
        res.render('names', {names});
      }catch(err){
          console.error('Error', err);
      }
    }
    async function getCounts(req, res){
        let  name = req.params.name;
        try{
            let names = await greet.get(name);
            res.render('greetCount', {name: names.name, counter : names.counter}); 
        }catch(err){
            console.error('Error loading database', err);
        }
    }
    return {
        index,
        getGreetings,
        getNames,
        getCounts,
        deleteAll
    };
};
//greetings-webapp-busisile