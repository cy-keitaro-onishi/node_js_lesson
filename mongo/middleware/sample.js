var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/lesson');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error'));
db.once('open', function(){
});

var animalSchema = new Schema({
  name: 'String',
});
var Animal = mongoose.model('Animal', animalSchema);

/**
 * middlewareにはpreとpostがあり、initやsave、validate、removeの前後の処理をSchemaレベルで定義できる
 * これは面白い
 * またpre, postの第二引数に渡す無形関数のthisはdocument自身になっているの
 * この仕組とWebSocketなんかは相性が良いのではないか
 *
 * わかりやすい日本語ブログも見つけた
 * http://intink.blogspot.jp/2012/12/nodejs-mongodb-mongoosemiddleware.html
 *
 * pre  -> 実行前
 * post -> 実行後
 */

/**
 * next()は次に行う処理を実行する
 * 複数のイベントが登録されている場合に次のイベントを実行するようになっている
 * 特に他のイベントが登録されていない場合はsave()が実行される
 */
animalSchema.pre('save', function (next) {
  console.log('-----------------------this callback is pre.save1');
  console.log('animal name is %s', this.name);
  next();
});
animalSchema.pre('save', function (next) {
  console.log('-----------------------before save');
  console.log('-----------------------this callback is pre.save2');
  console.log('animal name is %s', this.name);
  next();
});

/**
 * docにdocumentがはいっている
 */
animalSchema.post('save', function (doc) {
  console.log('-----------------------this callback is post.save');
  console.log('animal name is %s', this.name);
  console.log('animal name is %s', doc.name);
});

/**
 * このanimalsaveはpreの無名関数評価 -> save処理 -> postの無名関数評価 -> saveの無名関数評価
 * の順番で実行されるどん
 */
var animal = new Animal();
animal.name = 'poti';
animal.save(function(e, animal){
  console.log('-----------------------this callback is save');
});
