import { createContext } from "react";

type AuthData = {
  userId: string;
  user: string;
  isAdmin: boolean;
  isLogged: boolean;
  loading: boolean;
  handleSetUser: (username: string, userId: string, isAdmin: boolean) => void;
  resetUser: () => void;
};

export const AuthContext = createContext<AuthData | undefined>(undefined);
