var mongoose = require('mongoose');

/**
 * 文字列を使った
 * connectionの作成
 */
mongoose.connect('mongodb://localhost/lesson');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error'));
db.once('open', function(){
  console.log('open database');
});

/**
 * optionオブジェクトを使った
 * connectionの作成
 */
mongoose.connect('mongodb://localhost/lesson');
var uri = 'mongodb://localhost/lesson';
var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: 'myReplicaSetName' },
  user: 'myUserName',
  pass: 'myPassword'
}

/**
 * なんか色々オプションあるけど基本的なことだけでいいかな？
 * 詳しくはWEBで
 * http://mongoosejs.com/docs/connections.html
 */
