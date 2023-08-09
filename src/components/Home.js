import { useState } from "react";
import { useTodoContext } from "../context/TodoContext";

import Title from "./Title";
import AuthButton from "./AuthButton";
import UserInfo from "./UserInfo";
import Modals from "./Modals";
import Todo from "./todo/Todo";

const Home = () => {
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [passwordChangeModalOpen, setPasswordChangeModalOpen] = useState(false);

  const { user } = useTodoContext();

  return (
    <>
      <div>
        <Title />
        <AuthButton
          setWithdrawalModalOpen={setWithdrawalModalOpen}
          setPasswordChangeModalOpen={setPasswordChangeModalOpen}
        />
        <div>
          <Todo />
        </div>
        <div className="modalContainer"></div>
        <UserInfo user={user} />
      </div>
      <Modals
        setWithdrawalModalOpen={setWithdrawalModalOpen}
        setPasswordChangeModalOpen={setPasswordChangeModalOpen}
        withdrawalModalOpen={withdrawalModalOpen}
        passwordChangeModalOpen={passwordChangeModalOpen}
      />
    </>
  );
};

export default Home;
