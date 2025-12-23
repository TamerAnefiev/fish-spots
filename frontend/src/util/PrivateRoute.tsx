import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

type PrivateRouteProps = {
  children: React.ReactNode;
  navigateTo?: string;
  replace?: boolean;
};

// render content only when logged in
const PrivateRoute = ({
  children,
  navigateTo = "/login",
  replace = true,
}: PrivateRouteProps) => {
  const { isLogged } = useAuthContext();

  if (!isLogged) {
    return <Navigate to={navigateTo} replace={replace} />;
  }

  return children;
};

export default PrivateRoute;
