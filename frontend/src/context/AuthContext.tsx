import React, { useState, createContext, useEffect, useContext } from "react";
import { baseUrl } from "../util/constants";

type AuthData = {
  userId: string;
  user: string;
  isAdmin: boolean;
  isLogged: boolean;
  loading: boolean;
  handleSetUser: (username: string, userId: string, isAdmin: boolean) => void;
  resetUser: () => void;
};

const AuthContext = createContext<AuthData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authorize = async () => {
      try {
        const options: RequestInit = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
        const response = await fetch(`${baseUrl}/api/authorize/`, options);
        const data = await response.json();

        if (response.status === 200) {
          handleSetUser(data.user, data.id, data.admin);
        } else if (response.status === 401) {
          resetUser();
        }
      } catch (error) {
        console.error("authentication error");
      } finally {
        setLoading(false);
      }
    };

    authorize();
  }, []);

  const handleSetUser = (username: string, id: string, isAdmin: boolean) => {
    setUser(username);
    setUserId(id);
    setIsAdmin(isAdmin);
    setIsLogged(true);
  };

  const resetUser = () => {
    setUser("");
    setUserId("");
    setIsAdmin(false);
    setIsLogged(false);
  };

  let contextData = {
    userId,
    user,
    isAdmin,
    isLogged,
    loading,
    handleSetUser,
    resetUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
};
