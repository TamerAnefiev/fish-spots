import type { ChepareCreation, DeleteResponse } from "@/types/chepare";
import { baseUrl } from "@/util/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCheparetaMutations() {
  const queryClient = useQueryClient();

  const createSeller = useMutation({
    mutationFn: async (newSeller: ChepareCreation) => {
      const body = new FormData();
      body.append("name", newSeller.name);
      body.append("contact", newSeller.contact);
      newSeller.images.forEach(({ chepareType, image }) => {
        body.append("chepareType", chepareType);
        body.append("image", image);
      });

      const fetchOptions: RequestInit = {
        method: "POST",
        body,
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
      return queryClient.invalidateQueries({ queryKey: ["getChepareta"] });
    },
  });

  const deleteSeller = useMutation<DeleteResponse, Error, number>({
    mutationFn: async (sellerId: number) => {
      const fetchOptions: RequestInit = {
        method: "DELETE",
        credentials: "include",
      };
      const response = await fetch(
        `${baseUrl}/chepareta/delete/${sellerId}/`,
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
      return queryClient.invalidateQueries({ queryKey: ["getChepareta"] });
    },
  });

  return {
    createSeller,
    deleteSeller,
  };
}
