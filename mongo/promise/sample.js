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
var Animal = mongoose.model('PromiseAnimal', animalSchema);


/**
 * Promiseを使ったthenableな書き方を紹介
 * 1. poti作成
 * 2. potiを検索
 * 3. potiのメンバ修正
 * 4. potiをupdate
 * 5. 旧potiをもう一回検索
 * 6. tarouになっているではないか
 *
 * catchが書けないので注意
 */
Animal.create({name: 'poti', type: 'dog'})
  .then(function(animal){
    console.log('======1=====');
    return Animal.findById(animal.id);
  })
  .then(function(animal){
    console.log('======2=====');
    console.log('animal name is %s', animal.name);
    return animal;
  })
  .then(function(animal){
    console.log('======3=====');
    animal.name = 'tarou';
    return animal;
  })
  .then(function(animal){
    console.log('======4=====');
    return animal.save();
  })
  .then(function(animal){
    console.log('======5=====');
    return Animal.findById(animal.id);
  })
  .then(function(animal){
    console.log('======6=====');
    console.log('animal new name is %s', animal.name);
    return animal;
  });

