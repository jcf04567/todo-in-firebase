"# react-and-firebase-mail-and-google-auth"

メールアドレスとGoogleの認証でfirebaseにログインするだけのアプリ

本番環境と開発環境で、package.jsonが異なる。
"homepage"が定義されている方が、本番用のnpm run buildに使用する。
本番用のコンパイルでは、package_pro.jsonをpackage.jsonとリネームする。
開発環境のコンパイルでは、package_dev.jsonをpackage.jsonとリネームする。
※package.jsonの一本化の方法が分からなかった。

