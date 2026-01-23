import { createContext, useContext, useCallback, useMemo } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/util/constants";
import type { User } from "@/types/user";
import api from "@/lib/api";
import { authKeys } from "@/lib/query-keys";

type AuthData = {
  user: User | null;
  isLoading: boolean;
  loginMutation: UseMutationResult<User, Error, { code: string }>;
  logoutMutation: UseMutationResult<void, Error, void>;
  resetUser: () => void;
};

const AuthContext = createContext<AuthData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: authKeys.authUser,
    queryFn: async () => {
      try {
        const response = await api.get<User>("/profile/me/");
        return response.data;
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          (error.response?.status === 401 || error.response?.status === 400)
        ) {
          return null;
        }

        throw error;
      }
    },
    retry: false, // skip retry on 401
    staleTime: Infinity,
  });

  const loginMutation = useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      const response = await api.post<User>(`${baseUrl}/profile/auth/login/`, {
        code,
      });
      return response.data;
    },
    onSuccess: (userData: User) => {
      queryClient.setQueryData(authKeys.authUser, userData);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post("/profile/logout/");
    },
    onSuccess: () => {
      queryClient.setQueryData(authKeys.authUser, null);
    },
    onError: (error) => console.error("Logout error:", error),
  });

  const resetUser = useCallback(() => {
    queryClient.setQueryData(authKeys.authUser, null);
  }, [queryClient]);

  const contextData = useMemo(
    () => ({
      user: user ?? null,
      isLoading,
      loginMutation,
      logoutMutation,
      resetUser,
    }),
    [user, isLoading, loginMutation, logoutMutation, resetUser],
  );

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
