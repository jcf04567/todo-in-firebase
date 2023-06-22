import { Link, useNavigate } from "react-router-dom";
import loginFirebase from "../service/firebase/loginFirebase";
import sendEmailLink from "../service/firebase/sendEmailLink";
import { isSignInWithEmailLink } from "firebase/auth";
import { auth } from "../service/firebase/firebase";
import submitPasswordResetEmail from "../service/firebase/submitPasswordResetEmail";

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

  return (
    <>
      {goHome ? (
        navigate("/")
      ) : (
        <div>
          <h2>ログイン</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="email">メールアドレス: </label>
              <input type="email" id="email" name="email" placeholder="email" />
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
      )}
    </>
  );
};

export default Login;
