import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"

const mailRegistration = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return true;
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      alert("正しいメールアドレスの形式で入力してください。");
    } else if (error.code === 'auth/weak-password') {
      alert("パスワードは6文字以上を設定する必要があります。");
    } else if (error.code === 'auth/email-already-in-use') {
      alert("そのメールアドレスは登録済みです。");
    } else {
      alert(`登録時にエラーが発生しました。${error.code}`);
    }
    console.error(error);
    return false;
  }
}

export { mailRegistration } ;
