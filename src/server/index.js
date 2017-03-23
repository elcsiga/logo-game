var express = require('express')
var app = express()
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var userSchema = mongoose.Schema({
    name: String,
    score: Number
});

var UserScore = mongoose.model('UserScore', userSchema);

// var fluffy = new Kitten({ name: 'fluffy' });

// fluffy.save(function (err, fluffy) {
//   if (err) return console.error(err);
// });

app.get('/', function (req, res) {
    UserScore.find(function (err, userScore) {
        if (err) return console.error(err);
        console.log(userScore);
        res.send(userScore);
    })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})