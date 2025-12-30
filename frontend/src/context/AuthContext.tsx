import { useEffect, useState, createContext, useContext } from "react";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { baseUrl } from "@/util/constants";
import type { User, LoginCredentials } from "@/types/user";

type AuthData = {
  user: User | null;
  loading: boolean;
  loginMutation: UseMutationResult<User, Error, LoginCredentials>;
  logoutMutation: UseMutationResult<Response, Error, void, unknown>;
};

const AuthContext = createContext<AuthData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
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
        const data: User = await response.json();

        if (response.status === 200) {
          setUser(data);
        } else if (response.status === 401) {
          setUser(null);
        }
      } catch {
        console.error("authentication error");
      } finally {
        setLoading(false);
      }
    };

    authorize();
  }, []);

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: LoginCredentials) => {
      const options: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      };
      const response = await fetch(`${baseUrl}/api/token/`, options);
      if (!response.ok) {
        const errorData = await response.json().catch(() => {});
        throw new Error(errorData.detail || "Login failed");
      }

      return response.json();
    },
    onSuccess: (userData: User) => {
      setUser(userData);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${baseUrl}/api/logout/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Logout failed");
      return response;
    },
    onSuccess: () => {
      setUser(null);
    },
    onError: (error) => console.error("Logout error:", error),
  });

  const contextData = {
    user,
    loading,
    loginMutation,
    logoutMutation,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
