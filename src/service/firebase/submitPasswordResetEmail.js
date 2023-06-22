import { sendPasswordResetEmail } from "firebase/auth";
import { issueMsg } from "../common/issueMsg";
import { auth } from "./firebase";


const submitPasswordResetEmail = async (email) => {
  const actionCodeSettings = {
    // パスワード再設定後のリダイレクト URL
    url: process.env.REACT_APP_REDIRECT_URL_LOGIN,
    handleCodeInApp: false,
  }
  try{
    await sendPasswordResetEmail(auth,email,actionCodeSettings);
    issueMsg(`${email}にパスワードリセットのためのメールを送信しました。`);
  } catch(error){
    console.log(error.code);
    console.log(error);
    issueMsg('パスワードリセットのメール送信に失敗しました。', error.code);
  }



}

export default submitPasswordResetEmail;
