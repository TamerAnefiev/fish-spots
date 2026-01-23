import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cheparetaKeys } from "@/lib/query-keys";
import type { DeleteResponse } from "@/types/chepare";
import { baseUrl } from "@/util/constants";

export function useCheparetaMutations() {
  const queryClient = useQueryClient();

  const createSeller = useMutation({
    mutationFn: async (formData: FormData) => {
      const fetchOptions: RequestInit = {
        method: "POST",
        body: formData,
        credentials: "include",
      };
      const response = await fetch(
        `${baseUrl}/chepareta/create/`,
        fetchOptions,
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.message ||
          errorData.detail ||
          (typeof errorData === "string" ? errorData : null) ||
          "Възникна грешка при записването.";
        throw new Error(errorMessage);
      }

      return response.json();
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: cheparetaKeys.all });
    },
  });

  const deleteSeller = useMutation<DeleteResponse, Error, string>({
    mutationFn: async (slug: string) => {
      const fetchOptions: RequestInit = {
        method: "DELETE",
        credentials: "include",
      };
      const response = await fetch(
        `${baseUrl}/chepareta/delete/${slug}/`,
        fetchOptions,
      );
      if (!response.ok) {
        const errorData: DeleteResponse = await response
          .json()
          .catch(() => ({}));
        throw new Error(errorData.detail);
      }

      return response.json();
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: cheparetaKeys.all });
    },
  });

  return {
    createSeller,
    deleteSeller,
  };
}
