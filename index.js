//module constants
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const myGreet = require('./greet');
const routes = require('./myRoutes');
const pg = require("pg");
const Pool = pg.Pool;
let app = express();
// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
//connection to postegre
// we are using a special test database for the tests
//const connectionString = process.env.DATABASE_URL || 'postgres://busisile:pg123@localhost/cat_spotter';
const connectionString = process.env.DATABASE_URL || 'postgres://busisile:pg123@localhost/user';

const pool = new Pool({
    connectionString,
    ssl : useSSL
});

//instances
let greet = myGreet(pool);
let myRoutes = routes(greet);

//default settings
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//using body parser
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

//routes
app.get('/', myRoutes.index);
app.get('/greetings', myRoutes.getGreetings);//this is the greeting part
app.post('/greeted', myRoutes.getNames);//returns the list of names from the database
app.post('/deleted', myRoutes.deleteAll);//delete the database
app.get('/counter/:name', myRoutes.getCounts);
// shows how many times a name has been greeted.
app.get('/greeted', myRoutes.getNames);
app.get('/home_page', async function(req, res){
	try{
		res.redirect('/');
	}catch(err){
		console.error('Does not go back to home', err);
	}
});
//add the PORT
let PORT = process.env.PORT || 3077;

app.listen(PORT, function () {
    console.log("started on: ", this.address().port);
});