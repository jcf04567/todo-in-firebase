import getCredential from "../firebase/getCredential";
import { updatePassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { issueMsg } from "../common/issueMsg";

export const changePassword = async (oldPassword,newPassword) => {

    const user = auth.currentUser;

    try{
        await getCredential('email',user, oldPassword);
        await updatePassword(user,newPassword);
        issueMsg(`パスワードの変更が完了しました。：${user.email}`);
        return true;
      } catch(error) {
        if (error.code === 'auth/wrong-password') {
        issueMsg('入力したパスワードが不正です。');
        } else {
          issueMsg(`パスワード変更処理で不正が発生しました。${error.code}`);
        }
        console.log(`パスワード変更失敗`);
        console.log(user);
        console.error(error);
        return false;
      }
  }

export default changePassword;
