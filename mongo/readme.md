# MongoDBのコマンド操作などはqiitaを見たほうが速い

http://qiita.com/saba1024/items/f2ad56f2a3ba7aaf8521


# 必要なnpmモジュール群

## mongoose

http://mongoosejs.com/docs/guide.html
mongooseを拡張させるためのpluginなどもパラパラある模様

mongodbを操作するためのODMライブラリ
Object Document Mapperとのこと
思っていたよりもかなりパワフルな機能を兼ね揃えている
基本的に全て？のmongodb操作コマンドのラッパーAPIはPromiseを返すようになっている
ただ、mongoose独自実装のPromiseなのか、他のPromiseライブラリが備えているAPIが使えなかったりと、少し使いづらいなぁと感じた。
スキーマの定義・スキーマを用いたvalidationが行えたりするところがいい感じだなぁと感じた

## bluebird

Promiseライブラリのひとつ
王国での採用実績あり
mongooseの貧弱なPromiseを補うことができる。できた。






