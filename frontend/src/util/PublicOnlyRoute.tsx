import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

type PublicOnlyRouteProps = {
  children: React.ReactNode;
  navigateTo?: string;
  replace?: boolean;
};

// render content only when NOT logged in
const PublicOnlyRoute = ({
  children,
  navigateTo = "/",
  replace = true,
}: PublicOnlyRouteProps) => {
  const { isLogged } = useAuthContext();

  if (isLogged) {
    return <Navigate to={navigateTo} replace={replace} />;
  }

  return children;
};

export default PublicOnlyRoute;
