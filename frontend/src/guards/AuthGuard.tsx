import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import type React from "react";

type PrivateRouteProps = {
  children: React.ReactNode;
  privateRoute?: boolean;
  guestOnly?: boolean;
  redirectTo?: string;
  replace?: boolean;
};

const AuthGuard = ({
  children,
  privateRoute = false,
  guestOnly = false,
  redirectTo,
  replace = true,
}: PrivateRouteProps) => {
  const { isLogged } = useAuthContext();

  // Guest-only page: redirect logged-in users
  if (guestOnly && isLogged) {
    return <Navigate to={redirectTo || "/"} replace={replace} />;
  }

  if (privateRoute && !isLogged) {
    return <Navigate to={redirectTo || "/login"} replace={replace} />;
  }

  return children;
};

export default AuthGuard;
