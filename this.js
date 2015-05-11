// 値と参照に関して
// Number / String / Booleanがプリミティブ（基本データ型）
// プリミティブな値
// JavaScriptではIntegerみたいなのではなくNumber型なので注意
// String型もプリミティブ型なので注意
var number1 = 100;
var number2 = number1;

number1 = 200;

console.log('number1: ' + number1);
console.log('number2: ' + number2);

console.log(typeof 1);
console.log(typeof 1.0);

console.log('==============================================================')
console.log('==============================================================')
console.log('==============================================================')

// 参照型
// 配列・オブジェクトは参照型なので注意する
// 単純な配列な場合はArray.sliceを使うことでできるが、オブジェクトの場合なんかは面倒臭い
// underscore.jsの_.cloneとかつかうと簡単にできる
var arr1 = [1, 2, 3, 4, 5];
var arr2 = arr1;
var arr3 = arr1.slice();

arr1.reverse();

console.log('arr1: ' + arr1);
console.log('arr2: ' + arr2);
console.log('arr3: ' + arr3);


var obj1 = {
  name: 'おぶじぇ',
  func: function()
  {
    return 'I am ' + this.name;
  }
};
var obj2 = obj1;

obj1.func = function()
{
    return 'This is ' + this.name;
};

console.log('obj1: ' + obj1.func());
console.log('obj2: ' + obj2.func());


console.log('==============================================================')
console.log('==============================================================')
console.log('==============================================================')


// thisを偽造してのmethodよびだし
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
