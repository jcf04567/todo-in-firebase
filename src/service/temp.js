


// Firebaseの認証インスタンスを取得します。
const auth = firebase.auth();

// 現在のユーザーを取得します。
const user = auth.currentUser;

// パスワードを再入力してもらいます。
const password = prompt("パスワードを入力してください。");

// ユーザーを再認証します。
auth.reauthenticateWithCredential(EmailAuthProvider.credential(user.email, password))
.then(() => {
auth.deleteUser().then(() => {
console.log("メールアドレスの削除が完了しました。");
}, error => {
console.log(error);
});
}, error => {
console.log(error);
});

// ユーザーが入力したパスワードを取得
// var password = window.prompt('現在のパスワードを入力してください', '');
// ユーザーのメールアドレスとパスワードから認証情報を作成
var credential = firebase.auth.EmailAuthProvider.credential(
    firebase.auth().currentUser.email, password);
// ユーザーを再認証
firebase.auth().currentUser.reauthenticateWithCredential(credential).then(function() {
  // ユーザーが再認証された
  // ここでメールアドレスの削除などの処理を行う
}).catch(function(error) {
  // エラーが発生した
});
