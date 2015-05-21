var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/lesson');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error'));
db.once('open', function(){
});

/**
 * validationの基本的な使い方を紹介
 *
 * animalSchema
 * - nameを定義する必要がある
 * - ageの最小値は0
 * - categoryはcat or dog
 */
var animalSchema = new Schema({
  name : { type: String, required: true },
  age : { type: Number, min: 0 },
  category : { type: String, enum: ['cat', 'dog'] }
});
var Animal = mongoose.model('Animal', animalSchema);

///////////////////////////////////////////////////////////////////////////////////
var poti = new Animal({
});
poti.save(function(e, poti){
  console.error('nameを入力していないのでエラーになる');
  console.log(e);
});
///////////////////////////////////////////////////////////////////////////////////
var tarou = new Animal({
  name: 'tarou',
  age: -1
});
tarou.save(function(e, tarou){
  console.error('ageが0より小さいのでエラーになる');
  console.log(e);
});
///////////////////////////////////////////////////////////////////////////////////
var piyopiyo = new Animal({
  name: 'piyopiyo',
  age: 10,
  category: 'bird'
});
piyopiyo.save(function(e, piyopiyo){
  console.error('categoryがcat or dogではないためエラーになる');
  console.log(e);
});
