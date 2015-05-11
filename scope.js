// globalスコープとlocalスコープに関して
//
// さて、この場合consoleにはどのような値が出力されるだろうか
// hint: Array.joinのundefinedの扱いは空文字列
// hint: スコープの巻き上げ
// hint: var 宣言なしでのmethod内での変数の宣言・利用

var hoge = '1';
var fuga = '2';
var piyo = '3';

function method()
{
  console.log('②: ' + [hoge, fuga, piyo].join(','));

  var hoge = '-1';
  var fuga = '-2';
  piyo     = '-3';

  console.log('③: ' + [hoge, fuga, piyo].join(','));
}

console.log('①: ' + [hoge, fuga, piyo].join(','));

method();

console.log('④: ' + [hoge, fuga, piyo].join(','));


// 答え
// ②のpiyoがundefinedと評価されない理由とは？
// ②のhoge, fugaがundefinedなのなぜ？
//
//
// 1: piyoはmethod()ないではvar 宣言されておらずpiyoはglobalスコープのpiyoである
//
// 2: ②のhoge, fugaがundefinedなのは変数の巻き上げ(Hoisting)がおこっているからである
// javascriptでは関数内の変数は関数の1行目にすべて暗黙的に宣言される。これを変数の巻き上げ(Hoisting)という
// method()内は実際にはこんなかんじになっている。これなら納得ではないでしょうか。
var hoge = '1';
var fuga = '2';
var piyo = '3';

function method()
{
  // ここが暗黙的に追加される
  var hoge, fuga;

  console.log('②: ' + [hoge, fuga, piyo].join(','));

  hoge = '-1';
  fuga = '-2';
  piyo = '-3';

  console.log('③: ' + [hoge, fuga, piyo].join(','));
}

console.log('①: ' + [hoge, fuga, piyo].join(','));

method();

console.log('④: ' + [hoge, fuga, piyo].join(','));

// Hoistingはやっかいで以下のようなことに気をつけろとMDSの例
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/var
