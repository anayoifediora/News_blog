//Importing required packages and modules
const express = require('express');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

//Built-in Express.js Middleware that parses JSON strings sent via HTTP requests to JS objects
app.use(express.json());
//This middleware parses URL encoded data (received via HTML forms) to JS Objects to enable 
//the server access form input data easily via req.body.
app.use(express.urlencoded({ extended: true }));

//Connect to the database before starting the Express.js server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening`))
});
