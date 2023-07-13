import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  } from "firebase/auth";

const getCredential = async (type, user, pass = null) => {
  let credential;
  if (type === "email") {
    let password;
    pass
      ? (password = pass)
      : (password = prompt("パスワードを入力してください"));
    if (!password) {
      return false;
    }
    // email用Credentialを求める
    credential = EmailAuthProvider.credential(user.email, password);

  } else if (type === "google") {

    // 現時点では、プロバイダーがGoogleの時には、当該関数はコールされない。

  } else {
    console.log("不当な認証情報要求です");
    return false;
  }
  await reauthenticateWithCredential(user, credential);
  return true;
};

export default getCredential;
