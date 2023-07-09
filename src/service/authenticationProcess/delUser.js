import {
  deleteUser,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import getCredential from "../firebase/getCredential";
import { issueMsg } from "../common/issueMsg";
import loginFirebase from "../firebase/loginFirebase";

export const delUser = async () => {
  const user = auth.currentUser;
  let loginProvider;

  try {
    // ここで、ログインしているプロバイダーを判断する
    if (user.providerData[0].providerId === "password") {
      loginProvider = "email";
    } else if (user.providerData[0].providerId === "google.com") {
      loginProvider = "google";
      /******* Google認証の退会処理開始 *******/
      // 退会用のログイン
      const currentLogonUserEmail = user.email;
      issueMsg(
        "ログインしているGoogle IDで再ログインしてください",
        currentLogonUserEmail
      );
      try {
        // ポップアップウインドウが表示
        // await signInWithPopup(auth, googleProvider);
        await loginFirebase("google",googleProvider);
        const newUser = auth.currentUser;
        const newUserEmail = newUser.email;
        await deleteUser(newUser);
        if (newUserEmail !== currentLogonUserEmail) {
          issueMsg(
            "再ログインしたGoogleIdが異なります。再度ログインして退会処理をやり直してください。誤ログインEmail:",
            newUserEmail
          );
          return false;
        }
        issueMsg("退会処理が完了しました。：", newUser.email);
        return true;
      } catch (error) {
        if (error.code === "auth/popup-closed-by-user") {
          issueMsg(
            "退会処理のためのGoogleIdでのログインがキャンセルされました。"
          );
          return false;
        } else {
          console.log(error.code);
          issueMsg(error.message);
          return false;
        }
      }
      /******  Google認証の退会処理終了 *******/
    } else {
      issueMsg(
        "退会処理で不当なプロバイダーが指定された。",
        user.providerData[0].providerId
      );
      return false;
    }
    const result = await getCredential(loginProvider, user);
    if (!result) {
      return false;
    }
    await deleteUser(user);
    issueMsg("退会処理が完了しました。：", user.email);
    return true;
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      issueMsg("入力したパスワードが不正です。");
    } else {
      issueMsg(`退会処理で不正が発生しました。`, error.code);
    }
    console.log(`退会失敗`);
    console.log(user);
    console.log(error);
    console.log(error.message);
    console.log(error.code);
    return false;
  }
};
