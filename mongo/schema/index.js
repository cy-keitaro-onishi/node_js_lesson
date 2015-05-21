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
  // field level
  tags: { type: [String], index: true }
});

// schema level
animalSchema.index({ name: 1, type: -1 });

/**
 * When your application starts up, Mongoose automatically calls ensureIndex for each defined index in your schema. While nice for development, it is recommended this behavior be disabled in production since index creation can cause a significant performance impact. Disable the behavior by setting the autoIndex option of your schema to false.
 * アプリ実行時に定義されているインデックスを元にensureIndexを実行し
 * 自動的にインデックス生成を行うため本番環境などではインデックスの自動生成は避けるべき
 *
 * 以下の方法でインデックスの自動生成
 * autoindexを無効にすることができる
 */
animalSchema.set('autoIndex', false);
// or
// new Schema({..}, { autoIndex: false });
