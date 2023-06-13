import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "./firebase"
import { issueMsg } from "../common/issueMsg";

const mailRegistration = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(auth.currentUser);
    issueMsg("認証のためのメールを送信しました。メールのURLをクリックして当該メールを認証してください。");
    return true;
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      issueMsg("正しいメールアドレスの形式で入力してください。");
    } else if (error.code === 'auth/weak-password') {
      issueMsg("パスワードは6文字以上を設定する必要があります。");
    } else if (error.code === 'auth/email-already-in-use') {
      issueMsg("そのメールアドレスは登録済みです。");
    } else {
      issueMsg(`登録時にエラーが発生しました。${error.code}`);
    }
    console.error(error);
    return false;
  }
}

export { mailRegistration } ;
