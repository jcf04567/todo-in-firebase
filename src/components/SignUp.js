import { mailRegistration } from "../service/firebase/registration";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const [email, password] = e.target.elements;
    mailRegistration(email.value, password.value).then(ret => ret && navigate('/'));
  };

  return (
    <div>
      <h2>ユーザー登録 {user && user.email}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス: </label>
          <input
            type="email"
            name="email"
            placeholder="email"
          />
        </div>
        <div>
          <label>パスワード: </label>
          <input
            type="password"
            name="password"
            placeholder="password"
          />
          <p>パスワードは６文字以上にしてください。</p>
        </div>
        <div>
          <button>登録</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
