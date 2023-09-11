import { useState } from "react";
import { useTodoContext } from "../context/TodoContext";

import Header from "./Header";
import UserInfo from "./UserInfo";
import Modals from "./Modals";
import Todo from "./todo/Todo";
import { styled } from "@mui/material";

const TodoDiv = styled("div")(() => ({
  marginTop: 10,
}));

const Home = () => {
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [passwordChangeModalOpen, setPasswordChangeModalOpen] = useState(false);

  const { user } = useTodoContext();

  return (
    <>
      <div>
        <Header
          setWithdrawalModalOpen={setWithdrawalModalOpen}
          setPasswordChangeModalOpen={setPasswordChangeModalOpen}
        />
        <TodoDiv>
          <Todo />
        </TodoDiv>
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
