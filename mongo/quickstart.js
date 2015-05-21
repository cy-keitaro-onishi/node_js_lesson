// npm install mongoose
// はじめに感想
// 用意されているAPIが多すぎて全部紹介はできない
// 毎回実装のたびに最適なAPI(query関係)を選択してコードを書くのがよさそう
// ぶっちゃけ使いこなさなくてもものは作れるだろうけどねー
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lesson');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error'));
db.once('open', function(){
  console.log('open database');
});


var userSchema = mongoose.Schema({
  age: Number,
  name: String
});

// methodの作成はscheme定義の後でなければならない
userSchema.methods.introduction = function()
{
  return 'my name is ' + this.name;
};
var User = mongoose.model('User', userSchema);
var tanaka = new User({
  age: 18,
  name: 'tanaka',
});

console.log(tanaka);
console.log(tanaka.introduction());

tanaka.save(function(err, tanaka){
  if(err)
  {
    return console.error(err);
  }

  console.log('saved' + tanaka);
  console.log(tanaka.introduction());
});

// newをした時点で_idが採番されるので
// saveを連打しても生成されるdocumentは1つだけ
tanaka.save();
tanaka.save();
tanaka.save();
tanaka.save();

User.find(function(err, users){
  if(err)
  {
    return console.error(err);
  }

  console.log(users);
});
