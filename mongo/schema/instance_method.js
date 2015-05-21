var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/lesson');
db.on('error', console.error.bind(console, 'connection: error'));
db.once('open', function(){
  console.log('open database');
});


/**
 * インスタンスメソッドの定義はスキーマインスタンス生成後に
 * 行う必要がある
 *
 * モデルに対してメソッドを定義するのではなく、
 * スキーマに対して定義する必要があるので注意
 */
var animalSchema = new Schema({ name: String, type: String });
animalSchema.methods.findSimilarTypes = function (cb) {
  return this.model('Animal').find({ type: this.type }, cb);
}

var Animal = mongoose.model('Animal', animalSchema);
var dog = new Animal({ type: 'dog' });

dog.findSimilarTypes(function (err, dogs) {
  console.log(dogs);
});
