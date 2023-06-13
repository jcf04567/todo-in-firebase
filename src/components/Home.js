import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";
import { HomePasswordChangeModal, HomeWithdrawalChild } from "./HomeChild";
import { auth } from "../service/firebase/firebase";
import { useAuthContext } from "../context/AuthContext";

import "./styles/home.css";

const ModalPortal = ({ children }) => {
  const target = document.querySelector(".modalContainer");
  return createPortal(children, target);
};

const Home = () => {
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [passwordChangeModalOpen, setPasswordChangeModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <div>
        <div className="modalContainer"></div>
        <h2>ホーム:{user && user.email}</h2>
        <p>
          {!user.emailVerified && "アドレス未認証のためTodoは入力できません。"}
        </p>
        <div>
          <button onClick={handleLogout}>ログアウト</button>
        </div>
        <div>
          <button onClick={() => setWithdrawalModalOpen(true)}>退会</button>
        </div>
        <div>
          <button onClick={() => setPasswordChangeModalOpen(true)}>パスワード変更</button>
        </div>
      </div>
      {withdrawalModalOpen && (
        <ModalPortal>
          <HomeWithdrawalChild
            setWithdrawalModalOpen={setWithdrawalModalOpen}
          />
        </ModalPortal>
      )}
      {passwordChangeModalOpen && (
        <ModalPortal>
          <HomePasswordChangeModal
            setPasswordChangeModalOpen={setPasswordChangeModalOpen}
          />
        </ModalPortal>
      )}
    </>
  );
};

export default Home;
