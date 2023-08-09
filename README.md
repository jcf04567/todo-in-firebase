"# todo-in-firebase"

firebaseに作成したTodoアプリ
  メールアドレスとGoogle IDでユーザー登録できる。


note

1.本番環境と開発環境で、package.jsonが異なる。
  "homepage"が定義されている方が、本番用のnpm run buildに使用する。
  本番用のコンパイルでは、package_pro.jsonをpackage.jsonとリネームする。
  開発環境のコンパイルでは、package_dev.jsonをpackage.jsonとリネームする。
  ※package.jsonの一本化の方法が分からなかった。

2.react-and-firebase-mail-and-google-authとfiewbaseのアプリが同じ。
  将来別のfiewbaseのアプリにするかも。

