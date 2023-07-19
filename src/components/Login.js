import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isSignInWithEmailLink } from "firebase/auth";

import { Input, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import EmailIcon from "@mui/icons-material/Email";

import loginFirebase from "../service/firebase/loginFirebase";
import sendEmailLink from "../service/firebase/sendEmailLink";
import { auth, googleProvider } from "../service/firebase/firebase";
import submitPasswordResetEmail from "../service/firebase/submitPasswordResetEmail";
import Title from "./Title";

const Login = () => {
  const navigate = useNavigate();
  let goHome = false;

  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = window.prompt("メールアドレスを入力してください");
    }
    loginFirebase("mailLink", email).then((ret) => ret && (goHome = true));
  } else {

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

  const handlePasswordReset = (e) => {
    e.preventDefault();
    const [resetEmail] = e.target.elements;
    submitPasswordResetEmail(resetEmail.value);
  };

  const handleGoogleLogin = async (e) => {
    loginFirebase("google", googleProvider).then((ret) => ret && navigate("/"));
  };

  return (
    <>
      {goHome ? (
        navigate("/")
      ) : (
        <div>
          <Title />
          <h2>ログイン</h2>
          <div className="login-type">
            <h3>メールでログイン</h3>
            <form onSubmit={handleLogin}>
              <div>
                <label htmlFor="email">メールアドレス: </label>
                <Input
                  id="email"
                  name="email"
                  placeholder="email"
                  type="email"
                />
              </div>
              <div>
                <label htmlFor="password">パスワード: </label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                />
              </div>
              <div style={{ margin: "5px 0" }}>
                <Button
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  type="submit"
                >
                  ログイン
                </Button>
              </div>
            </form>
            <form onSubmit={handleMailLink}>
              メールリンクによるログインはこちらをクリック
              <div>
                <label htmlFor="emailLink">メールアドレス: </label>
                <Input
                  type="email"
                  id="emailLink"
                  name="emailLink"
                  placeholder="email"
                />
              </div>
              <div style={{ margin: "5px 0" }}>
                <Button
                  variant="outlined"
                  endIcon={<EmailIcon />}
                  type="submit"
                >
                  メール送信
                </Button>
              </div>
            </form>
            <form onSubmit={handlePasswordReset}>
              パスワードを忘れた方はパスワードリセットのメールを送信します。
              <div>
                <label htmlFor="passwordRest">メールアドレス: </label>
                <Input
                  type="email"
                  id="passwordRest"
                  name="passwordRest"
                  placeholder="email"
                />
              </div>
              <div style={{ margin: "5px 0" }}>
                <Button
                    variant="outlined"
                    endIcon={<EmailIcon />}
                    type="submit"
                >メール送信
                </Button>
              </div>
            </form>
            <div>
              ユーザー登録は<Link to={"/signup"}>こちら</Link>から
            </div>
          </div>
          <div className="login-type">
            <h3>Googleでログイン</h3>
            <img
              onClick={handleGoogleLogin}
              src={`${process.env.PUBLIC_URL}/btn_google_signin_light_focus_web.png`}
              alt="Googlでログインのアイコン"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
