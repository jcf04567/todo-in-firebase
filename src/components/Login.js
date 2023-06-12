import { Link, useNavigate } from "react-router-dom";
import loginFirebase from "../service/firebase/loginFirebase";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const [email, password] = e.target.elements;
    loginFirebase(email.value, password.value)
    .then(ret => ret && navigate('/'));
  }

  return(
    <div>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">メールアドレス: </label>
          <input type="email" id="email" name="email" placeholder="email" />
        </div>
        <div>
          <label htmlFor="password">パスワード: </label>
          <input type="password" id="password" name="password" placeholder="password" />
        </div>
        <div>
          <button>ログイン</button>
        </div>
      </form>
      <div>
        ユーザー登録は<Link to={'/signup'}>こちら</Link>から
      </div>
    </div>

  );
}

export default Login;
