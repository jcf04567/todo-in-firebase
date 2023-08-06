

import { useState } from "react";
import { createPortal } from "react-dom";
import { HomePasswordChangeModal, HomeWithdrawalChild } from "./HomeChild";
import { useTodoContext } from "../context/TodoContext";

import Title from "./Title";
import AuthBUtton from "./AuthButton";

const ModalPortal = ({ children }) => {
  const target = document.querySelector(".modalContainer");
  return createPortal(children, target);
};

const Home = () => {
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [passwordChangeModalOpen, setPasswordChangeModalOpen] = useState(false);

  const { user } = useTodoContext();


  return (
    <>
      <div>
        <Title />
        <AuthBUtton
          setWithdrawalModalOpen={setWithdrawalModalOpen}
          setPasswordChangeModalOpen={setPasswordChangeModalOpen}
        />
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
