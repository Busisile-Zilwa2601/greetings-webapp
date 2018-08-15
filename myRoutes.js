module.exports = function myRoutes(greet) {

    function index(req, res) {
        res.render('home', {number: greet.getCounter()});
    }

    function getGreetings(req, res) {
        let myName = req.query.myName;
        let lang = req.query.language;
        if(lang === undefined){
            lang = '';
        }
        //greet.nameEntry(myName);
        res.render('home', {
            message: greet.theGreetings(lang, myName),
            number: greet.getCounter(),
        });
    }
    return {
        index,
        getGreetings
    };
};