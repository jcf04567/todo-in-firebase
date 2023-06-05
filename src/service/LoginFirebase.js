import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const loginFirebase = async (email, password) => {
  try {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return true;
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      alert('正しいメールアドレスを入力してください');
    } else if (error.code === 'auth/user-not-found') {
      alert('当該メールアドレスは、ユーザー登録がされていません。');
    } else if (error.code === 'auth/wrong-password') {
      alert('パスワードが不正です');
    } else {
      alert(`ログインで不正が発生しました。${error.code}`);
    }
    console.error(error);
    return false;
  }
}

export default loginFirebase;
