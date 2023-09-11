import { AppBar, Typography } from "@mui/material";
import { useTodoContext } from "../context/TodoContext";
import AuthButton from "./AuthButton";

const Header = ({ setWithdrawalModalOpen, setPasswordChangeModalOpen }) => {

  const { user } = useTodoContext();
  console.log(user);
  let userName = null ;
  if (user) {
    if (user.displayName) {
      userName = user.displayName;
    } else {
      userName = user.email;
    }
  }
  return(
    <AppBar position="static" >
      <Typography sx={{ fontSize: {xs: 16, sm:16, md:20 } }} variant="h6" component = "div" p={1}>
        {user && userName + 'の'}Todoリスト
      </Typography>
      {user &&
      <AuthButton
        setWithdrawalModalOpen={setWithdrawalModalOpen}
        setPasswordChangeModalOpen={setPasswordChangeModalOpen}
      />
      }
    </AppBar>
  )
}

export default Header;
