
import { deleteUser } from "firebase/auth";
import { auth } from "../firebase/firebase";
import getCredential from "../firebase/getCredential";

export const delUserEmail = async () => {
  const user = auth.currentUser;

  try{
      const result = await getCredential('email',user);
      if (!result) {
        return false;
      }
      await deleteUser(user);
      alert(`退会処理が完了しました。：${user.email}`);
      return true;
    } catch(error) {
      if (error.code === 'auth/wrong-password') {
      alert('入力したパスワードが不正です。');
      } else {
        alert(`退会処理で不正が発生しました。${error.code}`);
      }
      console.log(`退会失敗`);
      console.log(user);
      console.error(error);
      return false;
    }
}


