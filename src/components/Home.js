import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../service/firebase";
import { useAuthContext } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };
  return (
    <>
      <div>
        <h2>ホーム:{user && user.email}</h2>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    </>
  );
};

export default Home;
