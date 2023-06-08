// import { auth } from "./firebase";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";


const getCredential = async (type, user) => {

  const password = prompt('パスワードを入力してください');
  if (type === 'email') {
    // email用Credentialを求める

    try{
      const credential = await EmailAuthProvider.credential(
                          user.email,
                          password);
      await reauthenticateWithCredential(user,credential);
    } catch(error) {
      console.log(error.code);
      console.log(error);
    }
      return;
  } else if(type === 'google') {
    // google用Credentialを求める
  } else {
    console.log('不当な認証情報要求です');
  }

  return;

}

export default getCredential;
