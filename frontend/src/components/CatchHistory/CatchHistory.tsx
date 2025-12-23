import { useState } from "react";
import CatchHistoryTable from "./CatchHistoryTable";
import CatchHistoryForm from "./CatchHistoryForm";
import SortDropdown from "./SortDropdown";
import Filters from "./Filters";
import setDocTitle from "../../util/setDocTitle";
import type {
  HistoryFetchParams,
  SortOrdering,
} from "../../types/catchHistory";

const now = new Date();
const defaultFetchParams: HistoryFetchParams = {
  year: now.getFullYear(),
  month: now.getMonth() + 1,
  page: 1,
  pageSize: 10,
  ordering: "-date",
};

export default function CatchHistory() {
  const [formOpen, setFormOpen] = useState(false);
  const [fetchParams, setFetchParams] =
    useState<HistoryFetchParams>(defaultFetchParams);

  setDocTitle("Catch History");

  return (
    <div className="py-6">
      <section className={`flex justify-center ${formOpen ? "" : "mb-10"}`}>
        <button
          type="button"
          className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setFormOpen((isOpen) => !isOpen)}
        >
          {formOpen ? "Скрий формата" : "Добави запис"}
        </button>
      </section>
      <CatchHistoryForm
        showForm={formOpen}
        onSuccess={() =>
          setFetchParams((prev) => ({
            ...prev,
            page: 1, // reset to first page to rerender
          }))
        }
        closeForm={() => setFormOpen(false)}
      />

      <SortDropdown
        ordering={fetchParams.ordering}
        setOrdering={(ordering: SortOrdering) =>
          setFetchParams((prev) => ({
            ...prev,
            ordering,
            page: 1, // reset to first page on sort change
          }))
        }
      />
      <Filters
        selectedYear={fetchParams.year}
        selectedMonth={fetchParams.month}
        currentPageSize={fetchParams.pageSize}
        onChangeYear={(year: number) =>
          setFetchParams((prev) => ({
            ...prev,
            year,
            page: 1,
          }))
        }
        onChangeMonth={(month: number) =>
          setFetchParams((prev) => ({
            ...prev,
            month,
            page: 1,
          }))
        }
        onChangePageSize={(pageSize: number) =>
          setFetchParams((prev) => ({
            ...prev,
            pageSize: pageSize,
            page: 1,
          }))
        }
      />
      <CatchHistoryTable
        fetchParams={fetchParams}
        setFetchParams={setFetchParams}
      />
    </div>
  );
}
