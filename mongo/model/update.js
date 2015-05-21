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
var Animal = mongoose.model('UpdateAnimal', animalSchema);

///////////////////////////////////////////////
/// イベントループの都合上不要なところはコメントにしないとconsoleみずらい
///////////////////////////////////////////////

/**
 * potiをtarouにupdateする
 */
Animal.create({name: 'poti', type: 'dog'},function (err, animal) {
  console.log('create %s', animal.name);

  Animal.findOne(function(err, animal){
    animal.name = 'tarou';
    animal.save(function(err, animal){
      console.log('create %s', animal.name);
    });
  });

});


/**
 * mikeをtamaにupdateする
 */
Animal.create({name: 'mike', type: 'cat'}, function (err, animal) {
  console.log('create %s', animal.name);
  Animal.findByIdAndUpdate(animal.id, { $set: { name: 'tama' }}, function(err, animal){
      // ここで表示されるのは更新前
      console.log('create %s', animal.name);
      // もう一度findで取得すると書き換わっている
      Animal.findById(animal.id, function(err, animal){
        console.log('create %s', animal.name);
      });
  });
});
