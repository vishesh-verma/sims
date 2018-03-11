var mongoose= require('mongoose');

var userSchema = new mongoose.Schema({
  Username: String,
  Passward: String,
});

var User = mongoose.model('patients', userSchema);
module.exports = User;
