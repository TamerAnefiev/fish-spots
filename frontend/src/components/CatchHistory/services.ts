import type { CatchHistory } from "../../types/catchHistory";
import { baseUrl } from "../../util/constants";

export const fetchOldestCatchYear = async () => {
  return await fetch(`${baseUrl}/catch-history/oldest-catch-year/`, {
    credentials: "include",
  });
};

export const fetchCatchStats = async ({
  year,
  month,
  page,
  pageSize,
  ordering,
}: {
  year: number;
  month: number;
  page: number;
  pageSize: number;
  ordering: string;
}) => {
  const params = new URLSearchParams({
    year: String(year),
    month: String(month),
    page: String(page),
    pageSize: String(pageSize),
    ordering,
  });

  return await fetch(`${baseUrl}/catch-history/?${params.toString()}`, {
    credentials: "include",
  });
};

export const createCatchStats = async (payload: Omit<CatchHistory, "id">) => {
  return await fetch(`${baseUrl}/catch-history/create/`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
  });
};

export const deleteCatchStat = async (id: number) => {
  return await fetch(`${baseUrl}/catch-history/delete/${id}/`, {
    method: "DELETE",
    credentials: "include",
  });
};
