import { Navigate, Outlet } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext"


const PublicRoute = ({children}) => {
  const {user} = useTodoContext();
  return(
    <>
      {user ? (<Navigate to="/"/>) : <Outlet />}
    </>
  );
}

export default PublicRoute;
