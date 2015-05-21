var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/lesson');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error'));
db.once('open', function(){
});

/**
 * validationをユーザー定義関数で評価させることができる
 *
 * animalSchema
 * - nameを定義する必要がある
 * - arm.countは2以上かつ偶数である必要がある
 */
var animalSchema = new Schema({
  name : { type: String, required: true },
  arm: {
    count: {
      type: Number,
      validate: [function(val){
        return (val >= 2) && (val % 2 == 0);
      }]
    }
  }
});
var Animal = mongoose.model('Animal', animalSchema);

///////////////////////////////////////////////////////////////////////////////////
var poti = new Animal({
  name: 'tarou',
  arm: {
    count: 2
  }
});
poti.save(function(e, poti){
  console.error('これはエラーにならない');
  console.log('error is %s', e);
});
///////////////////////////////////////////////////////////////////////////////////
var tarou = new Animal({
  name: 'tarou',
  arm: {
    count: 3
  }
});
tarou.save(function(e, tarou){
  console.error('tarouは腕が3本あるのでエラーになる');
  console.log('error is %s', e);
});
