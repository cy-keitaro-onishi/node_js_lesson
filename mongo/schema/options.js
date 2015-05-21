var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/lesson');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error'));
db.once('open', function(){
  console.log('open database');
});


/**
 * new Schema(types, options)みたいにoptionを設定することができる
 * 下参考
 *
 * - autoIndex
 * - capped
 * - collection
 * - id
 * - _id
 * - minimize
 * - read
 * - safe
 * - shardKey
 * - strict
 * - toJSON
 * - toObject
 * - validateBeforeSave
 * - versionKey
 * - skipVersioning
 *
 * 詳しくは参考へ
 *   http://mongoosejs.com/docs/guide.html
 */
var schema = new Schema(
  { name: String },

  /**
   * - _idを採番しなくなる
   * - toJSONした時にvirtual getterも評価対象に含む
   */
  {
    id: false,
    toJSON: { getters: true, virtuals: true }
  }
);
schema.virtual('hoge').get(function () {
  return 'hoge';
});

var Page = mongoose.model('Page', schema);
var p = new Page({ name: 'mongodb.org' });
console.log(p.toJSON());
