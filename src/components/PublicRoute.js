import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext"


const PublicRoute = ({children}) => {
  const {user} = useAuthContext();
  return(
    <>
      {user ? (<Navigate to="/"/>) : <Outlet />}
    </>
  );
}

export default PublicRoute;
