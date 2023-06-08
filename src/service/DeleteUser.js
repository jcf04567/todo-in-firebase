
import { deleteUser } from "firebase/auth";
import { auth } from "./firebase";
import getCredential from "./GetCredential";

export const delUserEmail = async (email, password) => {
  // const user = await auth.currentUser;
  const user = auth.currentUser;

    await getCredential('email',user);

    try{
      await deleteUser(user);
      alert(`退会処理が完了しました。：${user.email}`);
      return true;
    } catch(error) {
      alert(`退会処理で不正が発生しました。${error.code}`);
      console.log(`退会失敗`);
      console.log(user);
      console.log(password);
      console.error(error);
      return false;
    }
}


