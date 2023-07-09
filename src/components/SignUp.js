import { mailRegistration } from "../service/firebase/registration";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Title from "./Title";

import { Button, Input } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import SendIcon from "@mui/icons-material/Send";


const SignUp = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const [email, password] = e.target.elements;
    mailRegistration(email.value, password.value).then(
      (ret) => ret && navigate("/")
    );
  };

  return (
    <div>
      <Title />
      <h2>ユーザー登録 {user && user.email}</h2>
      <form onSubmit={handleSubmit}>
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
                  id="password"
                  name="password"
                  placeholder="password"
                  type="password"
          />
          <p>パスワードは６文字以上にしてください。</p>
        </div>
        <div>
          <Button variant="outlined" startIcon={<AppRegistrationIcon />} type="submit">
            登録
          </Button>
        </div>
      </form>
      <Button
        variant="outlined"
        onClick={() => navigate("/login")}
        style={{ margin: "0 20px" }}
        endIcon={<SendIcon />}
      >
        Login画面へ
      </Button>
    </div>
  );
};

export default SignUp;
