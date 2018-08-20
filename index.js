//module constants
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const myGreet = require('./greet');
const routes = require('./myRoutes');

//instances
let greet = myGreet();
let myRoutes = routes(greet);
let app = express();

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
app.get('/greetings', myRoutes.getGreetings);
app.post('/greeted', myRoutes.getNames);
app.get('/counter/:name', myRoutes.getCounts);

//add the PORT
let PORT = process.env.PORT || 3077;

app.listen(PORT, function () {
	console.log('App starting on port', PORT);
});