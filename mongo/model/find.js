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

Animal.create({name: 'chunchun', type: 'bird'},function (err, model) {
  if (err) return handleError(err);

  console.log('create %s', model.name);
})


/**
 * 単純に全部取ってくる奴
 * ※fondだと1レコードを取得するというイメージが有る人は要注意
 */
Animal.find(function(err, animals){
  console.log('Animal.find(function(err, animals)');
  if(err)
  {
    return console.error(err);
  }

  animals.forEach(function(animal){
    console.log('animal name is %s', animal.name);
  });
});

/**
 * 一部のdocument keyの一致したものを取得する
 */
Animal.find({type: 'bird'}, function(err, animals){
  console.log("Animal.find({type: 'bird'}, function(err, animals){");
  if(err)
  {
    return console.error(err);
  }

  animals.forEach(function(animal){
    console.log('animal name is %s', animal.name);
  });
});

/**
 * 1レコードだけが欲しい場合はfindOneを使う
 */
Animal.findOne(function(err, animal){
  console.log('Animal.findOne(function(err, animal){');
  if(err)
  {
    return console.error(err);
  }

  console.log('animal name is %s', animal.name);
});


/**
 * _idが特定できている場合はfindByIdで引っこ抜けるよ
 */
// 何かしらの_idがほしいので適当なやつを引っ張ってくる
Animal.findOne(function(err, animal){
  // ちなみにidに関しては[Object.id, Object._id]どっちでも取れます
  if(animal.id != animal._id) console.error('error');
  var id = animal.id;

  Animal.findById(id, function(err, animal){
    console.log('Animal.findById(id, function(err, animal){');
    console.log('animal name is %s', animal.name);
  });
});
