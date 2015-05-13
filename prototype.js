// prototype -> 親
// インスタンス -> 子供
// の認識が持てたらOK
//
//
// prototype実装していない場合
// methodの呼び出しは常にオブジェクトに定義されているbarkが呼ばれている
var Animal = function()
{
  this.bark = function()
  {
    console.log('wanwan');
  };
};

var animal1 = new Animal();
var animal2 = new Animal();
animal1.bark();
animal2.bark();

Animal.bark = function()
{
  console.log('nyaa nyaa');
}
animal1.bark();
animal2.bark();

animal1.bark = function()
{
  console.log('hyo hyo');
}
animal1.bark();
animal2.bark();

console.log('==============================================================')
console.log('==============================================================')
console.log('==============================================================')

// prototype実装している場合
// animel1.bark()を実行した際にオブジェクトにbarkメソッドは実装されていないので
// prototypeにメソッドが実装されているかを探索し実行している
// オブジェクトに直接barkメソッドを定義することでprototypeまで探索が走っていないことが確認できる
// prototypeに実装している内容を変更するとその、影響度はprototypeを継承しているすべてのオブジェクトにまで及ぶ
var Animal = function()
{
  Animal.prototype.bark = function()
  {
    console.log('wanwan');
  };
};

var animal1 = new Animal();
var animal2 = new Animal();
animal1.bark();
animal2.bark();

Animal.prototype.bark = function()
{
  console.log('nyaa nyaa');
}
animal1.bark();
animal2.bark();

animal1.bark = function()
{
  console.log('hyo hyo');
}
animal1.bark();
animal2.bark();




console.log('==============================================================')
console.log('==============================================================')
console.log('==============================================================')

// まとめたprototypeメソッドの定義の仕方
var Animal = function(){};
Animal.prototype = {
  bark: function()
  {
    console.log('bark');
  },
  walk: function()
  {
    console.log('walk');
  },
};
var animal = new Animal();
animal.bark();
animal.walk();



console.log('==============================================================')
console.log('==============================================================')
console.log('==============================================================')

// javascriptのprototypeベースオブジェクト指向言語での継承とは
//
// 人間・動物はともに哺乳類のsuperクラスである
// 哺乳類は歩くことができるのでwalkメソッドを持っている
// もし哺乳類が飛べるようにするのならこんなかんじで後から追加することもできる
// もちろん、人間にだけ特別なメソッドを追加することもできる
// よくあるClass.extends的な書き方も中でやっていることは多分こんなこと
var Mammal= function(){};
Mammal.prototype = {
  walk: function()
  {
    console.log('walk');
  },
};
var Animal = function(){};
var Human  = function(){};
Animal.prototype = new Mammal;
Human.prototype  = new Mammal;

var poti   = new Animal();
var tanaka = new Human();
poti.walk();
tanaka.walk();

Mammal.prototype.fly = function()
{
  console.log('fly!!')
};

poti.fly();
tanaka.fly();

Human.prototype.speak = function()
{
  console.log('hello.');
}
console.log(typeof poti.speak);
console.log(typeof tanaka.speak);




console.log('==============================================================')
console.log('==============================================================')
console.log('==============================================================')

// すべてのクラスはObjectクラスのprototypeを持っている
Object.prototype.printHoge = function()
{
  console.log('hello hoge');
}
Object.printFuga = function()
{
  console.log('hello fuga');
}
var Hoge = function(){};
var hoge = new Hoge();
console.log(hoge.printHoge);
console.log(hoge.printFuga);








console.log('==============================================================')
console.log('==============================================================')
console.log('==============================================================')

// prototypeの載せ替え
// 亀のprototypeを持っているミドリガメをうさぎに変身させる
//
// prototypeの載せ替えは__proto__を上書きする必要がある
// ↓これではダメ
// greenTurtle.prototype = Rabbit.prototype;
// __proto__ には prototype のアドレスが格納されている。prototype は __proto__ のアドレスを参照し、プロトタイプチェーンが実現している。
// http://www.sirochro.com/note/js-prototype-and-proto/
function Turtle(){};
function Rabbit(){};
Turtle.prototype.run = function()
{
  console.log('slow...');
};
Rabbit.prototype.run = function()
{
  console.log('fast!!');
};

var greenTurtle = new Turtle();

console.log('変身前');
greenTurtle.run();
console.log('Object.getPrototypeOf(greenTurtle) === Turtle.prototype:' + (Object.getPrototypeOf(greenTurtle) === Turtle.prototype));
console.log('Object.getPrototypeOf(greenTurtle) === Turtle.prototype:' + (Object.getPrototypeOf(greenTurtle) === Rabbit.prototype));

greenTurtle.__proto__ = Rabbit.prototype;
console.log('変身前後');
greenTurtle.run();
console.log('Object.getPrototypeOf(greenTurtle) === Turtle.prototype:' + (Object.getPrototypeOf(greenTurtle) === Turtle.prototype));
console.log('Object.getPrototypeOf(greenTurtle) === Turtle.prototype:' + (Object.getPrototypeOf(greenTurtle) === Rabbit.prototype));
