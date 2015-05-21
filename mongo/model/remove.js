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
var Animal = mongoose.model('CleanAnimal', animalSchema);

/**
 * 作成
 * 削除
 * 取得
 * を順番に実行。もちろん取得結果は0件にっている
 */
Animal.create({name: 'chunchun', type: 'bird'},function (err, model) {
  console.log('create %s', model.name);

  Animal.findOne(function(err, animal){
    animal.remove(function(err){
      Animal.find(function(err, animals){
        console.log('Animal count: %d', animals.length);
      });
    });
  });

})
