import { Link, useNavigate } from "react-router-dom";
import loginFirebase from "../service/firebase/loginFirebase";
import sendEmailLink from "../service/firebase/sendEmailLink";
import { isSignInWithEmailLink } from "firebase/auth";
import { auth } from "../service/firebase/firebase";

const Login = () => {
  const navigate = useNavigate();

  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = window.prompt("メールアドレスを入力してください");
    }
    loginFirebase("mailLink", email).then((ret) => ret && navigate("/"));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const [email, password] = e.target.elements;
    loginFirebase("email", email.value, password.value).then(
      (ret) => ret && navigate("/")
    );
  };

  const handleMailLink = (e) => {
    e.preventDefault();
    const [emailLink] = e.target.elements;

    sendEmailLink(emailLink.value);
  };

  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
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
      <div>
        ユーザー登録は<Link to={"/signup"}>こちら</Link>から
      </div>
    </div>
  );
};

export default Login;
