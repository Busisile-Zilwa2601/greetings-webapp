module.exports = function myRoutes(greet) {

    function index(req, res) {
        res.render('home', greet.result());
    }

    function getGreetings(req, res) {
        let myName = req.query.myName;
        let lang = req.query.language;
        if (lang === undefined) {
            lang = '';
        }
        greet.theGreetings(lang, myName);
        res.render('home', greet.result());  
    }
    function getNames(req, res){
        //console.log(greet.listNames);
        //console.log(greet.temp);
        res.render('names', {greeted: greet.listNames});
    }
    function getCounts(req, res){
        let myKey = req.params.name;
        console.log(myKey);
        let names = greet.listNames;
        let myCount = 0;
        for(let i = 0; i < names.length; i++){
            if(myKey === names[i].key){
                myCount = names[i].count;
                break;
            }
        }
        console.log(myCount);
        res.render('greetCount', {name: myKey, counter : myCount});
    }
    return {
        index,
        getGreetings,
        getNames,
        getCounts
    };
};
//greetings-webapp-busisile