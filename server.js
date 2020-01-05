var mongoose = require("mongoose");
var express = require("express");
var logger = require("morgan");


// Scraping tools

var axios = require("axios");
var cheerio = require("cheerio");


// Require models

var db = require("./models");
var port = 3000;


// Initialize Express
var app = express();

// Configure Middleware


// Morgan Logger for logging requests

app.use(logger("dev"));

// Parse request body as JSON


app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Make public a static folder
app.use(express.static("public"));


//Connect to the Mongo DB
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


var MONGODB_URI = process.env.MONGODB_URI || "mongodb:/;localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);



// Start the server
app.listen(port, function(){
    console.log("Listening on PORT " + port);
});