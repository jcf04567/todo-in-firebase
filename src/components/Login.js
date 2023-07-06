import React from "react";
import { Link, useNavigate } from "react-router-dom";
import loginFirebase from "../service/firebase/loginFirebase";
import sendEmailLink from "../service/firebase/sendEmailLink";
import { isSignInWithEmailLink, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../service/firebase/firebase";
import submitPasswordResetEmail from "../service/firebase/submitPasswordResetEmail";
import { issueMsg } from "../service/common/issueMsg";


const Login = () => {
  const navigate = useNavigate();
  let goHome = false;

  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = window.prompt("メールアドレスを入力してください");
    }
    loginFirebase("mailLink", email).then((ret) => ret && (goHome = true));
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const [loginEmail, loginPassword] = e.target.elements;
    loginFirebase("email", loginEmail.value, loginPassword.value).then(
      (ret) => ret && navigate("/")
    );
  };

  const handleMailLink = (e) => {
    e.preventDefault();
    const [emailLink] = e.target.elements;

    sendEmailLink(emailLink.value);
  };

  const handlePasswordRest = (e) => {
    e.preventDefault();
    const [resetEmail] = e.target.elements;
    submitPasswordResetEmail(resetEmail.value);
  };

  const handleGoogleLogin = async(e) => {
    try{
      // ここでFirebaseにアクセスするのはダメ。
      // firebaseフォルダのloginProvider(auth,provider)をコールするようにする。
      // 成功したら、”/”に遷移する。
      await signInWithPopup(auth, googleProvider);
    } catch(error) {
      if (error.code === 'auth/popup-closed-by-user') {
        issueMsg('GoogleIdでのログインがキャンセルされました。');
        navigate("/");
      } else {
        console.log(error.code);
        alert(error.message);
      }
    }
  }

  return (
    <>
      {goHome ? (
        navigate("/")
      ) : (
        <div>
          <h2>ログイン</h2>
          <div className="login-type">
            <h3>メールでログイン</h3>
            <form onSubmit={handleLogin}>
              <div>
                <label htmlFor="email">メールアドレス: </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                />
              </div>
              <div>
                <label htmlFor="password">パスワード: </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                />
              </div>
              <div>
                <button>ログイン</button>
              </div>
            </form>
            <form onSubmit={handleMailLink}>
              メールリンクによるログインはこちらをクリック
              <div>
                <label htmlFor="emailLink">メールアドレス: </label>
                <input
                  type="email"
                  id="emailLink"
                  name="emailLink"
                  placeholder="email"
                />
              </div>
              <button>メール送信</button>
            </form>
            <form onSubmit={handlePasswordRest}>
              パスワードを忘れた方はパスワードリセットのメールを送信します。
              <div>
                <label htmlFor="passwordRest">メールアドレス: </label>
                <input
                  type="email"
                  id="passwordRest"
                  name="passwordRest"
                  placeholder="email"
                />
              </div>
              <button>メール送信</button>
            </form>
            <div>
              ユーザー登録は<Link to={"/signup"}>こちら</Link>から
            </div>
          </div>
          <div className="login-type">
            <h3>Googleでログイン</h3>
            <img onClick={handleGoogleLogin} src={`${process.env.PUBLIC_URL}/btn_google_signin_light_focus_web.png`} alt="Googlでログインのアイコン"/>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
