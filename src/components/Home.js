import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";
import { HomePasswordChangeModal, HomeWithdrawalChild } from "./HomeChild";
import { auth } from "../service/firebase/firebase";
import { useTodoContext } from "../context/TodoContext";

import Title from "./Title";
import { Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const ModalPortal = ({ children }) => {
  const target = document.querySelector(".modalContainer");
  return createPortal(children, target);
};

const Home = () => {
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [passwordChangeModalOpen, setPasswordChangeModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useTodoContext();
  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <div>
        <Title />
        <div className="modalContainer"></div>
        <p>現在ログインしているユーザーの情報</p>
        <p>email : {user.email}</p>
        <p>
          Provider :
          {user.providerData[0].providerId === "password"
            ? "email Login"
            : user.providerData[0].providerId === "google.com"
            ? "Google"
            : "invalid provider"}
        </p>
        <p>
          {!user.emailVerified &&
            "アドレス未認証のためTodoは入力できません。(メール認証が終了したら、リロードしてください。)"}
        </p>
          <Button
            onClick={handleLogout}
            variant="outlined"
            startIcon={<Logout />}
            sx={{ mr:1 }}
          >
            ログアウト
          </Button>
          <Button
            onClick={() => setWithdrawalModalOpen(true)}
            variant="outlined"
            startIcon={<PersonRemoveIcon />}
            sx={{ mr:1 }}
          >
            退会
          </Button>
          {user.providerData[0].providerId === "password"
          && <Button onClick={() => setPasswordChangeModalOpen(true)}
            variant="outlined"
            startIcon={<PublishedWithChangesIcon />}
          >
            パスワード変更
          </Button> }
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
