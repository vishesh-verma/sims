var express = require("express");
var app = express();
var port = 3300;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var User = require("./User")

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Sims");


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Login.html");
});


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

 res.send("login success");

})
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
