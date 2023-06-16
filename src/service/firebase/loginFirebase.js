import { signInWithEmailAndPassword, signInWithEmailLink } from "firebase/auth";
import { auth } from "./firebase";
import { issueMsg } from "../common/issueMsg";

const loginFirebase = async (type,email, password = null) => {
  if (type === 'email' ){
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // メール認証済みかどうかをチェック　メール認証
      return true;
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        issueMsg('正しいメールアドレスを入力してください');
      } else if (error.code === 'auth/user-not-found') {
        issueMsg('当該メールアドレスは、ユーザー登録がされていません。');
      } else if (error.code === 'auth/wrong-password') {
        issueMsg('パスワードが不正です');
      } else if (error.code === 'auth/too-many-requests') {
        issueMsg('パスワードの入力不正が規定回数を超えました。');
      } else if (error.code === 'auth/user-disabled') {
        issueMsg('ユーザが無効になっています。');
      } else {
        issueMsg('ログインで不正が発生しました。',error.code);
      }
      console.error(error);
      return false;
    }
  } else if(type === 'mailLink') {
    try {
      await signInWithEmailLink(auth, email, window.location.href);
    } catch(error) {
      issueMsg('メール認証ログインに失敗しました',error.code)
    }
  }
}

export default loginFirebase;
