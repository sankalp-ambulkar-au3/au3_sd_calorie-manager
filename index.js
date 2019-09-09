var express = require("express");
var app = express();

app.use(express.static('public'));

var bodyParser = require("body-parser");
var session = require("express-session");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb+srv://vipul:vipul123@calorify-db-oonwj.mongodb.net/?retryWrites=true&w=majority";
var db;
var ObjectId = require("mongodb").ObjectID;

MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(error, client) {
    if (error) throw error;
    db = client.db("blog");
  }
);

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "this is secret session"
  })
);

app.set("view engine", "hbs");


app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req, res) {
  if (req.session.loggedIn)
  res.redirect('/public/login.html');//page after user is loggedin remove the login.html and put the main page html. 
else
  res.sendfile( __dirname + '/public/login.html');
});

app.get("/signup", function(req, res) {

  res.sendfile( __dirname + '/public/signup.html');
});

app.post("/signup", function(req, res) {
  db.collection("users").insertOne(req.body);
  console.log("inserted");
  res.redirect('/');
});
app.listen(3001);
