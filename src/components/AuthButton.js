import { useNavigate } from "react-router-dom";

import { auth } from "../service/firebase/firebase";
import { signOut } from "firebase/auth";

import { Button } from "@mui/material";
import { Stack } from '@mui/material';

import { useTodoContext } from "../context/TodoContext";

const AuthButton = ({ setWithdrawalModalOpen, setPasswordChangeModalOpen}) => {
  const { user } = useTodoContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };
  return (
    <Stack direction="row" justifyContent="flex-end" >
      <Button
        onClick={handleLogout}
        variant="inherit"
        sx={{ fontSize: { xs: 8, sm:12, md:14 } }}
      >
        ログアウト
      </Button>
      <Button
        onClick={() => setWithdrawalModalOpen(true)}
        variant="inherit"
        sx={{ fontSize: { xs: 8, sm:12, md:14 } }}
      >
        退会
      </Button>
      {user.providerData[0].providerId === "password" && (
        <Button
          onClick={() => setPasswordChangeModalOpen(true)}
          variant="inherit"
          sx={{ fontSize: { xs: 8, sm:12, md:14 } }}
        >
          パスワード変更
        </Button>
      )}
    </Stack>
  );
};

export default AuthButton;
