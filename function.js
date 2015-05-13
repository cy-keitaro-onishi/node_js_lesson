// よくある関数の定義
function func1()
{
  console.log('Func2');
}
func1();



// 無名関数として定義
// 関数名は省略することができ、変数に関数を格納することができる
var func2 = function()
{
  console.log('Func2');
}

func2();

console.log(func1);
console.log(func2);


// スコープを限定するのに使われる
// 即時関数
// 関数定義と同時に関数の実行も行うことができる
// ();で終わらせる必要があるので注意
(function func3(){
  console.log('Func3');
})();


// 即時関数
// 関数名は省略することができる
(function (){
  console.log('nobody');
})();

// 即時関数
// 即時関数に対して引数を渡すことができる
(function (x, y){
  console.log(x + y);
})(10, 20);


// 即時関数
// 即時関数に対してcontextを渡すことができる
var Hoge = function(){
  this.name = 'Hoge';
};
var hoge = new Hoge();
(function (x, y){
  console.log(this.name + (x + y));
}).call(hoge, 100, 200);



// 引数に無名関数を受けて
// 実行するサンプル
// ajaxの中ってこんなかんじなのかな？というサンプル
function hogejax(option)
{
  var data = [
    'a', 'b', 'c'
  ];
  if(option.type === 'GET')
  {
    option.success(data);
  }
  if(option.type === 'POST')
  {
    option.error(data);
  }
}

hogejax({
  type: 'GET',
  url: 'http://google.com',
  success: function(data){
    console.log('hogejax successful.');
    console.log(data);
  },
  error: function(data){
    console.log('hogejax error.');
    console.log(data);
  },
})
hogejax({
  type: 'POST',
  url: 'http://google.com',
  success: function(data){
    console.log('hogejax successful.');
    console.log(data);
  },
  error: function(data){
    console.log('hogejax error.');
    console.log(data);
  },
})
