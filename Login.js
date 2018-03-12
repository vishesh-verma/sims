var express = require("express");
var app = express();
var port = 3300;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var User = require("./User")
var session = require("client-sessions")
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Sims");


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

app.get("/dashboard", (req, res) => {
    res.sendFile(__dirname + "/dashboard.html");
});

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));


app.post('/addname',function(req,res){
  var Username=req.body.Username;
  var Passward=req.body.Passward;

User.findOne({Username: Username, Passward:Passward}, function(err, user){
  if(err){
    console.log(err);
  }
  
if(!user){
  return res.status(404).send("wrong username");
}
 req.session.user = user;
 res.redirect("/dashboard")

})
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
