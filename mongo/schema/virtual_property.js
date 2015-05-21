var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/lesson');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error'));
db.once('open', function(){
  console.log('open database');
});

/**
 * 仮想プロパティの作成
 * 仮想getter, setterというものがあると思えばよい
 * JavaScript自体にもgetter/setterは存在しており
 * そいつと振る舞いが似ているなあと
 * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 *
 */
var personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
});

personSchema.virtual('name.full').get(function () {
  return this.name.first + ' ' + this.name.last;
});
personSchema.virtual('name.full').set(function (name) {
  var split = name.split(' ');
  this.name.first = split[0];
  this.name.last = split[1];
});

var Person = mongoose.model('Person', personSchema);

var tanaka = new Person({
    name: { first: 'Tarou', last: 'Tanaka' }
});

/**
 * あたかも存在するであろうメンバを参照するだけで使うことができる
 * しかし実際に{name: {full: }}が存在しているわけではない
 */
console.log(tanaka.name.full);
console.log(tanaka.name);
console.log(tanaka.name.toJSON());


/**
 * setter内で文字列をparseして存在するメンバに更新をかけている
 */
tanaka.name.full = 'Jiro Satou';
console.log(tanaka.name.full);
console.log(tanaka.name);
console.log(tanaka.name.toJSON());
