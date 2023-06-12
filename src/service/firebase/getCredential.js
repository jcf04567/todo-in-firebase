// import { auth } from "./firebase";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";


const getCredential = async (type, user, pass=null) => {

  let password;
  pass ? password = pass : password = prompt('パスワードを入力してください');
  if (!password) {
    return false;
  }
  if (type === 'email') {
    // email用Credentialを求める
      const credential = await EmailAuthProvider.credential(
                          user.email,
                          password);
      await reauthenticateWithCredential(user,credential);
  } else if(type === 'google') {
    // google用Credentialを求める
  } else {
    console.log('不当な認証情報要求です');
    return false
  }

  return true;

}

export default getCredential;
