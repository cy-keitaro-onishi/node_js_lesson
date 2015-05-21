var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/lesson');
db.on('error', console.error.bind(console, 'connection: error'));
db.once('open', function(){
  console.log('open database');
});


/**
 * スタティックメソッドの定義はスキーマインスタンス生成後に
 * 行う必要がある
 *
 * モデルに対してメソッドを定義するのではなく、
 * スキーマに対して定義する必要があるので注意
 */
var animalSchema = new Schema({ name: String, type: String });
animalSchema.statics.findByName = function (name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
}

var Animal = mongoose.model('Animal', animalSchema);
Animal.findByName('fido', function (err, animals) {
  console.log(animals);
});
