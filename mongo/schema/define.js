var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/lesson');
db.on('error', console.error.bind(console, 'connection: error'));
db.once('open', function(){
  console.log('open database');
});


/**
 * スキーマの作成
 * スキーマインスタンス生成後新しい定義を追加したい場合は
 * Scheme#add methodを使うことで追加することができる
 *
 * スキーマのパターンはこんな感じ
 * The permitted SchemaTypes are
 * - String
 * - Number
 * - Date
 * - Buffer
 * - Boolean
 * - Mixed
 * - ObjectId
 * - Array
 *
 * 詳しくはこっち
 *   http://mongoosejs.com/docs/schematypes.html
 */
var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

/**
 * スキーマを元にModelを作成する
 */
var Blog = mongoose.model('Blog', blogSchema);

