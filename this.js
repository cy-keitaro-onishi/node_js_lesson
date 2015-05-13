var Hoge = function()
{
  this.member = 'Hoge',
  this.print = function()
  {
    console.log(this.member);
  };
};
// 何かに所属している時のthisなので Hoge と表示
var hoge = new Hoge();
hoge.print();


// thisをすり替えての実行
var context = {member: 'Override'};
hoge.print.call(context);

console.log('==============================================================')
console.log('==============================================================')
console.log('==============================================================')

// thisを保護する方法
var ProtectedHoge = function ProtectedHoge(msg) {
  // this を保存しておく
  var _this = this;

  this.member = 'Hoge',
  this.print = (function(fn) {
    // fn に元々のthis.printが入ってる。
    return function() {
      // 元々のthis.printを_thisに保存しておいた元々のthisを指定して実行しなおす。
      return fn.apply(_this, arguments);
    };
  })(this.print);
}
ProtectedHoge.prototype.print = function() {
  console.log(this.member);
}

var obj = new ProtectedHoge("NinjaSlayer");
obj.print();
obj.print.call({member: 'Override'});


console.log('==============================================================')
console.log('==============================================================')
console.log('==============================================================')

// call/ applyの違い
// call: 引数の渡し方がカンマ区切り
// apply: 引数の渡し方が配列
var Calcurator = function()
{
  this.label = 'Label: ';
  this.plus = function(a, b)
  {
    console.log(this.label + (a + b));
  }
}

var calcurator = new Calcurator();
calcurator.plus.call({label: 'New Label:'}, 10, 20);
calcurator.plus.apply({label: 'New Label:'}, [10, 20]);
