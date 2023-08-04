import { Navigate } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext"


const PrivateRoute = ({children}) => {
  const {user} = useTodoContext();
  return(
    <>
      {user ? children : (<Navigate to="/login" />)}
    </>
  );
}

export default PrivateRoute;
