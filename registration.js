var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//using mongoose connect or create the data base name sims
mongoose.connect("mongodb://localhost:27017/Sims");
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    Username:String,
    Passward:String,
});
// defining the table or field name in sims database
var User = mongoose.model("Patients", nameSchema);

//for sending the html file to the server running on the port 3000
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//getting the values form post method and action = add_details
app.post("/add_details", (req, res) => {
    var myData = new User(req.body);// req.body is the body value we are getting from the html form
    myData.save()
        .then(item => {
            res.send("Your details has been saved in the sims  database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
