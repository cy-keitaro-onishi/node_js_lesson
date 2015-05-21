var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/lesson');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error'));
db.once('open', function(){
  console.log('open database');
});

var animalSchema = new Schema({
  name: String,
  type: String,
});
var Animal = mongoose.model('Animal', animalSchema);



/**
 * いくつかdocumentを生成させる方法があるので
 * 簡単に紹介します
 * RubyのActiveRecordに似ているなあと思いました
 */

///////////////////////////////
// 1
// インスタンス生成時にメンバを決定
///////////////////////////////
var cat = new Animal({
  name: 'mike',
  type: 'cat',
});

cat.save(function (err, model) {
  if (err) return handleError(err);

  console.log('create %s', model.name);
});

///////////////////////////////
// 2
// インスタンス生成後にgetterを使ってメンバを決定
///////////////////////////////
var doc = new Animal();
doc.name = 'poti';
doc.type = 'dog';

doc.save(function (err, model) {
  if (err) return handleError(err);

  console.log('create %s', model.name);
});

///////////////////////////////
// 3
// createはstaticな呼び出し方
///////////////////////////////
Animal.create({name: 'chunchun', type: 'bird'},function (err, model) {
  if (err) return handleError(err);

  console.log('create %s', model.name);
});

///////////////////////////////
// 4
// オブジェクトの配列から複数のdocumentを生成させる
// createはオブジェクトのstaticな呼び出し方
///////////////////////////////
// var animals = [
//   {name: 'poti', type: 'dog'},
//   {name: 'taro', type: 'dog'},
//   {name: 'jiro', type: 'dog'},
// ];
// Animal.create(animals ,function (err, animals) {
//   if (err) return handleError(err);
// 
//   animals.forEach(function(animal){
//     console.log('create %s', model.name);
//   });
// })
