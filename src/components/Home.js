import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../service/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import { createPortal } from "react-dom";
import HomeChild from "./HomeChild";
import { delUserEmail } from "../service/DeleteUser";

const ModalPortal = ({ children }) => {
  const target = document.querySelector('.modalContainer');
  return createPortal(children, target);
}

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };
  const handleDelUserClick = () => {
    const result = delUserEmail().then(res => {
      console.log(res);
      setModalOpen(false);
      res && navigate('/SignUp');
    });
    console.log(result);
  }
  return (
    <>
      <div>
        <div className="modalContainer"></div>
        <h2>ホーム:{user && user.email}</h2>
        <div>
          <button onClick={handleLogout}>ログアウト</button>
        </div>
        <div>
          <button onClick={() => setModalOpen(true)}>退会</button>
        </div>
      </div>
      {modalOpen && (
        (
          <ModalPortal>
            <HomeChild handleDelUserClick={handleDelUserClick} setModalOpen={setModalOpen} />
          </ModalPortal>
        )
      )}
    </>
  );
};

export default Home;
