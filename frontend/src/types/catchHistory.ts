export type CatchHistory = {
  id: number;
  date: string;
  city: string;
  fishSpot: string;
  fishType: string;
  quantity: number;
  lureType: string;
  fromHour: string;
  toHour: string;
  snaps: number;
  goodWeather: boolean;
};

export type CatchHistoryPagination = {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  nextPage: number | null;
  previousPage: number | null;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

type BaseStats = {
  totalCatch: number | null;
  totalSnaps: number | null;
};

export type MonthlyStats = BaseStats & {
  month: number;
  monthNameBg: string;
};

export type YearlyStats = BaseStats & {
  year: number;
};

export type CombinedCatchStats = {
  monthlyStats: MonthlyStats;
  yearlyStats: YearlyStats;
  pagination: CatchHistoryPagination;
  results: CatchHistory[];
};

export type SortOrdering =
  | "-date"
  | "date"
  | "-quantity"
  | "quantity"
  | "-snaps"
  | "snaps";

export type HistoryFetchParams = {
  year: number;
  month: number;
  page: number;
  pageSize: number;
  ordering: SortOrdering;
};
