import { sendSignInLinkToEmail } from "firebase/auth";
// import { auth } from "./firebase";
import { issueMsg } from "../common/issueMsg";
import { auth } from "./firebase";


const sendEmailLink = async (email) => {


  const REDIRECT_URL_LOGIN = process.env.REACT_APP_REDIRECT_URL_LOGIN;

  const actionCodeSettings = {
    url: REDIRECT_URL_LOGIN,
    handleCodeInApp: true,
  }


  try {
    await sendSignInLinkToEmail(auth,email,actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
    issueMsg('メール認証のためのメール送信しました。');

  } catch(error) {
    console.log(error);
    issueMsg('メール認証のためのメール送信に失敗しました。',error.code);
  }
}

export default sendEmailLink;
