import { useNavigate } from "react-router-dom";

import { auth } from "../service/firebase/firebase";
import { signOut } from "firebase/auth";

import { Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

import { useTodoContext } from "../context/TodoContext";

const AuthBUtton = ({ setWithdrawalModalOpen, setPasswordChangeModalOpen}) => {
  const { user } = useTodoContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };
  return (
    <>
      <Button
        onClick={handleLogout}
        variant="outlined"
        startIcon={<Logout />}
        sx={{ mr: 1 }}
      >
        ログアウト
      </Button>
      <Button
        onClick={() => setWithdrawalModalOpen(true)}
        variant="outlined"
        startIcon={<PersonRemoveIcon />}
        sx={{ mr: 1 }}
      >
        退会
      </Button>
      {user.providerData[0].providerId === "password" && (
        <Button
          onClick={() => setPasswordChangeModalOpen(true)}
          variant="outlined"
          startIcon={<PublishedWithChangesIcon />}
        >
          パスワード変更
        </Button>
      )}
    </>
  );
};

export default AuthBUtton;
