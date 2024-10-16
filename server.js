//Importing required packages and modules
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers/index');
const path = require('path');
const session = require('express-session');
require('dotenv').config();
const exphbs = require('express-handlebars');
const hbs = exphbs.create({})

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//Configure and link a session object with the sequelize store
const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    //will not resave the session data for every request
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
};

//Add express-session and store as Express.js middleware
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//Built-in Express.js Middleware that parses JSON strings sent via HTTP requests to JS objects
app.use(express.json());

//This middleware parses URL encoded data (received via HTML forms) to JS Objects to enable 
//the server access form input data easily via req.body.
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Set Handlebars as the default template engine.

app.use(routes)

//Connect to the database before starting the Express.js server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening`))
});
