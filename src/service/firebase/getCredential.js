import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
  } from "firebase/auth";
import { auth } from "./firebase";

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
    credential = await EmailAuthProvider.credential(user.email, password);

    return true;
  } else if (type === "google") {

    // const oldIdToken = await auth.currentUser.getIdToken();
    // console.log(`old IdToken:${oldIdToken}`);
    const newIdToken = await auth.currentUser.getIdToken(true);
    console.log(`new IdToken:${newIdToken}`);

    user = auth.currentUser;
    credential = await GoogleAuthProvider.credential(newIdToken);
    // await updateCurrentUser(user);
    // credential = await GoogleAuthProvider.credential(user.getIdToken());
  } else {
    console.log("不当な認証情報要求です");
    return false;
  }
  console.log(user);
  console.log(credential);
  await reauthenticateWithCredential(user, credential);
  return true;
};

export default getCredential;
